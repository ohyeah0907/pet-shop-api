import axios from "axios";
import crypto, { randomUUID } from "crypto";
import orderService from "./OrderService";
import orderDetailService from "./OrderDetailService";
import petService from "./PetService";
import accessoryService from "./AccessoryService";
import { momoConstants } from "../constants/momo";
import { generateSignature } from "../utils";
import { OrderCreate } from "../dto/order";
import { OrderDetailCreate } from "../dto/order_detail";
import { OrderStatus, Payment } from "@prisma/client";

const service = {
  checkoutMomo: async (request: any) => {
    const checkout = request.checkout;
    const total = await checkout.items.reduce(async (sum: any, item: any) => {
      let product = null;
      if (item.pet_id) {
        product = await petService.getById(item.pet_id);
      } else {
        product = await accessoryService.getById(item.accessory_id);
      }
      return (await sum) + Number(product!.price) * Number(item.quantity);
    }, Promise.resolve(0));
    const orderCreate: OrderCreate = {
      user: request.user,
      payment: Payment.momo,
      code: "INV-" + Date.now(),
      order_status: "PENDING",
      total: total,
    };

    const order = await orderService.create(orderCreate);

    // checkout.items.forEach(async (item: any) => {
    //   const orderDetailCreate: OrderDetailCreate = {
    //     order: order,
    //     quantity: item.quantity,
    //   };
    //   let product = null;
    //   if (item.pet_id) {
    //     product = await petService.getById(item.pet_id);
    //     orderDetailCreate.pet = product;
    //     orderDetailCreate.price = product.price * item.quantity;
    //   } else {
    //     product = await accessoryService.getById(item.accessory_id);
    //     orderDetailCreate.accessory = product;
    //     orderDetailCreate.price = product.price * item.quantity;
    //   }
    //   product.price = product.price;
    //   await orderDetailService.create(orderDetailCreate);
    // });
    for (let i = 0; i < checkout.items.length; i++) {
      const item = checkout.items[i];
      const orderDetailCreate: OrderDetailCreate = {
        order: order,
        quantity: item.quantity,
      };
      let product = null;
      if (item.pet_id) {
        product = await petService.getById(item.pet_id);
        orderDetailCreate.pet = product;
        orderDetailCreate.price = product.price;
      } else {
        product = await accessoryService.getById(item.accessory_id);
        orderDetailCreate.accessory = product;
        orderDetailCreate.price = product.price;
      }
      product.price = product.price;
      await orderDetailService.create(orderDetailCreate);
    }

    const momoOrder = await service.createMomoOrder(order);

    return momoOrder;
  },
  returnMomo: async (data: any) => {
    const orderCode = data.orderId;
    const resultCode = data.resultCode;

    const order = await orderService.getByCode(orderCode);

    if (resultCode !== 0) {
      order.order_status = OrderStatus.COMPLETED;
      // Update stock of product
      const orderDetails = await orderDetailService.getByOrderId(order.id);
      for (let i = 0; i < orderDetails.length; i++) {
        if (orderDetails[i].pet_id) {
          const pet = orderDetails[i].pet;
          pet!.stock_quantity = pet!.stock_quantity - orderDetails[i].quantity;
          await petService.update(pet as any);
        } else {
          const accessory = orderDetails[i].accessory;
          accessory!.stock_quantity =
            accessory!.stock_quantity - orderDetails[i].quantity;
          await accessoryService.update(accessory as any);
        }
      }
    } else {
      order.order_status = OrderStatus.CANCELLED;
    }

    const updated = await orderService.update(order);

    if (!updated) {
      throw new Error("Cập nhật trạng thái đơn hàng thất bại");
    }

    return resultCode === "0";
  },
  createMomoOrder: async (order: any) => {
    const orderId: string = order.code;
    const requestId: string = randomUUID();
    const amount: number = order.total;
    const orderInfo: string = "Thanh toán hóa đơn " + orderId;
    const requestType: string = "captureWallet";

    const payload: string =
      "accessKey=" +
      momoConstants.accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      "&ipnUrl=" +
      momoConstants.ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      momoConstants.partnerCode +
      "&redirectUrl=" +
      momoConstants.returnUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    const signature = generateSignature(payload, momoConstants.secretKey);

    return axios
      .post(
        momoConstants.apiEndpoint,
        {
          partnerCode: momoConstants.partnerCode,
          requestId: requestId,
          amount: amount,
          orderId: orderId,
          orderInfo: orderInfo,
          ipnUrl: momoConstants.ipnUrl,
          redirectUrl: momoConstants.returnUrl,
          requestType: requestType,
          extraData: "",
          signature: signature,
          lang: "vi",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  checkoutPaypal: async (request: any) => {
    const checkout = request.checkout;
    console.log("checkout :>> ", checkout);
    const total = await checkout.items.reduce(async (sum: any, item: any) => {
      let product = null;
      if (item.pet_id) {
        product = await petService.getById(item.pet_id);
      } else {
        product = await accessoryService.getById(item.accessory_id);
      }
      return (await sum) + Number(product!.price) * Number(item.quantity);
    }, Promise.resolve(0));
    const orderCreate: OrderCreate = {
      user: request.user,
      payment: Payment.paypal,
      code: "INV-" + Date.now(),
      order_status: "PENDING",
      total: total,
    };
    const order = await orderService.create(orderCreate);

    // checkout.items.forEach(async (item: any) => {
    //   const orderDetailCreate: OrderDetailCreate = {
    //     order: order,
    //     quantity: item.quantity,
    //   };
    //   let product = null;
    //   if (item.pet_id) {
    //     product = await petService.getById(item.pet_id);
    //     orderDetailCreate.pet = product;
    //     orderDetailCreate.price = product.price * item.quantity;
    //   } else {
    //     product = await accessoryService.getById(item.accessory_id);
    //     orderDetailCreate.accessory = product;
    //     orderDetailCreate.price = product.price * item.quantity;
    //   }
    //   product.price = product.price;
    //   await orderDetailService.create(orderDetailCreate);
    // });
    for (let i = 0; i < checkout.items.length; i++) {
      const item = checkout.items[i];
      const orderDetailCreate: OrderDetailCreate = {
        order: order,
        quantity: item.quantity,
      };
      let product = null;
      if (item.pet_id) {
        product = await petService.getById(item.pet_id);
        orderDetailCreate.pet = product;
        orderDetailCreate.price = product.price;
      } else {
        product = await accessoryService.getById(item.accessory_id);
        orderDetailCreate.accessory = product;
        orderDetailCreate.price = product.price;
      }
      product.price = product.price;
      await orderDetailService.create(orderDetailCreate);
    }

    return { orderId: order.code };
  },
  returnPaypal: async (request: any) => {
    const { orderId, status } = request;
    const result = {
      status: "",
      message: "",
      orderId: "",
    };
    const order = await orderService.getByCode(orderId);
    order.order_status = status;
    result.status = status === OrderStatus.COMPLETED ? "success" : "failed";
    result.message =
      status === OrderStatus.COMPLETED
        ? "Thanh toán thành công"
        : "Thanh toán thất bại";
    result.orderId = orderId;

    const updated = await orderService.update(order);
    if (!updated) {
      throw new Error("Cập nhật trạng thái đơn hàng thất bại");
    }

    console.log("order :>> ", order);
    // Update stock of product
    if (status === OrderStatus.COMPLETED) {
      const orderDetails = await orderDetailService.getByOrderId(order.id);
      for (let i = 0; i < orderDetails.length; i++) {
        if (orderDetails[i].pet_id) {
          const pet = orderDetails[i].pet;
          pet!.stock_quantity = pet!.stock_quantity - orderDetails[i].quantity;
          await petService.update(pet as any);
        } else {
          const accessory = orderDetails[i].accessory;
          accessory!.stock_quantity =
            accessory!.stock_quantity - orderDetails[i].quantity;
          await accessoryService.update(accessory as any);
        }
      }
    }
    return result;
  },
};

export default service;

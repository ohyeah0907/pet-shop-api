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
  checkout: async (request: any) => {
    const checkout = request.checkout;
    console.log("checkout :>> ", checkout);
    const total = await checkout.items.reduce(async (sum: any, item: any) => {
      let product = null;
      if (item.pet_id) {
        product = await petService.getById(item.pet_id);
      } else {
        product = await accessoryService.getById(item.accessory_id);
      }
      console.log("product :>> ", product);
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

    checkout.items.forEach(async (item: any) => {
      const orderDetailCreate: OrderDetailCreate = {
        order: order,
        quantity: item.quantity,
      };
      let product = null;
      if (item.pet_id) {
        product = await petService.getById(item.pet_id);
        orderDetailCreate.pet = product;
      } else {
        product = await accessoryService.getById(item.accessory_id);
        orderDetailCreate.accessory = product;
      }
      product.price = product.price;
      await orderDetailService.create(orderDetailCreate);
    });

    const momoOrder = await service.createMomoOrder(order);

    return momoOrder;
  },
  returnMomo: async (data: any) => {
    const orderCode = data.orderId;
    const resultCode = data.resultCode;

    const order = await orderService.getByCode(orderCode);

    if (resultCode !== 0) {
      order.order_status = OrderStatus.COMPLETED;
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
    const amount: number = 1000;
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
};

export default service;

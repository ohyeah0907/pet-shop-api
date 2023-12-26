import { Request, Response } from "express";
import paymentService from "../services/PaymentService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";
import { ProtectedRequest } from "../types/app-request";

const controller = {
  checkoutMomo: async (req: ProtectedRequest, res: Response) => {
    req.body.user = req.user;
    const result = await paymentService.checkoutMomo(req.body);
    console.log("result :>> ", result);
    return new SuccessResponse("Thành công!", result!.payUrl).send(res);
  },
  checkoutPaypal: async (req: Request, res: Response) => {},
  returnPaypal: async (req: Request, res: Response) => {},
  returnMomo: async (req: Request, res: Response) => {
    console.log("req :>> ", req.query);
    const { CLIENT_URL } = process.env;

    try {
      const result = await paymentService.returnMomo(req.query);
      console.log("result :>> ", result);
      if (result) {
        res.redirect(
          `${CLIENT_URL}/checkout/success?orderId=${req.query.orderId}`,
        );
      } else {
        res.redirect(
          `${CLIENT_URL}/checkout/failed?orderId=${req.query.orderId}&&message=Bạn đã hủy thanh toán`,
        );
      }
    } catch (error: any) {
      res.redirect(`${CLIENT_URL}  `);
    }
  },
};

export default controller;

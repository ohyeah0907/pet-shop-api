import { Request, Response } from "express";
import paymentService from "../services/PaymentService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";
import { ProtectedRequest } from "../types/app-request";

const controller = {
  checkout: async (req: ProtectedRequest, res: Response) => {
    req.body.user = req.user;
    const result = await paymentService.checkout(req.body);
    console.log("result :>> ", result);
    res.redirect(result!.payUrl);
  },
  returnMomo: async (req: Request, res: Response) => {
    console.log("req :>> ", req.query);
    const { CLIENT_URL } = process.env;

    try {
      const result = await paymentService.returnMomo(req.query);
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
      res.redirect(
        `${CLIENT_URL}/checkout/failed?orderId=${req.query.orderId}&&message=${error.message}`,
      );
    }
  },
};

export default controller;

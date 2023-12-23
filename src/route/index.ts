import { Router } from "express";
import pet from "./pet";
import petType from "./pet_type";
import accessory from "./accessory";
import accessoryType from "./accessory_type";
import promotion from "./promotion";
import productPromotion from "./product_promotion";
import productFeedback from "./product_feedback";
import cart from "./cart";
import cartItem from "./cart_item";
import order from "./order";
import orderDetail from "./order_detail";
import auth from "./auth";
import user from "./user";
import payment from "./payment";

const router = Router();

router.use("/pet", pet);
router.use("/pet-type", petType);
router.use("/accessory", accessory);
router.use("/accessory-type", accessoryType);
router.use("/auth", auth);
router.use("/user", user);
router.use("/promotion", promotion);
router.use("/product-promotion", productPromotion);
router.use("/product-feedback", productFeedback);
router.use("/cart", cart);
router.use("/cart-item", cartItem);
router.use("/order", order);
router.use("/order-detail", orderDetail);
router.use("/payment", payment);

export default router;

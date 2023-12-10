"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var asyncHandler_1 = require("../../handler/asyncHandler");
var ProductPromotionController_1 = require("../../controllers/ProductPromotionController");
var validator_1 = require("../../middleware/validator");
var product_promotion_1 = require("../../schema/product_promotion");
var router = (0, express_1.Router)();
// router.use(authentication);
router.post("/create", (0, validator_1.default)(product_promotion_1.default.productPromotionCreate), (0, asyncHandler_1.default)(ProductPromotionController_1.default.create));
router.put("/update", (0, validator_1.default)(product_promotion_1.default.productPromotionUpdate), (0, asyncHandler_1.default)(ProductPromotionController_1.default.update));
router.delete("/delete/:id", (0, asyncHandler_1.default)(ProductPromotionController_1.default.delete));
exports.default = router;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var asyncHandler_1 = require("../../handler/asyncHandler");
var PromotionController_1 = require("../../controllers/PromotionController");
var validator_1 = require("../../middleware/validator");
var promotion_1 = require("../../schema/promotion");
var router = (0, express_1.Router)();
// router.use(authentication);
router.post("/create", (0, validator_1.default)(promotion_1.default.promotionCreate), (0, asyncHandler_1.default)(PromotionController_1.default.create));
router.put("/update", (0, validator_1.default)(promotion_1.default.promotionUpdate), (0, asyncHandler_1.default)(PromotionController_1.default.update));
router.delete("/delete/:id", (0, asyncHandler_1.default)(PromotionController_1.default.delete));
exports.default = router;
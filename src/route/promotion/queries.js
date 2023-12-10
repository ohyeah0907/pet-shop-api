"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PromotionController_1 = require("../../controllers/PromotionController");
var asyncHandler_1 = require("../../handler/asyncHandler");
var router = (0, express_1.Router)();
router.post("/search", (0, asyncHandler_1.default)(PromotionController_1.default.getSearch));
router.get("/:id", (0, asyncHandler_1.default)(PromotionController_1.default.getById));
exports.default = router;

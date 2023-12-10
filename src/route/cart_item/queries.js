"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CartItemController_1 = require("../../controllers/CartItemController");
var asyncHandler_1 = require("../../handler/asyncHandler");
var router = (0, express_1.Router)();
router.post("/search", (0, asyncHandler_1.default)(CartItemController_1.default.getSearch));
router.get("/:id", (0, asyncHandler_1.default)(CartItemController_1.default.getById));
exports.default = router;

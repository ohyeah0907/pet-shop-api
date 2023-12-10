"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AccessoryTypeController_1 = require("../../controllers/AccessoryTypeController");
var asyncHandler_1 = require("../../handler/asyncHandler");
var router = (0, express_1.Router)();
router.post("/search", (0, asyncHandler_1.default)(AccessoryTypeController_1.default.getSearch));
router.get("/:id", (0, asyncHandler_1.default)(AccessoryTypeController_1.default.getById));
exports.default = router;

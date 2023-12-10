"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../../controllers/UserController");
var asyncHandler_1 = require("../../handler/asyncHandler");
var router = (0, express_1.Router)();
router.post("/search", (0, asyncHandler_1.default)(UserController_1.default.getUserSearch));
router.get("/:id", (0, asyncHandler_1.default)(UserController_1.default.getUserById));
exports.default = router;

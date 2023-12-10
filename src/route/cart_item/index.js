"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var queries_1 = require("./queries");
var mutations_1 = require("./mutations");
var router = (0, express_1.Router)();
router.use("/", mutations_1.default);
router.use("/", queries_1.default);
exports.default = router;

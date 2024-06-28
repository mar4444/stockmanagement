"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const userController_2 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post('/signup', userController_1.signup);
router.post('/login', userController_2.login);
exports.default = router;

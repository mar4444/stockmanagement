"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const protectedRoute_1 = require("../controller/protectedRoute");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.verifyToken);
router.get('/protectedrouter', protectedRoute_1.protectedRouter);
exports.default = router;

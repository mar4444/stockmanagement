"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/register2', (req, res) => {
    res.send('auth number 2');
});
exports.default = router;

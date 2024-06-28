"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const dotenv_1 = __importDefault(require("dotenv"));
const validationSchemas_1 = require("../validations/validationSchemas");
const loginSchema_1 = require("../validations/loginSchema");
dotenv_1.default.config();
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validationSchemas_1.signupSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const { username, password, email } = req.body;
        const user = yield Users_1.default.create({ username, password, email });
        res.send(user);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = loginSchema_1.loginSchemas.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        const { username, password } = req.body;
        const user = yield Users_1.default.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const isValid = yield user.validPassword(password);
        if (!isValid) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Logged in', token });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.login = login;

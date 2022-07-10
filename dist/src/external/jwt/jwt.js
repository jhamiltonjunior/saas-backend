"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ user_id: userId }, '18AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4F8E4', {
        expiresIn: 60 * 60 * 24,
    });
    return token;
};
exports.generateToken = generateToken;
const validateUser = (token) => {
    let id = '';
    jsonwebtoken_1.default.verify(String(token), '18AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4F8E4', (error, decoded) => {
        if (error) {
        }
        if (decoded === undefined) {
            return;
        }
        id = decoded.user_id;
    });
    return id;
};
exports.validateUser = validateUser;

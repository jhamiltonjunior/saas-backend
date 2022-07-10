"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generateHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRound = 10;
const generateHash = async (data) => {
    return await bcrypt_1.default.hash(data, saltRound);
};
exports.generateHash = generateHash;
const comparePassword = async (password, hash) => {
    return await bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;

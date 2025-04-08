"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/users/login"));
const register_1 = __importDefault(require("../controllers/users/register"));
const authenticationToken_1 = __importDefault(require("../utils/authenticationToken"));
const logout_1 = __importDefault(require("../controllers/users/logout"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', register_1.default);
authRouter.post('/login', login_1.default);
authRouter.post('/logout', authenticationToken_1.default, logout_1.default);
exports.default = authRouter;

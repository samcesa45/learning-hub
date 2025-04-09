"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_1 = require("../controllers/profile/profile");
const profileRouter = (0, express_1.Router)();
profileRouter.get('/', profile_1.getUserProfile);
profileRouter.get('/:id', profile_1.getUserById);
profileRouter.put('/:id', profile_1.updateUserProfile);
exports.default = profileRouter;

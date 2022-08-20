"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, required: true, default: false },
    activationLink: { type: String }
});
exports.default = (0, mongoose_1.model)('user', userSchema);

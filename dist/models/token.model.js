"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'user' },
    refreshToken: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('token', tokenSchema);

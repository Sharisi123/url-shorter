"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateId_1 = __importDefault(require("../utils/generateId"));
const mongoose_1 = require("mongoose");
const shortUrlSchema = new mongoose_1.Schema({
    user: { required: true, type: mongoose_1.Types.ObjectId, ref: 'user' },
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: generateId_1.default
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('url', shortUrlSchema);

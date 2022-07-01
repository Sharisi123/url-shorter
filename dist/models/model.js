"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generateId_1 = __importDefault(require("../utils/generateId"));
const shortUrlSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('UrlShorter', shortUrlSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateId = () => {
    return Math.random().toString(36).slice(-8);
};
exports.default = generateId;

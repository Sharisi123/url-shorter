"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidHttpUrl = (urlString) => {
    try {
        const url = new URL(urlString);
        return url.protocol === 'http:' || url.protocol === 'https:';
    }
    catch (err) {
        return false;
    }
};
exports.default = isValidHttpUrl;

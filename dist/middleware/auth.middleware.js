"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_service_1 = __importDefault(require("../services/token.service"));
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_error_1.default.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_error_1.default.UnauthorizedError());
        }
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_error_1.default.UnauthorizedError());
        }
        req.user = userData._doc;
        next();
    }
    catch (e) {
        return next(api_error_1.default.UnauthorizedError());
    }
};
exports.default = authMiddleware;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateId_1 = __importDefault(require("../utils/generateId"));
const token_service_1 = __importDefault(require("./token.service"));
const mail_service_1 = __importDefault(require("./mail.service"));
class UserService {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(api_error_1.default.BadRequest('Validation error', errors.array()));
                }
                const { email, password } = req.body;
                const candidate = yield user_model_1.default.findOne({ email });
                if (candidate) {
                    throw api_error_1.default.BadRequest(`User with email address ${email} already exists`);
                }
                const hashPassword = yield bcrypt_1.default.hash(password, 7);
                const activationLink = (0, generateId_1.default)();
                const user = yield user_model_1.default.create({
                    email,
                    password: hashPassword,
                    activationLink
                });
                console.log('created user', user);
                yield mail_service_1.default.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
                const tokens = token_service_1.default.generateTokens(Object.assign({}, user));
                console.log('tokens', tokens);
                yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
                return res.json(Object.assign(Object.assign({}, tokens), { user }));
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    throw api_error_1.default.BadRequest('User with this email was not found');
                }
                const isPassEquals = yield bcrypt_1.default.compare(password, user.password);
                if (!isPassEquals) {
                    throw api_error_1.default.BadRequest('Invalid password');
                }
                const tokens = token_service_1.default.generateTokens(Object.assign({}, user));
                yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
                return res.json(Object.assign(Object.assign({}, tokens), { user: user }));
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield token_service_1.default.removeToken(refreshToken);
                res.clearCookie('refreshToken');
                return res.json(token);
            }
            catch (e) {
                next(e);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = req.params.link;
                const user = yield user_model_1.default.findOne({ activationLink });
                if (!user) {
                    throw api_error_1.default.BadRequest('Incorrect activation link');
                }
                user.isActivated = true;
                yield user.save();
                return process.env.CLIENT_URL && res.redirect(process.env.CLIENT_URL);
            }
            catch (e) {
                next(e);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('here');
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    throw api_error_1.default.UnauthorizedError();
                }
                const userData = token_service_1.default.validateRefreshToken(refreshToken);
                console.log('userData', userData);
                const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
                if (!userData || !tokenFromDb) {
                    throw api_error_1.default.UnauthorizedError();
                }
                console.log('tokenFromDb', tokenFromDb);
                const user = yield user_model_1.default.findById(userData._id);
                console.log('user', user);
                if (user) {
                    const tokens = token_service_1.default.generateTokens(Object.assign({}, user));
                    console.log('tokens', tokens);
                    yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
                    res.cookie('refreshToken', tokens.refreshToken, {
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    });
                    return res.json(userData);
                }
                else {
                    return res.status(404).send();
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find();
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new UserService();

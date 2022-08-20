"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const url_service_1 = require("../services/url.service");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.default, url_service_1.getUserShortUrls);
router.get('/:shortUrl', auth_middleware_1.default, url_service_1.getShortUrl);
router.post('/create', auth_middleware_1.default, url_service_1.createShortUrl);
exports.default = router;

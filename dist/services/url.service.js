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
exports.createShortUrl = exports.getUserShortUrls = exports.getShortUrl = void 0;
const url_model_1 = __importDefault(require("../models/url.model"));
const isValidUrl_1 = __importDefault(require("../utils/isValidUrl"));
const getShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlRecord = yield url_model_1.default.findOne({
            user: req.user._id,
            shortUrl: req.params.shortUrl
        });
        if (urlRecord)
            res.redirect(urlRecord.fullUrl);
        else
            res.sendStatus(404);
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});
exports.getShortUrl = getShortUrl;
const getUserShortUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlRecords = yield url_model_1.default.findOne({
            user: req.user._id
        });
        if (urlRecords)
            res.json(urlRecords);
        else
            res.status(404).send('No records');
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});
exports.getUserShortUrls = getUserShortUrls;
const createShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        if (!(0, isValidUrl_1.default)(fullUrl)) {
            res.status(401).json({ msg: 'Wrong url' });
            return;
        }
        let shortedUrlRecord = yield url_model_1.default.findOne({ fullUrl });
        if (shortedUrlRecord) {
            res.json(shortedUrlRecord);
            return;
        }
        shortedUrlRecord = yield url_model_1.default.create({ fullUrl, user: req.user._id });
        res.json(shortedUrlRecord);
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});
exports.createShortUrl = createShortUrl;

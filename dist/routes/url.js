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
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../models/model"));
const isValidUrl_1 = __importDefault(require("../utils/isValidUrl"));
const router = express_1.default.Router();
router.get('/shortUrls', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlRecords = yield model_1.default.find();
        res.render('index', { urlRecords });
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
}));
router.get('/:shortUrl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlRecord = yield model_1.default.findOne({
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
}));
router.post('/shortUrls', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        const urlRecords = yield model_1.default.find();
        if (!(0, isValidUrl_1.default)(fullUrl)) {
            res.render('index', { msg: 'Wrong url', urlRecords });
            return;
        }
        let shortedUrlRecord = yield model_1.default.findOne({ fullUrl });
        if (shortedUrlRecord) {
            res.render('index', { urlRecords, shortedUrlRecord });
            return;
        }
        shortedUrlRecord = yield model_1.default.create({ fullUrl });
        res.render('index', { urlRecords, shortedUrlRecord });
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
}));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const router = express_1.default.Router();
router.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 3, max: 32 }), auth_service_1.default.registration);
router.post('/login', auth_service_1.default.login);
router.post('/logout', auth_service_1.default.logout);
router.get('/activate/:link', auth_service_1.default.activate);
router.get('/refresh', auth_service_1.default.refresh);
router.get('/users', auth_middleware_1.default, auth_service_1.default.getUsers);
exports.default = router;

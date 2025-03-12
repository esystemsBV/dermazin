"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const speedex_controller_1 = require("../controllers/speedex.controller");
const router = express_1.default.Router();
router.post("/status", speedex_controller_1.getStatusData);
router.post("/parcel", speedex_controller_1.getParcelsData);
router.post("/add", speedex_controller_1.addParcel);
router.post("/tracking/:number", speedex_controller_1.getOrderByTracking);
exports.default = router;

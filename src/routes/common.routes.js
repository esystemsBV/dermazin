"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const common_controller_1 = require("../controllers/common.controller");
const router = express_1.default.Router();
router.post("/fetchTable", common_controller_1.getTableData);
router.delete("/delete/:table/:id", common_controller_1.handleDeleteFromTableById);
exports.default = router;

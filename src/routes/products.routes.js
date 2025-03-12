"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const router = express_1.default.Router();
router.post("/", products_controller_1.addProduct);
router.get("/", products_controller_1.getProducts);
router.put("/update/:id", products_controller_1.updateProduct);
router.get("/getUnique/:id", products_controller_1.getProductById);
router.put("/toggleVisibility", products_controller_1.ProductToggleVisibility);
exports.default = router;

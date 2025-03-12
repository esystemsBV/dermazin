"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("../controllers/categories.controller");
const router = express_1.default.Router();
router.get("/", categories_controller_1.CategoriesPage);
router.get("/unique/:id", categories_controller_1.findUnique);
router.get("/admin", categories_controller_1.CategoriesAdmin);
router.put("/toggleVisibility", categories_controller_1.CategoryToggleVisibility);
router.post("/add", categories_controller_1.AddCategory);
router.put("/edit", categories_controller_1.EditCategory);
exports.default = router;

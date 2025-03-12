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
exports.EditCategory = exports.AddCategory = exports.CategoryToggleVisibility = exports.CategoriesAdmin = exports.findUnique = exports.CategoriesPage = void 0;
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const storage = multer_1.default.diskStorage({
    destination: "./uploads/categories",
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 * 5 },
}).array("images", 5);
const CategoriesPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.category.findMany({
            include: { Items: { take: 3 }, images: true },
        });
        res.json(data || []);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch categories", err: error });
    }
});
exports.CategoriesPage = CategoriesPage;
const findUnique = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma.category.findUnique({
            where: { id: +id },
            include: { images: true },
        });
        if (!data) {
            res.status(500).json({ error: "no category founded with this id" });
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch categories", err: error });
    }
});
exports.findUnique = findUnique;
const CategoriesAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.category.findMany({
            include: {
                images: true,
                _count: {
                    select: { Items: true },
                },
            },
        });
        res.json(data.map((value) => {
            return Object.assign(Object.assign({}, value), { productsCount: value._count.Items });
        }) || []);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch categories", err: error });
    }
});
exports.CategoriesAdmin = CategoriesAdmin;
const CategoryToggleVisibility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, hidden } = req.body;
    if (!id && id !== 0) {
        res.status(500).json({ error: "Pleasse provide an id" });
    }
    try {
        yield prisma.category.update({
            where: { id: id },
            data: {
                hidden: !hidden,
            },
        });
        res.status(200).send("Category modified successfully");
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to toggle visiblity for category", err: error });
    }
});
exports.CategoryToggleVisibility = CategoryToggleVisibility;
const AddCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description } = req.body;
        if (!name || !description) {
            return res
                .status(400)
                .json({ error: "Please provide a name & description" });
        }
        if (err) {
            return res
                .status(500)
                .json({ error: "Failed to upload images", err: err });
        }
        try {
            const category = yield prisma.category.create({
                data: {
                    name: name,
                    description: description,
                },
            });
            if (req.files && Array.isArray(req.files)) {
                const images = req.files.map((file) => ({
                    category_id: category.id,
                    url: file.path,
                }));
                yield prisma.categoriesImages.createMany({
                    data: images,
                });
            }
            res.status(200).send("Category and images created successfully");
        }
        catch (error) {
            res
                .status(500)
                .json({ error: "Failed to add category or images", err: error });
        }
    }));
});
exports.AddCategory = AddCategory;
const EditCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description, id, deletedImages } = req.body;
        const files = req.files;
        try {
            if (deletedImages) {
                yield prisma.categoriesImages.deleteMany({
                    where: { id: { in: JSON.parse(deletedImages) } },
                });
            }
            if (files && files.length > 0) {
                const images = files.map((file) => ({
                    category_id: +id,
                    url: file.path,
                }));
                yield prisma.categoriesImages.createMany({
                    data: images,
                });
            }
            yield prisma.category.update({
                where: { id: +id },
                data: { name, description },
            });
            res.status(200).send("Category and images updated successfully");
        }
        catch (error) {
            res
                .status(500)
                .json({ error: "Failed to update category or images", err: error });
        }
    }));
});
exports.EditCategory = EditCategory;

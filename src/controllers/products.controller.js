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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.ProductToggleVisibility = exports.getProductById = exports.getProducts = exports.addProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category_Id, description } = req.body;
    try {
        const product = yield prisma.product.create({
            data: {
                name,
                price,
                category_Id,
                description,
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
exports.addProduct = addProduct;
// Get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            include: { category: { select: { name: true } } },
        });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
exports.getProducts = getProducts;
// Get a single product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield prisma.product.findUnique({
            where: { id: parseInt(id) },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
exports.getProductById = getProductById;
const ProductToggleVisibility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, hidden } = req.body;
    if (!id && id !== 0) {
        res.status(500).json({ error: "Please provide an id" });
    }
    try {
        yield prisma.product.update({
            where: { id: id },
            data: {
                isHidden: !hidden,
            },
        });
        res.status(200).send("Product modified successfully");
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to toggle visiblity for Product", err: error });
    }
});
exports.ProductToggleVisibility = ProductToggleVisibility;
// Update a product by ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, category_Id, description } = req.body;
    try {
        const updatedProduct = yield prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                price,
                category_Id,
                description,
            },
        });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
});
exports.updateProduct = updateProduct;

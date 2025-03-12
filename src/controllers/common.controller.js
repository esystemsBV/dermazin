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
exports.getTableData = exports.handleDeleteFromTableById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const handleDeleteFromTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { table, id } = req.params;
    const allowedTables = ["user", "order", "product", "category"];
    if (!allowedTables.includes(table)) {
        res.status(400).json({ error: "Invalid table name" });
    }
    try {
        yield prisma[table].delete({
            where: { id: +id },
        });
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                res.status(404).json({ error: "Record not found" });
            }
        }
        res.status(500).json({ error: "Failed to delete record", err: error });
    }
});
exports.handleDeleteFromTableById = handleDeleteFromTableById;
const getTableData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { table, id } = req.params;
    const allowedTables = ["user", "order", "product", "category"];
    if (!allowedTables.includes(table)) {
        res.status(400).json({ error: "Invalid table name" });
    }
    try {
        yield prisma[table].delete({
            where: { id: +id },
        });
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                res.status(404).json({ error: "Record not found" });
            }
        }
        res.status(500).json({ error: "Failed to delete record", err: error });
    }
});
exports.getTableData = getTableData;

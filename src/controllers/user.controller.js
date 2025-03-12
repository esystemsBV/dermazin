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
exports.logoutUser = exports.editUser = exports.getUsers = exports.me = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_1 = require("../app");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, role } = req.body;
    try {
        const existingUser = yield app_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield app_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
            },
        });
        res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield app_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        // Store user info in the session
        req.session.user = {
            id: user.id,
            name: user.name,
            role: user.role,
        };
        res.json({
            message: "Login successful",
            user: { id: user.id, email: user.email, role: user.role },
        });
    }
    catch (error) {
        console.error("Failed to log in:", error);
        res.status(500).json({ error: "Failed to log in" });
    }
});
exports.loginUser = loginUser;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.user) {
        res.status(401).json({ error: "No active session." });
        return;
    }
    try {
        const user = yield app_1.prisma.user.findUnique({
            where: { id: req.session.user.id },
            select: { email: true, role: true, name: true },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error("Failed to fetch user details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.me = me;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield app_1.prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to see users" });
    }
});
exports.getUsers = getUsers;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, name, role } = req.body;
    try {
        yield app_1.prisma.user.update({
            where: { id: +id },
            data: { email, name, role },
        });
        res.send("edited-success");
    }
    catch (error) {
        res.status(500).json({ error: "Failed to see users" });
    }
});
exports.editUser = editUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err) {
            console.error("Failed to destroy session:", err);
            res.status(500).json({ error: "Failed to log out" });
            return;
        }
        res.json({ message: "Logged out successfully" });
    });
});
exports.logoutUser = logoutUser;

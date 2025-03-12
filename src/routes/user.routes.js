"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
router.post("/check", user_controller_1.me);
router.post("/logout", user_controller_1.logoutUser);
router.get("/list", user_controller_1.getUsers);
router.put("/edit/:id", user_controller_1.editUser);
exports.default = router;

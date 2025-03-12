"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSession = void 0;
const authenticateSession = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).json({ error: "Access denied. No active session." });
        return;
    }
    next();
};
exports.authenticateSession = authenticateSession;

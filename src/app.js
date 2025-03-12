"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const common_routes_1 = __importDefault(require("./routes/common.routes"));
const sepeedex_routes_1 = __importDefault(require("./routes/sepeedex.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const categories_routes_1 = __importDefault(
  require("./routes/categories.routes")
);
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
app.use((0, cookie_parser_1.default)());
app.use(
  (0, cors_1.default)({
    credentials: true,
    origin: true,
  })
);
app.use(express_1.default.json());
app.use(
  (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use("/api/uploads", express_1.default.static("uploads"));
app.use("/api/common", common_routes_1.default);
app.use("/api/auth", user_routes_1.default);
app.use("/api/categories", categories_routes_1.default);
app.use("/api/products", products_routes_1.default);
app.use("/api/delivery", sepeedex_routes_1.default);
app.get("/api/health", (_req, res) => {
  res.status(200).send("Server is running");
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../client")));
app.get("*", (req, res) => {
  const htmlFile = path_1.default.join(__dirname, "../client/index.html");
  res.sendFile(htmlFile);
});

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
exports.getOrderByTracking = exports.addParcel = exports.getParcelsData = exports.getStatusData = void 0;
const axios_1 = __importDefault(require("axios"));
const getStatusData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield axios_1.default.post("https://clients.speedex.ma/api/list-status", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + process.env.API_TOKEN,
            },
        });
        res.status(200).json(results.data.data);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getStatusData = getStatusData;
const getParcelsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { start_date, end_date } = req.body;
    try {
        const results = yield axios_1.default.post("https://clients.speedex.ma/api/parcel-status-listing-bydate", {
            date_start: start_date || 1701705879,
            date_end: end_date || 1736279084,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + process.env.API_TOKEN,
            },
        });
        res.status(200).json(results.data.data);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getParcelsData = getParcelsData;
const addParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client_name, client_phone, order_price, order_city, order_address, order_name, order_notes, } = req.body;
    try {
        const order = yield axios_1.default.post("https://clients.speedex.ma/api/add-parcels", {
            parcels: [
                {
                    id: 1,
                    parcel_receiver: client_name,
                    parcel_phone: client_phone,
                    parcel_price: order_price,
                    parcel_city: order_city,
                    parcel_address: order_address,
                    parcel_note: order_notes,
                    marchandise: order_name,
                },
            ],
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + process.env.API_TOKEN,
            },
        });
        res.status(200).json({
            message: "Order Added successfuly",
            order_id: order.data.success[1],
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error Adding Order", error: error });
    }
});
exports.addParcel = addParcel;
const getOrderByTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.params;
    try {
        const results = yield axios_1.default.post("https://clients.speedex.ma/api/tracking", { tracking_number: number }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + process.env.API_TOKEN,
            },
        });
        res.status(200).json(results.data.data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOrderByTracking = getOrderByTracking;

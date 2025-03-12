"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

("use strict");

const express = require("express");

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app_1.app.listen(
  PORT,
  // HOST,
  () => {
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        console.log(`Running on http://${HOST}:${PORT}`);
        yield app_1.prisma.$connect();
        console.log("Connected to the database");
      } catch (error) {
        console.log("ERROR, ", error);
      }
    });
  }
);

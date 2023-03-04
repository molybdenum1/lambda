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
exports.insertData = exports.DropTableData = exports.conn = void 0;
const mysql_1 = __importDefault(require("mysql"));
const insertCryptoInDB_1 = require("../insertCryptoInDB");
exports.conn = mysql_1.default.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b1f3ae1edcd7a4",
    password: "173030a1",
    database: 'heroku_5f2d735c3a54dd8'
});
const DropTableData = () => __awaiter(void 0, void 0, void 0, function* () {
    const dropTBL = `DELETE FROM crypta`;
    yield exports.conn.query(dropTBL, function (err, result) {
        if (err)
            throw err;
        console.log("Table rows deleted");
    });
});
exports.DropTableData = DropTableData;
const insertData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.DropTableData)();
    yield (0, insertCryptoInDB_1.insertCoinStatsCryptoInDB)();
    yield (0, insertCryptoInDB_1.insertCoinPaprikaCryptoInDB)();
    yield (0, insertCryptoInDB_1.insertCuCryptoInDB)();
    yield (0, insertCryptoInDB_1.insertCoinMarketCryptoInDB)();
});
exports.insertData = insertData;

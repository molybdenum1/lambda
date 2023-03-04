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
exports.getCrypto = void 0;
const axios_1 = __importDefault(require("axios"));
const links_1 = require("./data/links");
const getCrypto = (period, coin, market) => __awaiter(void 0, void 0, void 0, function* () {
    let apiLink;
    let response;
    if (market) {
        apiLink = links_1.apiLinks.filter(apiLink => apiLink.name === market)[0];
        // if(coin){
        //     response = axios.get(`${link}`)
        // }
        if (apiLink.headers) {
            response = yield axios_1.default.get(`${apiLink.link}`, {
                headers: {
                    'X-CMC_PRO_API_KEY': 'e320c0a3-b5e4-4a99-8fac-750034ab5716'
                }
            });
        }
        else {
            response = yield axios_1.default.get(`${apiLink.link}`);
        }
    }
    return response === null || response === void 0 ? void 0 : response.data;
});
exports.getCrypto = getCrypto;
// console.log(getCrypto('', '', 'coinbase'));

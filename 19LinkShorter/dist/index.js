"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
// const bodyParser = require('body-parser');
// const shortid = require('shortid');
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const shortid_1 = __importDefault(require("shortid"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const urls = [];
app.post('/shorten', (req, res) => {
    const { url } = req.body;
    const shortURL = shortid_1.default.generate();
    urls.push({ shortURL, url });
    res.json({ shortURL: `http://localhost:5000/${shortURL}` });
});
app.get('/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;
    const urlObj = urls.find(url => url.shortURL === shortURL);
    if (!urlObj) {
        res.status(404).send('Not Found');
        return;
    }
    res.redirect(urlObj.url);
});
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
//# sourceMappingURL=index.js.map
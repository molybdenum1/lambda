import express from "express";
import getCountryfromIP from "./getCountry/getCountry.js";
import getMyIp from "./getMyIp/getMyIp.js";

let app = express();

app.get("/myIp", (req, res) => {
  let ip = getMyIp();
  res.send(getCountryfromIP(ip));
});

app.get("/ipFromParams", (req, res) => {
  let ip = req.query?.ip;
  res.send(getCountryfromIP(ip));
});

app.listen(5000, () => {
  console.log("Running on 5000 port");
});

// console.log(getCountryfromIP('77.83.248.211'));//romania
// console.log(getCountryfromIP('45.234.156.1'));//chile
// console.log(getCountryfromIP('23.43.23.15'));//uk
// console.log(getCountryfromIP('185.182.120.34')); //Armenia
// console.log(getCountryfromIP('45.177.176.23')); //Mexico
// console.log(getCountryfromIP('5.44.80.51')); //Turkey
// console.log(getCountryfromIP('91.149.48.22')); //Norway
// console.log(getCountryfromIP('83.229.33.3')); //Spain
// console.log(getCountryfromIP('203.24.108.65')); //Cyprus
// console.log(getCountryfromIP('89.28.176.5')); //Ireland
// console.log(getCountryfromIP(')); //

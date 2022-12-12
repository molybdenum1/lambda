// let express = require('express');
// const ip  = require('./getIp/index');
import getCountryfromIP from "./getCountry/getCountry.js";
// let app = express();

// app.get('/', (req, res) => {
//     // const ipAddresses = req.header('x-forwarded-for');
//     let ip = '';
//     if (req.headers['x-forwarded-for']) {
//         ip = req.headers['x-forwarded-for'].split(",")[0];
//     } else if (req.connection && req.connection.remoteAddress) {
//         ip = req.connection.remoteAddress;
//     } else {
//         ip = req.ip;
//     }console.log("client IP is *********************" + ip);
//     res.send(ip);
//     // console.log();
// })

// app.listen(5000, () => {
//     console.log('Running on 5000 port');
// })
// // ip.getIP()


// console.log(data);


console.log(getCountryfromIP('77.83.248.211'));//romania
console.log(getCountryfromIP('45.234.156.1'));//chile
console.log(getCountryfromIP('23.43.23.15'));//uk
console.log(getCountryfromIP('185.182.120.34')); //Armenia
console.log(getCountryfromIP('45.177.176.23')); //Mexico 
console.log(getCountryfromIP('5.44.80.51')); //Turkey
console.log(getCountryfromIP('91.149.48.22')); //Norway
console.log(getCountryfromIP('83.229.33.3')); //Spain
console.log(getCountryfromIP('203.24.108.65')); //Cyprus
console.log(getCountryfromIP('89.28.176.5')); //Ireland
console.log(getCountryfromIP('91.193.172.165')); //


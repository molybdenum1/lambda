// let express = require('express');
// const ip  = require('./getIp/index');
let fs = require('fs');
let rl = require('readline');

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

let data = fs.readFileSync('loc.CSV', 'utf-8');
data = data.split('\r\n');

// console.log(data);

function getCountryfromIP (){
    let ip = '18518212034'
    // let searcherIP = ip.split('.').join('')
    for (let i in data) { 
        let [from, to, countryIndex, country] = data[i].split(",");
        // console.log(from);
        if(ip > from.replace(/(^\"+|\"+$)/g, '') && ip < to.replace(/(^\"+|\"+$)/g, '')){
            return `${countryIndex}, ${country}`
        }
    }
}
//45.232.208.143
console.log(getCountryfromIP())
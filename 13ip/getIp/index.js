let os = require('os');

 function getIP() {
    let networkInterfaces = os.networkInterfaces();
    console.log( networkInterfaces.Ethernet[1].address);
    // return networkInterfaces.Ethernet[1].address;
};
module.exports = { getIP }
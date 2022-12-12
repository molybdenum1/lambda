import ip2int from '../workWithIp/IpToInt.js';
import int2ip from '../workWithIp/intToIP.js';
import getData from '../getCvsData/getData.js';


export default function getCountryfromIP (ip){
    let intIp = ip2int(ip);
    let data = getData();
    for (let i in data) { 
        let [from, to, countryIndex, country] = data[i].split(",");
        // console.log(from);
        if(intIp > from.replace(/(^\"+|\"+$)/g, '') && intIp < to.replace(/(^\"+|\"+$)/g, '')){
            return `${countryIndex}, ${country} -- ${ip}`
        }
    }
}
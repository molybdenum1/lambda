const fs = require('fs');
const sort = require('./sort.js');
// import {} from './files/out0.txt'

function uniqueValues() {
    try {
        const data = [];
        for(let i = 0; i <= 19; i++){
            let str = fs.readFileSync(`./files/out${i}.txt`, {encoding: 'utf8'});
            data.push(...str.split('\n'))
        }
        // 
        // let set = new Set(sort(data));
        console.log(sort(data));
        // console.log(set);
    } catch (error) {
        console.log(error);
    }
}


uniqueValues()
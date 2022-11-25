const fs = require('fs');
// import {} from './files/out0.txt'

function uniqueValues() {
    try {
        const data = [];
        for(let i = 0; i <= 19; i++){
            let str = fs.readFileSync(`./files/out${i}.txt`, {encoding: 'utf8'});
            data.push(...str.split('\n'))
        }
        let set = new Set(data.sort((a,b) => a - b));
        console.log(data.length);
        console.log(set.size);
    } catch (error) {
        console.log(error);
    }
}


uniqueValues()
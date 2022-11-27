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
        let set = new Set(sort(data));
        // console.log(sort(data));
        console.log(set);
        return set;
    } catch (error) {
        console.log(error);
    }
}

function existInAllFiles(arrayOfStrings) {
    let arrOfExist = [];
    for (let i = 0; i < arrayOfStrings.length; i++) {
        let iterator = 0
        for(let j = 0; j <= 19; i++){
            let str = fs.readFileSync(`./files/out${j}.txt`, {encoding: 'utf8'});
            if(str.includes(arrayOfStrings[i])){
                iterator++
            }
        }
        if(iterator === 20){
            arrOfExist.push(arrayOfStrings[i])
        }
        
    }
    console.log(arrOfExist);
}


let unique = uniqueValues();
existInAllFiles(...unique);
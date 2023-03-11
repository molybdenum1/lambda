interface Array<T>{
    multiply(facto: number): T[];
    average(): number,
    myFilter(condition: (num: number) => boolean): any[]
}

Array.prototype.multiply = function(factor = 2): number[] {
    const result: number[] = [];
    for(let i = 0; i < this.length; i++){
        result.push(this[i]* factor)
    }

    return result;
}

Array.prototype.average = function(): number {
    return this.reduce((a,b) => a+b, 0)/this.length;;
}
Array.prototype.myFilter = function(condition: (num: number) => boolean): any[] {
    const filteredArray = [];
    for(let i = 0; i < this.length; i++){
        if(condition(this[i])){
            filteredArray.push(arr[i]);
        }
    }
    return filteredArray;
}



const arr: number[] = [2,4,5,6]
console.log(arr.multiply(3));
console.log(arr.average());
console.log(arr.myFilter((num) => num % 2 !== 0));



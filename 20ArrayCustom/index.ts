// **associateBy**
// average +
// chunked
// distinctBy
// filter +
// filterIndexed
// filterNot +
// find +
// findLast
// flatten
// fold
// maxBy
// minBy
// count + (с селектором — у нас есть массив обьектов, внутри обьекта ключ, например, population).
// И мы хотим посчитать общее население по всем обьектам. (аналог countBy).
// groupBy - оба


interface Array<T>{
    multiply(facto: number): T[];
    average(): number,
    myFilter(condition: (num: number) => boolean): T[],
    filterIndexed(): number[],
    filterNot(predicate: (value: T) => boolean): T[],
    findFirst(predicate: (value: T) => boolean): number | null,
    fold<U>(initialValue: U, operation: (accumulator: U, element: T) => U): U,
    count(predicate: (value:T, index: number, array: T[]) => boolean): number,
}

Array.prototype.multiply = function(factor = 2): number[] {
    const result: number[] = [];
    for(let i = 0; i < this.length; i++){
        result.push(this[i]* factor)
    }

    return result;
}

Array.prototype.average = function(): number {
    return this.reduce((a,b) => a+b, 0)/this.length;
}

Array.prototype.myFilter = function(condition) {
    const filteredArray = [];
    for(let i = 0; i < this.length; i++){
        if(condition(this[i])){
            filteredArray.push(arr[i]);
        }
    }
    return filteredArray;
}

// Array.prototype.filterIndexed = function(): number[] {
//   return this
//}

Array.prototype.filterNot = function(predicate) {
    return this.filter((value: any) => !predicate(value))
}

Array.prototype.findFirst = function(predicate): number | null {
    const found = this.find(predicate);
    return found? found : null;
}
Array.prototype.count = function(predicate) {
    return this.reduce((counter, value, index, array) => {
        if(predicate(value, index, array)) {
            return counter + 1;
        }
        return counter;
    }, 0)
}

Array.prototype.fold = function<T,U>(initialValue: U, operation: (accumulator: U, element: T) => U) {
    let accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
        accumulator = operation(accumulator, this[i]);
    }
    return accumulator;
}



const arr: number[] = [2,4,5,6]
console.log(arr.multiply(3));
console.log(arr.average());
console.log(arr.myFilter((num) => num % 2 !== 0));
console.log(arr.filterNot((num) => num % 2 !== 0));
console.log(arr.findFirst((num) => num % 2 === 0));
console.log(arr.count((num) => num % 2 === 0));
console.log(arr.fold(1, (accumulator, element) => accumulator * element));





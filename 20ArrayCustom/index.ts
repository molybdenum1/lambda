// **associateBy**
// average +
// chunked
// distinctBy
// filter +
// filterIndexed +
// filterNot +
// find +
// findLast +
// flatten + 
// fold +
// maxBy
// minBy
// count + (с селектором — у нас есть массив обьектов, внутри обьекта ключ, например, population).
// И мы хотим посчитать общее население по всем обьектам. (аналог countBy).
// groupBy - оба

interface Array<T> {
  multiply(facto: number): T[];
  average(): number;
  myFilter(condition: (num: number) => boolean): T[];
  filterIndexed(predicate: (index: number, value: T) => boolean): T[];
  filterNot(predicate: (value: T) => boolean): T[];
  findFirst(predicate: (value: T) => boolean): number | null;
  findLast(predicate: (value: T) => boolean): T | null;
  fold<U>(initialValue: U, operation: (accumulator: U, element: T) => U): U;
  flatten(): Array<T>;
  count(predicate: (value: T, index: number, array: T[]) => boolean): number;
}

Array.prototype.multiply = function (factor = 2): number[] {
  const result: number[] = [];
  for (let i = 0; i < this.length; i++) {
    result.push(this[i] * factor);
  }

  return result;
};

Array.prototype.average = function (): number {
  return this.reduce((a, b) => a + b, 0) / this.length;
};

Array.prototype.myFilter = function (condition) {
  const filteredArray = [];
  for (let i = 0; i < this.length; i++) {
    if (condition(this[i])) {
      filteredArray.push(arr[i]);
    }
  }
  return filteredArray;
};

Array.prototype.filterIndexed = function (
  predicate: (index: number, value: number) => boolean
): number[] {
  const filteredArr = [];
  arr.forEach((value, index) => {
    if (predicate(index, value)) {
      filteredArr.push(value);
    }
  });
  return filteredArr;
};

Array.prototype.filterNot = function (predicate) {
  return this.filter((value: any) => !predicate(value));
};

Array.prototype.findFirst = function (predicate): number | null {
  for (let i = 0; i <= this.length; i++) {
    const value = this[i];
    if (predicate(value)) {
      return value;
    }
  }
  return null;
};
Array.prototype.findLast = function (predicate): number | null {
  for (let i = this.length - 1; i >= 0; i--) {
    const value = this[i];
    if (predicate(value)) {
      return value;
    }
  }
  return null;
};

Array.prototype.flatten = function (): any {
  let flattenedArray = [];
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (Array.isArray(element)) {
      flattenedArray = flattenedArray.concat(element.flatten());
    } else {
      flattenedArray.push(element);
    }
  }
  return flattenedArray.sort((a,b) => a - b);
};

Array.prototype.count = function (predicate) {
  return this.reduce((counter, value, index, array) => {
    if (predicate(value, index, array)) {
      return counter + 1;
    }
    return counter;
  }, 0);
};

Array.prototype.fold = function <T, U>(
  initialValue: U,
  operation: (accumulator: U, element: T) => U
) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = operation(accumulator, this[i]);
  }
  return accumulator;
};

const arr: number[] = [1, 2, 3, 4, 5];
console.log("Array by default " + arr);
console.log("Multiply: " + arr.multiply(3));
console.log("Average: " + arr.average());
console.log("Filter: " + arr.myFilter((num) => num % 2 !== 0));
console.log(
  "Filter indexed: " +
    arr.filterIndexed((index, value) => index % 2 === 0 && value % 2 === 0)
);

console.log("Not Filter: " + arr.filterNot((num) => num % 2 === 0));
console.log("FirstEl : " + arr.findFirst((num) => num % 2 === 0));
console.log("LastEl : " + arr.findLast((num) => num % 2 === 0));
console.log("Flatten : " + [1,2,[2, [33,1], 2], 9].flatten());

console.log("Count: " + arr.count((num) => num % 2 === 0));
console.log(
  "Fold: " + arr.fold(1, (accumulator, element) => accumulator * element)
);

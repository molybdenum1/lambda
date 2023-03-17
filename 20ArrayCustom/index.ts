// **associateBy** +
// average +
// chunked +
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
// groupBy - оба +-

interface Array<T> {
  multiply(facto: number): T[];
  associateBy<K>(keySelector: (value: T) => K): Map<K, T>;
  average(): number;
  chunked(size: number): T[][];
  myFilter(condition: (num: number) => boolean): T[];
  filterIndexed(predicate: (index: number, value: T) => boolean): T[];
  filterNot(predicate: (value: T) => boolean): T[];
  findFirst(predicate: (value: T) => boolean): number | null;
  findLast(predicate: (value: T) => boolean): T | null;
  fold<U>(initialValue: U, operation: (accumulator: U, element: T) => U): U;
  flatten(): Array<T>;
  maxBy(fn: (i: T) => number) :T | undefined;
  minBy(fn: (i: T) => number): T | undefined;
  count(predicate: (value: T, index: number, array: T[]) => boolean): number;
  groupBy<T, K>(keySelector: (element: T) => K): Map<K, T[]>;
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

Array.prototype.associateBy = function (keySelector) {
  const map = new Map();
  for (const el of this) {
    const key = keySelector(el);
    map.set(key, el);
  }
  return map;
};

Array.prototype.chunked = function (size) {
  const result = [];
  let chunk = [];
  for (let i = 0; i < this.length; i++) {
    chunk.push(this[i]);
    if (chunk.length === size) {
      result.push(chunk);
      chunk = [];
    }
  }

  if (chunk.length > 0) {
    result.push(chunk);
  }
  return result;
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

Array.prototype.flatten = function(): any[] {
  let flattenedArray = [];
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (Array.isArray(element)) {
      flattenedArray = flattenedArray.concat(element.flatten());
    } else {
      flattenedArray.push(element);
    }
  }
  return flattenedArray.sort((a, b) => a - b);
};

Array.prototype.maxBy = function(fn){
  if (this.length === 0) {
    return undefined;
  }

  let maxElement = this[0];
  let maxValue = fn(maxElement);

  for (let i = 1; i < this.length; i++) {
    const element = this[i];
    const value = fn(element);

    if (value > maxValue) {
      maxElement = element;
      maxValue = value;
    }
  }

  return maxElement;
}

Array.prototype.minBy = function(fn) {
   if (this.length === 0) {
    return undefined;
  }

  let minElement = this[0];
  let minValue = fn(minElement);

  for (let i = 1; i < this.length; i++) {
    const element = this[i];
    const value = fn(element);

    if (value < minValue) {
      minElement = element;
      minValue = value;
    }
  }

  return minElement;
}

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

Array.prototype.groupBy = function (keySelector) {
  const map = new Map();
  for (const element of this) {
    const key = keySelector(element);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)?.push(element);
  }
  return map;
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
console.log("Flatten : " + [1, 2, [2, [33, 1], 2], 9].flatten());
console.log("MaxBy : " + arr.maxBy((num) => num  * num));
console.log("MinBy : " + arr.minBy((num) => num  * num));

console.log("Count: " + arr.count((num) => num % 2 === 0));
console.log(arr.chunked(2));

console.log(
  "Fold: " + arr.fold(1, (accumulator, element) => accumulator * element)
);
console.log("+++++++++++++++++");
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Alice", age: 24 },
  { name: "Bob", age: 30 },
  { name: "Bobi", age: 25 },
  { name: "Charlie", age: 26 },
  { name: "Dame", age: 22 },
  { name: "Edward", age: 26 },
  { name: "Franklin", age: 26 },
  { name: "Gerald", age: 28 },
  { name: "Harry", age: 21 },
];

const peopleByName = people.associateBy((person) => person.name);
console.log(peopleByName);

const peopleByAge = people.associateBy((person) => person.age);
// console.log(peopleByAge);
console.log("++++++++++++++++++++++++++");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const parityGroups = numbers.groupBy((n: number) =>
  n % 2 === 0 ? "even" : "odd"
);
const ageGroups = people.groupBy((person: Person) => person.age);
console.log(parityGroups);
console.log(ageGroups);

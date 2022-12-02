const fs = require("fs");
const sort = require("./sort.js");

function uniqueValues() {
  try {
    const data = [];
    for (let i = 0; i <= 19; i++) {
      let str = fs.readFileSync(`./bigBoy/out${i}.txt`, { encoding: "utf8" });
      data.push(...str.split("\n"));
    }
    //
    let set = new Set(sort(data));
    // console.log(sort(data));
    console.log("Уникальных словосочетаний: " + set.size);
    return set;
  } catch (error) {
    console.log(error);
  }
}

function existInAllFiles() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    let str = fs.readFileSync(`./bigBoy/out${i}.txt`, { encoding: "utf8" });
    let set = new Set(str.split("\n"));
    data.push(...set);
  }
  let obj = {};
  obj = data.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
  const newArr = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value == 20) {
      newArr.push(key);
    }
  }

  console.log(
    "Словосочетаний, которые есть во всех 20 файлах: " + newArr.length
  );
}
function existInAtLeastTen() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    let str = fs.readFileSync(`./bigBoy/out${i}.txt`, { encoding: "utf8" });
    let set = new Set(str.split("\n"));
    data.push(...set);
  }
  let obj = {};
  obj = data.reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
  const newArr = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value >= 10) {
      newArr.push(key);
    }
  }

  console.log(
    "Словосочетаний, которые есть, как минимум, в десяти файлах: " +
      newArr.length
  );
}

uniqueValues();
existInAllFiles();
existInAtLeastTen();
// bigBoy
// smallBoy

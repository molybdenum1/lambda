import fetch from "node-fetch";
import linksArr from "./arr.js";

async function getObj(i) {
  const res = await fetch(linksArr[i]);
  return await res.json();
}

function search(obj) {
  let done = false;

  for (const i in obj) {
    if (typeof i === "object" && !Array.isArray(i) && i !== null) {
      search(i);
    }
    if (i === "isDone") {
      done = obj[i];
    }
  }
  return done;
}

let isTrue = 0,
  isFalse = 0;

for (const i in linksArr) {
  let obj = await getObj(i);
  let ans = search(obj);
  ans ? isTrue++ : isFalse++;
  console.log(`In link ${i} isTrue is ` + ans);
}
console.log("True: " + isTrue);
console.log("False: " + isFalse);

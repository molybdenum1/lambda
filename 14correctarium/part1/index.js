function calculatePrice(symbolNumbers, documentType, lang) {
  const pricePerCyrillicSymbol = 0.05;
  const pricePerLatinSymbol = 0.12;
  const minCyrillicPrice = 50;
  const minLatinPrice = 120;

  let price = 0;

  if (lang === "eng") {
    price = symbolNumbers * pricePerLatinSymbol;
    if (price > minLatinPrice) {
      if (!checkDocumentType(documentType)) {
        return price + price * 0.2;
      }
      return price;
    }
    return minLatinPrice;
  }
  if (lang === "rus" || lang === "ukr") {
    price = symbolNumbers * pricePerCyrillicSymbol;
    if (price > minCyrillicPrice) {
      if (!checkDocumentType(documentType)) {
        return price + price * 0.2;
      }
      return price;
    }
    return minCyrillicPrice;
  }
}

function checkDocumentType(documentType) {
  let documentTypes = [".doc", ".docx", ".rtf"];

  return documentTypes.includes(documentType);
}

function calculateDeadline(symbolNumbers, documentType, lang) {
  let orderTime = new Date();
  let timeForWork = Math.ceil(
    calculateTimeForWork(symbolNumbers, documentType, lang) / 60
  );
  // console.log(timeForWork);
  let deadLine = workingDays(
    +orderTime.getMonth() +
      1 +
      "." +
      orderTime.getDate() +
      "." +
      orderTime.getFullYear() +
      " " +
      orderTime.getUTCHours(),
    timeForWork
  );

  // let date = new Date((timeForWork + orderTime) * 1000);
  // console.log(deadLine);
  return deadLine;
}

function calculateTimeForWork(symbolNumbers, documentType, lang) {
  const CyrillicSympolsPerHour = 1333;
  const LatinSympolsPerHour = 333;
  const minTime = 60;

  let timeToDoWork = 30;

  if (lang === "eng") {
    timeToDoWork =
      timeToDoWork + symbolNumbers / Math.floor(LatinSympolsPerHour / 60);
    if (timeToDoWork > minTime) {
      return !checkDocumentType(documentType)
        ? timeToDoWork + timeToDoWork * 0.2
        : timeToDoWork;
    }
    return minTime;
  }
  if (lang === "rus" || lang === "ukr") {
    timeToDoWork =
      timeToDoWork + symbolNumbers / Math.floor(CyrillicSympolsPerHour / 60);
    if (timeToDoWork > minTime) {
      return !checkDocumentType(documentType)
        ? timeToDoWork + timeToDoWork * 0.2
        : timeToDoWork;
    }
    return minTime;
  }
  return !checkDocumentType(documentType) ? minTime + minTime * 0.2 : minTime;
}

function workingDays(orderTime, timeForExec) {
  let [date, time] = orderTime.split(" ");
  let [mm, da, yy] = date.split(".");

  let dd = new Date(date).getDay();
  if (dd === 6) {
    da = +da + 2;
    date = [mm, da, yy].join(".");
    time = 10;
    console.log(date);
  }
  if (dd === 0) {
    da = +da + 1;
    date = [mm, da, yy].join(".");
    time = 10;
  }

  if (+time >= 19) {
    da = +da + 1;
    date = [mm, da, yy].join(".");
    time = 10;
    // console.log(date, time);
  }
  if (+time <= 10) {
    time = 10;
  }
  while (timeForExec > 0) {
    let d = new Date(date).getDay();
    if(d == 0){
      da = +da + 1;
      date = [mm, da, yy].join(".");
      time = 10;
    }
    if(d === 6) {
      da = +da + 2;
      date = [mm, da, yy].join(".");
      time = 10;
      // console.log(date);
    }
    if (time + timeForExec >= 19) {
      timeForExec = timeForExec - (19 - time);
      da = +da + 1;
      date = [mm, da, yy].join(".");
      time = 10;
    } else {
      time += timeForExec;
      timeForExec = 0;
    }
    console.log(date, time);
  }

  return date + " " + time + ":00";
}
console.log(workingDays('2.9.2023 15', 100));
function correctarium(symbolNumbers, documentType, lang) {
  let price = calculatePrice(symbolNumbers, documentType, lang);
  let deadLine = calculateDeadline(symbolNumbers, documentType, lang);
  deadLine = workingDays(deadLine);
  return { price, deadLine };
}

module.exports = { correctarium } 

// console.log(correctarium(5000, ".doc", "ukr"));
// console.log(Math.ceil(calculateTimeForWork(3000, ".doc", "eng")/60));

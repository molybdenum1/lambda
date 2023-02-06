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
  let orderTime = Math.floor(new Date() / 1000);
  let timeForWork =
    calculateTimeForWork(symbolNumbers, documentType, lang) * 60;
  let date = new Date((timeForWork + orderTime) * 1000);

  return (
    +date.getMonth() +
    1 +
    "." +
    date.getDate() +
    "." +
    date.getFullYear() +
    " " +
    date.getUTCHours() +
    ":00"
  );
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

function workingDays(dateTime) {
  let [date, time] = dateTime.split(" ");
  let [mm, da, yy] = date.split(".");

  let dd = new Date(dateTime).getDay();
  if (dd === 6) {
    da = +da + 2;
    date = [mm, da, yy].join(".");
    time = "11:00";
    console.log(date);
  }
  if (dd === 0) {
    da = +da + 1;
    date = [mm, da, yy].join(".");
    time = "11:00";
    console.log(date);
  }
  let [hh, min] = time.split(":");
  if (+hh >= 19) {
    da = +da + 1;
    date = [mm, da, yy].join(".");
    time = "11:00";
  }
  if (+hh <= 10) {
    time = "11:00";
  }

  return date + " " + time;
}
// console.log(workingDays("2.6.2023 4:00"));

function isWorkingDay() {}

function correctarium(symbolNumbers, documentType, lang) {
  // console.log(calculatePrice(symbolNumbers, documentType, lang),'uah');
  // console.log(calculateDeadline(symbolNumbers, documentType, lang), 'min');
  let price = calculatePrice(symbolNumbers, documentType, lang);
  let deadLine = calculateDeadline(symbolNumbers, documentType, lang);
  deadLine = (workingDays(deadLine));
  return { price, deadLine };
}

console.log(correctarium(5000, ".doc", "eng"));

const { correctarium } = require("../correctarium/index");

test("3k sings, type: doc, lang: eng   ", () => {
  expect(correctarium(3000, ".doc", "eng")).toStrictEqual({
    price: 360,
    deadLine: "2.10.2023 18:00:00",
  });
});
test("10k sings, type: jpg, lang: ukr   ", () => {
  expect(correctarium(10000, ".jpg", "ukr")).toStrictEqual({
    price: 600,
    deadLine: "2.10.2023 17:00:00",
  });
});
test("600 sings, type: .doc, lang: ukr   ", () => {
  expect(correctarium(600, ".doc", "ukr")).toStrictEqual({
    price: 50,
    deadLine: "2.10.2023 10:00:00",
  });
});

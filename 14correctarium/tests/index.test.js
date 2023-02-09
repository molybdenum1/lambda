const { correctarium } = require("../part1/index")

// import {je} from 'jest'

test('3k sings, type: doc, lang: eng   ', () => {
    expect(correctarium(3000, ".doc", "eng")).toStrictEqual({ price: 360, deadLine: '2.10.2023 13:00:00' })
})
test('10k sings, type: jpg, lang: ukr   ', () => {
    expect(correctarium(10000, ".jpg", "ukr")).toStrictEqual({ price: 600, deadLine: '2.10.2023 12:00:00' })
})
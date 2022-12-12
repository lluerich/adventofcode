const fs = require("fs");
const rawData = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
const data = rawData.trim().split(/\n/);

// 3.1

console.log(data);

// find the most common bit in a sequence
function findMostCommonBit(str = "") {}

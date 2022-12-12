const fs = require('fs')
const rawData = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf-8'})
const data = rawData
  .trim()
  .split(/\n{2,}/)

// 1.1

const sumCalories = data.map(d => {
    const numbers = d.split(/\n/).map(n => Number(n))
    return numbers.reduce((prev, cur) => prev + cur, 0);
});

const maxCalories = Math.max(...sumCalories);
const elfIndex = sumCalories.indexOf(maxCalories);

console.log(`The elf at index ${elfIndex} has the most calories with ${maxCalories}`);

// 1.2

const sumCaloriesCopy = [...sumCalories];
const topThreeElfes = sumCaloriesCopy.sort((a, b) => a - b).splice(-3, 3);
const topThreeCalories = topThreeElfes.reduce((prev, cur) => prev + cur, 0);

console.log(topThreeCalories);
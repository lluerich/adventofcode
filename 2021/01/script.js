const fs = require('fs')
const rawData = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf-8'})
const data = rawData
  .trim()
  .split(/\n/)
  .map((n) => Number(n));

// 1.1

function scanDepths(sonarData = []) {
  let count = 0;
  let prev;
  sonarData.forEach((depth) => {
    if (prev && depth > prev) {
      count++;
    }
    prev = depth;
  });
  return count;
}

console.log(`depth increased ${scanDepths(data)} times.`);

// 1.2

function scanDepthTriplets(sonarData = []) {
  let count = 0;
  let prev;
  sonarData.forEach((depth, index, array) => {
    const cur =
      array.slice(index, index + 3).length === 3
        ? array.slice(index, index + 3).reduce((p, c) => p + c)
        : null;
    if (prev && cur && cur > prev) {
      count++;
    }
    prev = cur;
  });
  return count;
}

console.log(`triplet depth increased ${scanDepthTriplets(data)} times.`);
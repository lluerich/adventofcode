const fs = require("fs");
const rawData = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
const data = rawData
  .trim()
  .split(/\n/)
  .map((line) => {
    const [com, val] = line.split(" ");
    return [com, +val];
  });

// 2.1

function tracePosition(positionUpdates = []) {
  let depth = 0;
  let horizontalPosition = 0;

  positionUpdates.forEach((positionUpdate, index) => {
    const [command, value] = positionUpdate;
    switch (command) {
      case "forward":
        horizontalPosition += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
    }
  });

  return { depth, horizontalPosition };
}

const { depth: d, horizontalPosition: h } = tracePosition(data);

console.log(
  `depth: ${d}
horizontal position: ${h}
multiplied: ${d * h}`
);

// 2.2

function tracePositionAim(positionUpdates = []) {
  let depth = 0;
  let horizontalPosition = 0;
  let aim = 0;

  positionUpdates.forEach((positionUpdate, index) => {
    const [command, value] = positionUpdate;
    switch (command) {
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
      case "forward":
        horizontalPosition += value;
        depth += aim * value;
        break;
    }
  });

  return { depth, horizontalPosition, aim };
}

const { depth: d2, horizontalPosition: h2, aim: a } = tracePositionAim(data);

console.log(
  `depth: ${d2}
horizontal position: ${h2}
aim: ${a}
multiplied: ${d2 * h2}`
);

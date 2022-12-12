const fs = require("fs");
const rawData = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
const data = rawData.trim().split(/\n/);

// 3.1

function countInstances(str = "", search = "") {
  return str.split(search).length - 1;
}

function findMostCommon(str = "") {
  return ["0", "1"].filter((num) => {
    return countInstances(str, num) > str.length / 2;
  });
}

function rotateArray(arr = []) {
  return arr.reduce((prev, cur) => {
    cur.split("").forEach((char, index) => {
      prev[index] = prev[index] !== undefined ? (prev[index] += char) : "";
    });
    return prev;
  }, []);
}

function invertBinaryNumber(binaryString = "") {
  return binaryString
    .split("")
    .map((x) => 1 - parseInt(x))
    .join("");
}

function checkPowerConsumption(report = []) {
  let gammaRate = "";
  let epsilonRate = "";
  let powerConsumption;

  const rotatedReport = rotateArray(report);

  console.log(rotatedReport);

  rotatedReport.forEach((line) => {
    if (countInstances(line, "0") > (line.length - 1) / 2) {
      gammaRate += "0";
    } else {
      gammaRate += "1";
    }
  });

  epsilonRate = invertBinaryNumber(gammaRate);
  powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

  return powerConsumption;
}

console.log(`power consumption: ${checkPowerConsumption(data)}`);

// 3.2

function checkLifeSupportRating(report = []) {
  let oxygenGeneratorRating = "";
  let co2ScrubberRating = "";
  let lifeSupportRating;

  function calculateOxygenGeneratorRating(arr = [], index = 0) {
    console.log(arr, index);
    if (arr.length === 0) return;
    const rotated = rotateArray(arr);
    console.log(rotated);
    const [mostCommon] = findMostCommon(rotated[index]);

    const filtered = arr.filter((num) => num.startsWith(mostCommon));

    index++;

    calculateOxygenGeneratorRating(filtered, index);
  }

  // console.log(calculateOxygenGeneratorRating(report));
}

checkLifeSupportRating(data);

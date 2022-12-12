const fs = require("fs");
const rawData = fs.readFileSync(__dirname + "/data.txt", { encoding: "utf-8" });
const data = rawData.split(/[\n\r\s]+/);
const opponentMoves = data
  .filter((val, index) => index % 2 === 0)
  .map((move) => {
    switch (move) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
    }
  });
const playerMoves = data
  .filter((val, index) => index % 2 !== 0)
  .map((move) => {
    switch (move) {
      case "X":
        return 0;
      case "Y":
        return 1;
      case "Z":
        return 2;
    }
  });

const points = [1, 2, 3];
const possibleHands = ["rock", "paper", "scissors"];

// 2.1

const calculateScore = () => {
  let score = 0;

  for (let i = 0; i < data.length / 2; i++) {
    if (
      points.at(opponentMoves[i]) === points.at(playerMoves[i]) - 1 ||
      points.at(opponentMoves[i]) === points.at(playerMoves[i]) + 2
    ) {
      console.log(
        `WIN: ${possibleHands[playerMoves[i]]} beats ${
          possibleHands[opponentMoves[i]]
        }. Adding ${points[playerMoves[i]] + 6} to the score.`
      );
      score += points[playerMoves[i]] + 6;
    } else if (points.at(playerMoves[i]) === points.at(opponentMoves[i])) {
      console.log(
        `DRAW: ${possibleHands[playerMoves[i]]} draws against ${
          possibleHands[opponentMoves[i]]
        }. Adding ${points[playerMoves[i]] + 3} to the score.`
      );
      score += points[playerMoves[i]] + 3;
    } else {
      console.log(
        `LOSE: ${possibleHands[playerMoves[i]]} loses against ${
          possibleHands[opponentMoves[i]]
        }. Adding ${points[playerMoves[i]]} to the score.`
      );
      score += points[playerMoves[i]];
    }
  }

  return score;
};

console.log(`Total score: ${calculateScore()}`);

// 2.2 ugly solution...
const calculateActualScore = () => {
  let actualScore = 0;

  for (let i = 0; i < data.length / 2; i++) {
    switch (playerMoves[i]) {
      case 0:
        if (opponentMoves[i] === 0) {
            actualScore += points.at(2);
        } else if (opponentMoves[i] === 1) {
            actualScore += points.at(0);
        } else {
            actualScore += points.at(1);
        }
        break;
      case 1:
        actualScore += points[opponentMoves[i]] + 3;
        break;
      case 2:
        if (opponentMoves[i] === 0) {
            actualScore += points.at(1) + 6;
        } else if (opponentMoves[i] === 1) {
            actualScore += points.at(2) + 6;
        } else {
            actualScore += points.at(0) + 6;
        }
        break;
    }
  }

  return actualScore;
};

console.log(`Actual total score: ${calculateActualScore()}`);

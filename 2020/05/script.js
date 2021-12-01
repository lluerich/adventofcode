const fs = require('fs')
const rawData = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf-8'})
const data = rawData.trim().split(/\n{1}/)

function findSeat(seatDescription = []) {
  return seatDescription.map((code) => {
    let rowMax = 127
    let rowMin = 0
    let colMax = 7
    let colMin = 0
    code.split('').forEach(dir => {
      switch(dir) {
        case 'F':
          rowMax = rowMin + Math.floor((rowMax - rowMin) / 2)
          break;
        case 'B':
          rowMin = rowMin + Math.ceil((rowMax - rowMin) / 2)
          break;
        case 'L':
          colMax = colMin + Math.floor((colMax - colMin) / 2)
          break;
        case 'R':
          colMin = colMin + Math.ceil((colMax - colMin) / 2)
          break;
      }
    })

    return rowMin * 8 + colMin
  })
}

const seatUIDs = findSeat(data)

console.log(`Highest Seat UID is: ${Math.max(...seatUIDs)}`)

const sortedUIDs = seatUIDs.sort((a, b) => {
  if(a < b) {
    return -1
  }
  if(a > b) {
    return 1
  }
})

console.log(`Your Seat UID is: ${sortedUIDs.reduce((acc, cur) => {
  if(acc + 1 === cur) {
    return cur
  }
  return acc
}) + 1}`)

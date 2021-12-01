const { count } = require('console')
const fs = require('fs')
const rawData = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf-8'})
const data = rawData.trim()

// 9.1

class Stream {
  constructor(stream, preambleLength) {
    this.preambleLength = preambleLength

    this.stream = stream.split(/\n/).filter(x => x).map(number => parseInt(number))
  }

  run() {
    for(let i = 0; i < this.stream.length - this.preambleLength; i++) {
      const preamble = this.stream.slice(i, this.preambleLength + i)
      const value = this.stream[this.preambleLength + i]

      const checkValue = (arr, val) => {
        let hashMap = {}
        for(let j = 0; j < arr.length; j++) {
          let thisNum = arr[j]
          hashMap[thisNum] = j
        }

        for(let k = 0; k < arr.length; k++) {
          let diff = val - arr[k]
          if(hashMap.hasOwnProperty(diff) && hashMap[diff] !== k) {
            return true
          }
        }
        return false
      }

      if(!checkValue(preamble, value)) {
        console.log('Preamble does not match: ', preamble, value)
        break;
      }

      // Slow O(n^2) solution
      // for(let j = 0; j < preamble.length; j++) {
      //   for(let k = 0; k < preamble.length; k++) {
      //     if(value === preamble[j] + preamble[k] && preamble[j] !== preamble[k]) {
      //       console.log('At least one solution found: ', value, preamble[j], preamble[k])
      //     } else {
      //       console.log('No solution found: ', value);
      //     }
      //   }
      // }
    }
  }
}

const s = new Stream(data, 25)
console.log('Stream: ', s.run())

// 9.2


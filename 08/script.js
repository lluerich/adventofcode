const { count } = require('console')
const fs = require('fs')
const rawData = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf-8'})
const data = rawData.trim()

// 8.1

// let current = 0
// let counter = 0
// let visited = []
// 
// function process(op = [], index = 0) {
//   console.log({op, index, current, counter})
//   const [action, amount] = op
//   switch(action) {
//     case 'acc':
//       counter += +amount
//       break;
//     case 'jmp':
//       current += +amount
//       break;
//     case 'nop':
//     default:
//       current += 1
//       break;
//   }
//   return
// }

// function run(list = []) {
//   for(let i = 0; i < list.length; i++) {
//     process(list[i], i)
//   }
// }

/**
 * I was having a lot of trouble with this one, so thanks to https://www.youtube.com/watch?v=K9MTZoQ6cmY for sharing your answer. Such nice and clean code. :)
 */

// run(data)
class Program {
  constructor(lines, options = {}) {
    this.accumulator = 0
    this.pointer = 0
    this.visited = new Set()
    this.options = options
    this.hasFinished = false

    this.code = lines.split(/\n/).filter(x => x).map(line => {
      const { groups } = /^(?<instruction>\D+)\s+\+?(?<value>-?\d+)$/.exec(line)
      groups.value = parseInt(groups.value)
      return groups
    })
  }

  run() {
    while(true) {
      if(this.pointer === this.code.length) {
        this.hasFinished = true
        break
      }
      const { instruction, value } = this.code[this.pointer]
      if(this.visited.has(this.pointer)) {
        if(this.options.infiniteLoopWarning) console.log(`Infinite loop detected. Current value of accumulator is: ${this.accumulator}`)
        break
      }

      this.visited.add(this.pointer)

      switch(instruction) {
        case 'acc':
          this.accumulator += value
          this.pointer++
          break
        case 'jmp':
          this.pointer += value
          break
        case 'nop':
          this.pointer++
          break
        default:
          throw new Error('not implemented')
      }
    }
  }
}

const p = new Program(data, {infiniteLoopWarning: true})
p.run()

// 8.2
const code = p.code

for(i in code) {
  const element = code[i]
  if(element.instruction === 'nop' || element.instruction === 'jmp') {
    const copy = JSON.parse(JSON.stringify(code))
    copy[i].instruction = element.instruction === 'nop' ? 'jmp' : 'nop'

    const newData = copy.map(x => `${x.instruction} ${x.value}`).join('\n')
    const fixedProgram = new Program(newData)
    fixedProgram.run()

    if(fixedProgram.hasFinished) {
      console.log(`Program has finished. Value of accumulator is: ${fixedProgram.accumulator}`)
    }
  }
}

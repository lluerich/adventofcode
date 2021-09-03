const { groupEnd } = require('console')
const fs = require('fs')
const rawData = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf-8'})
const data = rawData.trim().split(/\n{2,}/).filter(x => x)

// 6.1
const questionsAnsweredWithYes = data.reduce((total, group) => {
  const passPortSet = new Set([...group.replace(/\n/g, '')])

  return total += passPortSet.size
}, 0)

console.log(`Total questions answered with yes: ${questionsAnsweredWithYes}`)

// 6.2
const uniqueQuestionsAnswered = data.reduce((total, group) => {
  const passPortSet = new Set([...group])

  console.log({group})
  return total += [...passPortSet].filter(char => group.split(/\n/).filter(x => x).every(form => form.includes(char))).length
}, 0)

console.log(`The questions everyone answered with yes is: ${uniqueQuestionsAnswered}`)

const fs = require('fs')
const rawData = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf-8'})
const data = rawData.split(/\n/g).filter(x => x).map(line => line.split(/\s*contain\s*/gi))

// 7.1
// const atLeastOneShinyGoldBagDirectly = data.filter(rule => rule[1].includes('shiny gold'))
// const atLeastOneShinyGoldBagInAnotherBag = data.filter(rule => {
//   return atLeastOneShinyGoldBagDirectly.some(bag => rule[1].includes(bag[0]))
// })
let total = []

function containsBag(bagNames = []) {
  let bags = []
  bagNames.forEach(name => {
    bags = [...bags, ...data.filter(rule => rule[1].includes(name.replace(/bags?/g, '')))]
  })
  total.push(...bags)
  if(bags.length) {
    return containsBag(bags.map(item => item[0].replace(/bags?/g, '')))
  } else {
    return
  }
}
containsBag(['shiny gold'])

const actualTotal = new Set([...total])

console.log(`${actualTotal.size} bag colors can eventually contain at least one shiny gold bag`)

// 7.2
// console.log('data: ', data)
function bagsInside(bag = []) {
  const amountsInBag = bag[1].match(/([0-9]+)+/g)
  const bagsInBag = bag[1].match(/([a-z]\s?)+/gi)
  if(!amountsInBag) {
    return 0
  }
  let count = 0
  bagsInBag.forEach((bag, index) => {
    count += +amountsInBag[index]
    let filteredBag = data.filter(item => item[0].match(bag))
    if(filteredBag.length !== 0) {
      count += +amountsInBag[index] * bagsInside(...filteredBag)
    }
  })
  return count
}

const shinyGold = data.filter(item => item[0].match('shiny gold bags'))

console.log(`A ${shinyGold[0][0].replace('bags', 'bag')} must contain ${bagsInside(...shinyGold)} other bags to apply to all rules.`)

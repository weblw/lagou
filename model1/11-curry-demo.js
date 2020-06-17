// ''.match(/\s+/g)
// ''.match(/\d+/g)

const _ = require('lodash')

const match = _.curry(function (reg, str) {
  return str.match(reg)
})

const hasSpace = match(/\s+/g)
const hasNumber = match(/\d+/g)

// console.log(hasSpace('hello world'))
// console.log(hasNumber('abc1'))

const filter = _.curry(function (func, array) {
  return array.filter(func)
})

// console.log(filter(hasSpace, ['ass ss']))

const findSpace = filter(hasSpace)

console.log(findSpace(['ss ss', 'ss_ss']))
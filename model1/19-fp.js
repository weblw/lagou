// const _ = require('lodash')

// const r = _.map(['23', '8', '10'], parseInt)

// console.log(r)

// parseInt('23', 0, arr)
// parseInt('8', 1, arr)
// parseInt('10', 2, arr)

const fp = require('lodash/fp')

console.log(fp.map(parseInt, ['23', '8', '10']))
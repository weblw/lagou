const _ = require('lodash')

const split = _.curry((sep, str) => _.split(str, sep))

const join = _.curry((sep, array) => _.join(array, sep))

const log = v => {
  console.log(v)
  return v
}

const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})

const map = _.curry((fn, arr) => _.map(arr, fn))

const f = _.flowRight(join('-'), trace('map 之后'), map(_.toLower), trace('split 之后'), split(' '))

console.log(f('NEVER SAY DIE'))
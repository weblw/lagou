const _ = require('lodash')

// const f = _.flowRight(_.toUpper, _.first, _.reverse)
// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const f = _.flowRight(_.toUpper, (_.flowRight(_.first, _.reverse)))

console.log(f(['noe', 'two', 'three']))
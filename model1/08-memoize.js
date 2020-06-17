const _ = require('lodash')

function getArea(r) {
  console.log(r)
  return Math.PI * r * r
}

// let getAreaWithMemory = _.memoize(getArea)

// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))

// 模拟memoize方法的实现
function memoize(f) {
  let cache = {}
  return function () {
    let k = JSON.stringify(arguments)
    cache[k] = cache[k] || f.apply(f, arguments)
    return cache[k]
  }
}

let getAreaWithMemory = memoize(getArea)

console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
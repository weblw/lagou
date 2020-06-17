function curry(func) {
  return function curriedFn(...args) {
    // 判断实参和形参的个数
    console.log(func.length)
    if (args.length < func.length) {
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }
    return func(...args)
  }
}

function getSum(a, b, c) {
  return a + b + c
}
console.log(getSum.length) // 函数形参个数

const curried = curry(getSum)

// console.log(curried(1)(2)(3))
// console.log(curried(1, 2)(3))
// console.log(curried(1, 2, 3))
/*
一、简单题
答案：JS异步编程是在JS主线程之外重新维护一个webAPI线程，执行比较耗时的操作；
  EventLoop就是一个事件循环；
  消息队列用于通知哪些异步任务执行完成了；
  宏任务——setTimeOut等；
  微任务——promise的then方法；
  一个EventLoop中，先执行同步代码，所有同步代码执行完成之后，在执行微任务回调，
    所有微任务执行完成之后再执行宏任务回调。
*/
// 代码题
// 一、改进代码
let p = function (x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, 10)
  })
}

let p1 = p('hello')
let p2 = p(' lagou')
let p3 = p(' I O U')

let f = async () => {
  let a = await p1
  let b = await p2
  let c = await p3
  console.log(a + b + c)
}

f()
// 二、基于代码完成练习
const fp = require('lodash/fp')
const cars = [
  {
    name: 'Ferrari FF1',
    horsePower: 661,
    dollar_value: 700001,
    in_stock: true
  },
  {
    name: 'Ferrari FF2',
    horsePower: 662,
    dollar_value: 700002,
    in_stock: false
  },
  {
    name: 'Ferrari FF3',
    horsePower: 663,
    dollar_value: 700003,
    in_stock: true
  },
  {
    name: 'Ferrari FF4',
    horsePower: 664,
    dollar_value: 700004,
    in_stock: false
  }
]

// 练习1
let prop = fp.prop('in_stock')
let f = fp.flowRight(prop, fp.last)
console.log(f(cars))

// 练习2
let name = fp.prop('name')
let f = fp.flowRight(name, fp.first)
console.log(f(cars))

// 练习3
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
let getDollar = arr => fp.map(car => car.dollar_value, arr)
let f = fp.flowRight(_average, getDollar)
console.log(f(cars))

// 练习4
let _underscore = fp.replace(/\W+/g, '_')
let name = fp.prop('name')
let f = fp.flowRight(_underscore, name)
cars.forEach(item => {
  console.log(f(item))
})

// 三、基于代码，完成练习
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  static of (x) {
    return new Maybe(x)
  }
  isNothing () {
    return this._value === null || this.value === undefined
  }
  constructor (x) {
    this._value = x
  }
  map (fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

module.exports = {
  Maybe,
  Container
}

// 练习1
const fp = require('lodash/fp')

let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
  maybe.map(fp.add, fp.map)
}
console.log(ex1())

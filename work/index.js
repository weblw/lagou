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
  maybe.map(fp.map(fp.add))
}
console.log(ex1())

// 练习2
const fp = require('lodash/fp')
const { MayBe, Container } = require('./support')

let xs = Container.of(['do', 'ray', 'so', 'la'])
let ex2 = () => {
  xs.map(fp.first)
}

// 练习3
const fp = require('lodash/fp')
const { MayBe, Container } = require('./support')

let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { is: 2, name: 'Albert' }
let ex3 = () => {
  safeProp('name').map(fp.first)
}

// 练习4
const fp = require('lodash/fp')
const { MayBe, Container } = require('./support')

let ex4 = function (n) {
  // if (n) {
  //   return parseInt(n)
  // }
  MayBe.of(parseInt(n))
}

const PENDING = 'pending' // 等待
const FULLFILLED = 'fullfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise {
  constructor (executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // promise 状态
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败之后的原因
  reason = undefined
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []

  resolve = value => {
    // 如果状态不是等待，组织程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULLFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在 如果存在 调用
    while (this.successCallback.length) this.successCallback.shift()()
  }

  reject = reason => {
    // 如果状态不是等待，组织程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason
    // 判断失败回调是否存在 存在 调用
    while (this.failCallback.length) this.failCallback.shift()()
  }

  then (successCallback, failCallback) {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback
      ? failCallback
      : reason => {
          throw reason
        }
    let promise = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULLFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // 将回调函数存起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.reason)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise
  }
  finally (callback) {
    return this.then(
      value => {
        return MyPromise.resolve(callback()).then(() => value)
      },
      reason => {
        return MyPromise.resolve(callback()).thn(() => {
          throw reason
        })
      }
    )
  }
  catch (failCallback) {
    return this.then(undefined, failCallback)
  }
  static all (array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        let currrent = array[i]
        if (currrent instanceof MyPromise) {
          currrent.then(
            value => addData(i, value),
            reason => reject(reason)
          )
        } else {
          addData(i, array[i])
        }
      }
    })
  }
  static resolve (value) {
    if (value instanceof MyPromise) value
    return new MyPromise(resolve => resolve(value))
  }
}

function resolvePromise (promise, x, resolve, reject) {
  if (promise === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise

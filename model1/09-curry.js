function checkAge(age) {
  let min = 18
  return age >= min
}

// 纯函数
function checkAgePure(min, age) {
  return age >= min
}

console.log(checkAgePure(18, 20))
console.log(checkAgePure(18, 24))
console.log(checkAgePure(22, 24))

// 函数柯里化
function checkAgeCurry(min) {
  return function (age) {
    return age >= min
  }
}

let checkAge18 = checkAgeCurry(18)
let checkAge20 = checkAgeCurry(20)

console.log(checkAge18(20))
console.log(checkAge18(24))
console.log(checkAge20(20))
console.log(checkAge20(24))

let checkAgeArrow = min => (age => age >= min)
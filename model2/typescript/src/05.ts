const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [4, 5]

function sum (...args: number[]) {
  // 判断每一个参数是不是数值类型
  return args.reduce((prev, current) => prev + current, 0)
}

sum(1, 2, 3)

const tuple: [number, string] = [10, 'foo']
const [age, name] = tuple

Object.entries({
  foo: 123
})

// const postStatus={

// }

const enum postStatus {
  draft = 1
}

function func (a: number, b: number): string {
  return 'func'
}

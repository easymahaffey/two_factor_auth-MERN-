// Number Validator
const luhnAlgorithm = str => {
    str = str.split('')
    let checkDigit = str.pop()
    let checkSum = str.map(dig => +dig)
        .map((dig, i) => i % 2 == 0 ? dig : dig * 2)
        .map(num => num.toString())
        .map(num => num.length > 1 ? num.split('') : num)
        .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
        .reduce((a, b) => a + b, 0)
    return (checkSum * 9) % 10 == checkDigit
}

// Number Generator
const createLuhnCode = length => {
    let code = []
    while(code.length < length) {
        code.push(Math.ceil(Math.random() * 9))
    }
    let checkDigit = code.map((dig, i) => i % 2 == 0 ? dig : dig * 2)
        .map(num => num.toString())
        .map(num => num.length > 1 ? num.split('') : num)
        .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
        .reduce((a, b) => a + b, 0) * 9 % 10
    code.push(checkDigit)
    return code.join('')
}

console.log(createLuhnCode(16))
console.log(luhnAlgorithm("473842626291928473234225686157678"))
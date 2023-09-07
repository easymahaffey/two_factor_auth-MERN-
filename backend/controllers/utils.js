module.exports = {
    getNumber: function (str) {
        if (typeof (str) === "string") {
            let formatted = str.split('').filter(num => {
                let regex = /[0-9]/
                if (regex.test(+num)) {
                    return num
                }
            }).join('')
            if (typeof (+formatted) === "number" && +formatted !== 0) {
                return +formatted
            } else {
                return undefined
            }
        } else if (typeof (str) === "number") {
            return str
        } else {
            return undefined
        }
    },
    createTwoFactor: function (length) {
      let code = []
      while (code.length < length) {
        code.push(Math.ceil(Math.random() * 9))
      }
      let checkDigit = code.map((dig, i) => i % 2 == 0 ? dig : dig * 2)
        .map(num => num.toString())
        .map(num => num.length > 1 ? num.split('') : num)
        .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
        .reduce((a, b) => a + b, 0) * 9 % 10
      code.push(checkDigit)
      let twoFactorToken = code.join('')
      return twoFactorToken
    }
}
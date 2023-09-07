const testTwoFactor = (str) => {
    str = str.split('')
    let checkDigit = str.pop()
    let checkSum = str.map(dig => +dig)
      .map((dig, i) => i % 2 == 0 ? dig : dig * 2)
      .map(num => num.toString())
      .map(num => num.length > 1 ? num.split('') : num)
      .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
      .reduce((a, b) => a + b, 0)
    let twoFactorTest = (checkSum * 9) % 10 == checkDigit
    return twoFactorTest
}

export const auth2Token = (loginToken) => {
  let info
  if (loginToken !== '') {
    let twoFactorTest = testTwoFactor(loginToken)
    if (twoFactorTest == false) {
      info = { test: false, message: "Invalid token, enter correct login token (client)." }
      return info;
    }
    if (twoFactorTest == true) {
      info = { test: true, message: "Valid token (client)." }
      return info;
    }
  } else {
    info = { test: false, message: "Enter a login token." }
    return info;
  }
}


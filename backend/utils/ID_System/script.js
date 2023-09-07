const generatorInput = document.getElementById('generator-input')
const generatorButton = document.getElementById('generator-btn')
const luhnGenerator = document.getElementById('luhn-generator')
const inputListText = document.getElementById('userListInput')
const addBtn = document.getElementById('addBtn')
const list = document.getElementById('list')
const resultOne = document.getElementById('resultOne')

// Number Generator
// const createLuhnCode = inputLength => {
//   let code = []
//   ///// Playing w/crypto.getRandomValues() /////
//   let feed = 1
//   inputLength > 10 && inputLength <= 20 ? feed = 2 :
//     inputLength > 20 && inputLength <= 30 ? feed = 3 :
//       inputLength > 30 && inputLength <= 40 ? feed = 4 : 0
//   let subSeed
//   let seed = new Uint32Array(feed);
//   // let seedArray = crypto.getRandomValues(seed).toString()
//   let seedArray = crypto.getRandomValues(seed).join("").split("")
//   console.log("seedArray I ", seedArray)
//   // console.log("seedArray Length II ", seedArray[0].toString().split(""))
//   subSeed = seedArray.slice(0, inputLength)
//   console.log("SubSeed ", parseInt(subSeed))
//   // if (inputLength <= seedArray.length) {
//   // }
//   // if (inputLength > seedArray.length) {

//   //   subSeed = seedArray.slice(0, inputLength)
//   //   console.log("Large SubSeed ", subSeed)
//   // }
//   console.log("Luhn Seed ", crypto.getRandomValues(seed))
//   // let count = 0
//   // while (code.length < inputLength) {
//   //   code.push(subSeed[count])
//   //   count++
//   // }
//   console.log(Math.random())
//   console.log(code)
//   let checkDigit = seedArray.map((dig, i) => i % 2 == 0 ? dig : dig * 2)
//   .map(num => num.toString())
//   .map(num => num.length > 1 ? num.split('') : num)
//   .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
//   .reduce((a, b) => a + b, 0) * 9 % 10
//   code.push(checkDigit)
//   console.log("Last Code ", code.join(''))
//   return code.join('')
// }
// ///// End of crypto.getRandomValues() ////

const createLuhnCode = length => {
  let code = []
  while (code.length < length) {
    code.push(Math.ceil(Math.random() * 9))
  }
  // console.log(Math.random())
  // console.log(code)
  let checkDigit = code.map((dig, i) => i % 2 == 0 ? dig : dig * 2)
    .map(num => num.toString())
    .map(num => num.length > 1 ? num.split('') : num)
    .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
    .reduce((a, b) => a + b, 0) * 9 % 10
  code.push(checkDigit)
  return code.join('')
}

function generateLuhnNumber() {
  luhnGenerator.innerHTML = (createLuhnCode(generatorInput.value))
}

const testLuhnAlgorithm = str => {
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

form.addEventListener("submit", (event) => {
  event.preventDefault()
  let submitter = event.submitter;
  let handler = submitter.id;
  console.log(submitter.id)

  let checkNumberOne = event.target[0].value.trim()
  console.log(checkNumberOne)

  if (handler == "submitBtnOne" && checkNumberOne == "") {
    alert('You need to add a test number for the first validator.')
    resetInput()
    return
  } else if (handler == "submitBtnOne" && checkNumberOne !== "" && testLuhnAlgorithm(checkNumberOne)) {
    console.log("TEST1", checkNumberOne)
    console.log("Test1 result", testLuhnAlgorithm(checkNumberOne))
    setSuccessTextOne()
  } else {
    console.log("TEST1 Fail", checkNumberOne)
    setFailureTextOne()
  }

});

function setSuccessTextOne() {
  testResultOne.innerText = "valid."
}

function setFailureTextOne() {
  testResultOne.innerText = "not valid."
}

const testInput = 473842626291928473234225686157678
console.log(testLuhnAlgorithm("473842626291928473234225686157678"))
console.log(testLuhnAlgorithm(testInput.toFixed()))
console.log("Generator input", generatorInput.value)
console.log("Generator output", createLuhnCode(generatorInput))

function addToList() {
  let userResponse = inputListText.value
  let formattedResponse = userResponse.trim()

  if (formattedResponse === "") {
    alert('You need to add a test number for the test list.')
    resetInput()
    return
  }

  const newListItem = document.createElement('li')
  const listItemText = document.createElement('span')
  const removeBtn = document.createElement('button')

  removeBtn.innerText = "Remove Number"
  removeBtn.addEventListener('click', removeFromList)
  listItemText.innerText = formattedResponse

  newListItem.append(listItemText)
  newListItem.append(removeBtn)
  list.append(newListItem)

  resetInput()
}

function resetInput() {
  inputListText.value = ''
}

function addToListKeyboard(event) {
  if (event.key == "Enter") {
    console.log(inputListText.value)
    addToList()
  }
}

function addToListClick() {
  addToList()
}

function removeFromList() {
  this.parentNode.remove(this)
}

generatorButton.addEventListener('click', generateLuhnNumber)
addBtn.addEventListener('click', addToListClick)
inputListText.addEventListener('keypress', addToListKeyboard)

genRandomNumbers = function getRandomNumbers() {
  const array = new Uint32Array(6);
  console.log("Test Array ", array)
  window.crypto.getRandomValues(array);
  const randText = document.getElementById("myRandText");
  randText.textContent = "The random numbers are: "
  for (let i = 0; i < array.length; i++) {
    randText.textContent += array[i] + " ";
  }
}()

testRandom = function testRandom(num) {
  let seed = []
  let newNumber = Math.ceil(Math.random() * 9)
  for (let i = 0; i < num; i++) {
    newNumber =
      // seed += newNumber ;
      // seed.push(Math.ceil(Math.random() * 9));
      seed.push(newNumber);

  }
  let newSeed = seed.join("")
  console.log("Seed ", parseInt(newSeed))
  return parseInt(newSeed)
}

console.log("Test Random ", testRandom(6))
console.log(window.crypto.getRandomValues(new Uint32Array(4)))
console.log(window.crypto.getRandomValues(new Uint32Array(1)))
// console.log(window.crypto.testRandom(6))

const testArray = new Uint32Array(10);
self.crypto.getRandomValues(testArray);

console.log("Your lucky numbers:");
for (const num of testArray) {
  console.log(num);
}

let keyPair = window.crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
  },
  true,
  ["encrypt", "decrypt"]
);
console.log("RSA Key pair ", keyPair)
console.log("RSA Key pair ", keyPair.publicKey)

// console.log("Crypto Key Gen I ", generateKey(algorithm, extractable, keyUsages))
// console.log("Crypto Key Gen II ", crypto.generateKey(keyPair, true, encrypt))
// console.log("Crypto Key Gen III ", generateKey(keyPair, true, decrypt))
const generatorInput = document.getElementById('generator-input')
const generatorButton = document.getElementById('generator-btn')
const luhnGenerator = document.getElementById('luhn-generator')

const generatorInput2 = document.getElementById('generator-input-2')
const generatorButton2 = document.getElementById('generator-btn-2')
const luhnGenerator2 = document.getElementById('luhn-generator-2')
// const luhnTestResultOne = document.getElementById('testResultOne')
const inputListText = document.getElementById('userListInput')
const addBtn = document.getElementById('addBtn')
const list = document.getElementById('list')

const resultOne = document.getElementById('resultOne')
const resultTwo = document.getElementById('resultTwo')

// Number Generator
const createLuhnCode = length => {
    let code = []
    while(code.length < length) {
        code.push(Math.ceil(Math.random() * 9))
    }
    console.log(Math.random())
    console.log(code)
    let checkDigit = code.map((dig, i) => i % 2 == 0 ? dig : dig * 2)
        .map(num => num.toString())
        .map(num => num.length > 1 ? num.split('') : num)
        .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
        .reduce((a, b) => a + b, 0) * 9 % 10
    code.push(checkDigit)
    return code.join('')
}

function generateLuhnNumber(){
    luhnGenerator.innerHTML = (createLuhnCode(generatorInput.value-1))
}


// indexOf alternative
const AlphanumericArray = [
    {
    "0": "00",
    "1": "01",
    "2": "02",
    "3": "03",
    "4": "04",
    "5": "05",
    "6": "06",
    "7": "07",
    "8": "08",
    "9": "09",
    "a": "10",
    "b": "11",
    "c": "12",
    "d": "13",
    "e": "14"
    }
]


//  Intermediate Algorithm Scripting: Sorted Union
function uniteUnique(collection) {
    let finalCollection = []
    let values = Object.values(arguments)
  //  console.log(Object.values(arguments))
    for (let i=0; i<values.length; i++) {
      console.log(values[i]);
      for (let j = 0; j<values[i].length; j++)
        if (finalCollection.indexOf(values[i][j]) === -1) {
          finalCollection.push(values[i][j])
        }
    }
    return finalCollection;
  }
  
  let result = uniteUnique([1, 3, 2], [5, 21, 11, 41], [2, 1]);
  console.log(result);
  
// const AlphanumericArray1 = [0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]
// length 26+26+10=62

const AlphanumericArray1 = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d']
let id = "1234abcd5678ABCD"
let id1 = "abcd"

function groupAlpaNumericSet (idNumber) {
    let groupedSet = []
    let idNumberValues = Object.values(arguments)
    console.log(idNumberValues)
    for (let i = 0; i<idNumber.length; i++) {
        console.log(idNumber.indexOf(i))
        idNumberValues.push[i]
        // console.log(groupedSet)
    }
    return groupedSet
}

groupAlpaNumericSet(AlphanumericArray1, id1)

console.log(AlphanumericArray1.length)
//  [efghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]
for (let i = 0; i<AlphanumericArray1.length; i++) {
    console.log(AlphanumericArray1.indexOf(i))
}




// Alphanumeric Luhn Number Generator
const createLuhnCode2 = length => {
    let code = []
    while(code.length < length) {
        code.push(Math.ceil(window.crypto.getRandomValues(new Uint32Array(1)) * 9))
    }
    console.log(code.toString().split(''))
    console.log(Math.ceil(1/ (window.crypto.getRandomValues(new Uint32Array(1))) * 9))
    let checkDigit = code.map((dig, i) => i % 2 == 0 ? dig : dig * 2)
        .map(num => num.toString())
        .map(num => num.length > 1 ? num.split('') : num)
        .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
        .reduce((a, b) => a + b, 0) * 9 % 10
    code.push(checkDigit)
    return code.join('')
}

function generateLuhnNumber2(){
    luhnGenerator2.innerHTML = (createLuhnCode2(generatorInput2.value-1))
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

// function testLuhnNumber(){
//     console.log('Line 44', (testLuhnAlgorithm(luhnTestInputOne)))
//     luhnTestResultOne.innerHTML = (testLuhnAlgorithm(luhnTestInputOne))
// }

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let submitter = event.submitter;
    let handler = submitter.id;
    console.log(submitter.id)

    let checkNumberOne = event.target[0].value.trim()
    console.log(checkNumberOne)
    let checkNumberTwo = event.target[3].value.trim()

    if (handler == "submitBtnOne" && checkNumberOne == "" ) {
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
    
    if (handler == "submitBtnTwo" && checkNumberTwo == "") {
        alert('You need to add a test number for the second validator.')
        resetInput()
        return
    } else if (handler == "submitBtnTwo" && checkNumberTwo !== "") {
        console.log("TEST2", checkNumberTwo)
        telephoneCheckTwo(checkNumberTwo)
    } else {
        console.log("TEST2 Fail", checkNumberTwo)
    }
  });

function setSuccessTextOne(){
    testResultOne.innerText = "valid."
}

function setFailureTextOne(){
    testResultOne.innerText = "not valid."
}



// Number Validator
// const testLuhnAlgorithm = str => {
// str = str.split('')
// let checkDigit = str.pop()
// let checkSum = str.map(dig => +dig)
//     .map((dig, i) => i % 2 == 0 ? dig : dig * 2)
//     .map(num => num.toString())
//     .map(num => num.length > 1 ? num.split('') : num)
//     .map(num => num.length > 1 ? num.reduce((a, b) => +a + +b, 0) : +num)
//     .reduce((a, b) => a + b, 0)
// return (checkSum * 9) % 10 == checkDigit
// }
const testInput = 473842626291928473234225686157678
console.log(testLuhnAlgorithm("473842626291928473234225686157678"))
console.log(testLuhnAlgorithm(testInput.toFixed()))
// console.log(luhnTestInputOne)
// console.log(testLuhnAlgorithm(luhnTestInputOne.toFixed()))


function telephoneCheckOne(str) {
    const validPatterns = [
      /^\d{3}-\d{3}-\d{4}$/,
      /^1 \d{3}-\d{3}-\d{4}$/,
      /^1 \(\d{3}\) \d{3}-\d{4}$/,
      /^\d{10}$/,
      /^\(\d{3}\)\d{3}-\d{4}$/,
      /^1 \d{3} \d{3} \d{4}$/,
      /^1\(\d{3}\)\d{3}-\d{4}$/,
    ]

    if(validPatterns
      .some((pattern) => pattern.test(str))) {
        console.log(validPatterns
            .some((pattern) => pattern.test(str)))
        setSuccessTextOne()
        return true;
      } else {
        console.log(validPatterns
            .some((pattern) => pattern.test(str)))
        setFailureTextOne()
        return false;
      }
}

// const testInput = 473842626291928473234225686157678
console.log("Generator hello script")
console.log("Generator input", generatorInput.value)
console.log("Generator output",createLuhnCode(generatorInput))
// console.logtestLluhnAlgorithm("473842626291928473234225686157678"))
// console.logtestLluhnAlgorithm(testInput.toFixed()))

// function setSuccessTextOne(){
//     resultOne.innerText = "valid."
//     booleanOne.innerText = "true."
// }

// function setFailureTextOne(){
//     resultOne.innerText = "not valid."
//     booleanOne.innerText = "false."
// }

function telephoneCheckTwo(str) {
const regex = /^1? ?(( ?\d{3}[- ]*)|(\( ?\d{3}[- ]*\) *))\d{3}[- ]?\d{4}$/;

if(regex.test(str)  == true) {
    console.log(regex.test(str))
    setSuccessTextTwo()
    return true;
    } else {
    console.log(regex.test(str))
    setFailureTextTwo()
    return false;
    }
}

function setSuccessTextTwo(){
    resultTwo.innerText = "valid."
    booleanTwo.innerText = "true."
}

function setFailureTextTwo(){
    resultTwo.innerText = "not valid."
    booleanTwo.innerText = "false."
}

// const addBtn = document.getElementById('addBtn')
// const list = document.getElementById('list')
// const inputListText = document.getElementById('userInput')

function addToList(){
    let userResponse = inputListText.value
    let formattedResponse = userResponse.trim()

    if(formattedResponse ===  ""){
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

function addToListKeyboard(event){
    if(event.key == "Enter"){
        console.log(inputListText.value)
        addToList()
    }
}

function addToListClick(){
    addToList()
}

function removeFromList(){
    this.parentNode.remove(this)
}

generatorButton.addEventListener('click', generateLuhnNumber)
generatorButton2.addEventListener('click', generateLuhnNumber2)

addBtn.addEventListener('click', addToListClick)
inputListText.addEventListener('keypress', addToListKeyboard)



genRandomNumbers = function getRandomNumbers() {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    
    const randText = document.getElementById("myRandText");
    randText.textContent = "The random numbers are: "
    for (let i = 0; i < array.length; i++) {
      randText.textContent += array[i] + " ";
    }
  }
console.log(window.crypto.getRandomValues(new Uint32Array(4)))
console.log(window.crypto.getRandomValues(new Uint32Array(1)))
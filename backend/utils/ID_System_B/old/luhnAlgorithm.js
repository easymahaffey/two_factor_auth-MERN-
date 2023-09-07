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


console.log('hello')


const generatorInput = document.getElementById('generator-input')
const generatorButton = document.getElementById('generator-btn')
const addBtn = document.getElementById('addBtn')
const list = document.getElementById('list')
const inputText = document.getElementById('userInput')
const luhnGenerator = document.getElementById('luhn-generator')
// const testInput = document.getElementById('test-input')
const testInput = 473842626291928473234225686157678

console.log(generatorInput.value)
console.log(createLuhnCode(generatorInput))
// console.log(luhnAlgorithm("473842626291928473234225686157678"))
console.log(luhnAlgorithm(testInput.toFixed()))

function testLuhnNumber(){

}

function generateLuhnNumber(){
    luhnGenerator.innerHTML = (createLuhnCode(generatorInput.value-1))
}


function addToList(){
    // let userResponse = prompt("What would you like to do?")
    let userResponse = inputText.value
    
    let formattedResponse = userResponse.trim()

    // check if propmt was empty
    if(formattedResponse ===  ""){
        alert('You need to add a Luhn number.')
        // inputText.value = ''
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
    inputText.value = ''
}

function addToListKeyboard(event){
    if(event.key == "Enter"){
        console.log(inputText.value)
        addToList()
    }
}

function addToListClick(){
    addToList()
}

function removeFromList(){
    this.parentNode.remove(this)
}

addBtn.addEventListener('click', addToListClick)
inputText.addEventListener('keypress', addToListKeyboard)
generatorButton.addEventListener('click', generateLuhnNumber)

genRandomNumbers = function getRandomNumbers() {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    
  
    const randText = document.getElementById("myRandText");
    randText.textContent = "The random numbers are: "
    for (let i = 0; i < array.length; i++) {
      randText.textContent += array[i] + " ";
    }
  }
  console.log(window.crypto.getRandomValues)
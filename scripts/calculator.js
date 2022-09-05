var firstNumber = 0;

var secondNumber = 0;

var operator = "";

var operatorButtons = document.getElementsByClassName("operator-btn");

var isMutipleOperation = false;

var result = 0;

function getDisplayValue(x) {
  let results = document.getElementById("resultScreen");
  if (results.innerText == "0" ||(firstNumber == null && secondNumber == null && operator == "")) {
    if (x == ",") {
      document.getElementById("resultScreen").innerText = "0,";
      firstNumber = "0,";
    } else if (operator == "") {
      results.innerText = "";
      results.innerText += x;
      firstNumber = x;
    }
  } else if (results.innerText.length <= 9 ||(results.innerText.length == 10 && results.innerText.includes(","))) {
    if (checkComa() === false) {
      document.getElementById("resultScreen").innerText += x;
    } else if (checkComa() === true && x != ",") {
      document.getElementById("comma").classList.add("disabled-comma-btn");
      document.getElementById("comma").disabled = true;
      document.getElementById("resultScreen").innerText += x;
    }
  }
  checkLength();
  if (operator != "" || isMutipleOperation == true) {
    secondNumber = updateDisplay(x, secondNumber);
  }
}

function deshabilitingTwoFirstNumbers () {
  let zeroNumber = document.getElementById("zero");
  let changePlusMinusButton = document.getElementById("plus-minus");
  zeroNumber.classList.add("disabled-numeric-btn");
  zeroNumber.disabled = true;
  changePlusMinusButton.classList.add("disabled-operator-btn");
  changePlusMinusButton.disabled = true;
}

function enhalingTwoFirstNumbers () {
  let zeroNumber = document.getElementById("zero");
  let changePlusMinusButton = document.getElementById("plus-minus");
  zeroNumber.classList.remove("disabled-numeric-btn");
  zeroNumber.disabled = false;
  changePlusMinusButton.classList.remove("disabled-operator-btn")
  changePlusMinusButton.disabled = false;
}

function updateDisplay(value, number) {
  if (number == "0") {
    unhighlightNumericButtons();
    document.getElementById("comma").classList.remove("disabled-comma-btn");
    if (value == ",") {
      document.getElementById("resultScreen").innerText = "0,";
      document.getElementById("comma").classList.add("disabled-comma-btn");
      document.getElementById("comma").disabled = true;
    } else {
      document.getElementById("resultScreen").innerText = "";
      document.getElementById("resultScreen").innerText += value;
    }
    number += value;
  }
  return number;
}

function clearInput(y) {
  document.getElementById("resultScreen").innerText = y;
  firstNumber = 0;
  secondNumber = 0;
  thirdNumber = 0;
  result = 0;
  operator = "";
  isNegative = false;
  isMutipleOperation = false;
  unhighlightAll();
}

function setPositiveOrNegative() {
  let display = document.getElementById("resultScreen");
  if (display.innerText.includes('-') == false && checkZero(display) == true) {
    console.log(checkZero(display));
    console.log(display.innerText);
    isNegative = true;
    display.innerText = '-' + display.innerText;
  } else if (display.innerText.includes('-') == true && checkZero(display) == true) {
    display.innerText = display.innerText.substring(display.innerText.length,1);
    isNegative = false;
  }

}

function checkZero (display) {
  if (display.innerText == "0,") {
    return false;
  } else if (display.innerText != 0){
    return true;
  }
}

function disableButtons() {
  let numericalButtons = document.getElementsByClassName("numbers-btn");
  for (let i = 0; i < numericalButtons.length; i++) {
    numericalButtons[i].classList.add("disabled-numeric-btn");
    numericalButtons[i].disabled = true;
  }
  
}

function disableOperatorButtons() {
  let operatorButtons = document.getElementsByClassName("operator-btn");
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].classList.add("disabled-operator-btn");
    operatorButtons[i].disabled = true;
  }
}

function checkLength() {
  let result = document.getElementById("resultScreen");
  if (
    (result.innerText.length == 10 && result.innerText.includes(",") == false && result.innerText.includes("-") == false) ||
    (result.innerText.length == 11 && result.innerText.includes(",") == false && result.innerText.includes("-") == true) ||
    (result.innerText.length == 11 && result.innerText.includes(",") == true && result.innerText.includes("-") == false) ||
    (result.innerText.length == 12 && result.innerText.includes(",") == true && result.innerText.includes("-") == true)) {
    document.getElementById("comma").classList.add("disabled-comma-btn");
    document.getElementById("comma").disabled = true;
    disableButtons()
  }
}

function checkDecimalLength(result) {
  if (result.toString().length == 11 && result.toString().includes(',') ){
    return result
  } else if (result.toString().length > 11 && result.toString().includes(',')) {
    return cuttingDecimals(result)
  } 
}

function cuttingDecimals(resultToCut) {
  let maxLength = 10

  let cutedResult = resultToCut

  while (Math.abs(cutedResult.toString().length > 11)) {
    cutedResult = resultToCut.toFixed(maxLength);
    maxLength --;
  }
  
  let finalResult = cutedResult

  for (let i = cutedResult.length; i >= 0; i--) {
    if (cutedResult[i] == 0) {
      finalResult = finalResult.slice(0,finalResult.length-1)
    }
    if (cutedResult[i] == '.') {
      break;
    }
  }
  return changeDotToComma(finalResult);
}

function checkComa() {
  if (document.getElementById("resultScreen").innerText.indexOf(",") > -1) {
    return true;
  } else {
    return false;
  }
}

function clickHighlight(button) {
  button.classList.add("disabled-operator-btn");
}

function setOperators(value) {
  if (operator == "") {
    firstNumber = document.getElementById("resultScreen").innerText;
    operator = value;
  } else if (secondNumber != 0 || (secondNumber == 0 && (operator == '/' || operator == '*'))) {
    firstNumber = calculate(operator);
	  isMutipleOperation = true;
    secondNumber = 0;
    operator = value;
  } else {
    for (var i = 0; i < operatorButtons.length; i++) {
      if (operatorButtons[i].value == operator) {
        unhighlightOperator(operatorButtons[i].id);
      }
    }
    operator = value;
  }
}

function getKeyNumbers() {
  document.addEventListener("keydown", function (event) {
    event.preventDefault();
    let currentDisplay = document.getElementById("resultScreen").innerText;
    if (event.key >= 0 && event.key <= 9 && currentDisplay != 'Error') {
      getDisplayValue(event.key);
    } else if (event.key == "+" && currentDisplay != 'Error') {
      setOperators(event.key);
      setHiglightOperator("plus");
    } else if (event.key == "-" && currentDisplay != 'Error') {
      setOperators(event.key);
      setHiglightOperator("minus");
    } else if (event.key == "*" && currentDisplay != 'Error') {
      setOperators(event.key);
      setHiglightOperator("by");
    } else if (event.key == "/" && currentDisplay != 'Error') {
      setOperators(event.key);
      setHiglightOperator("divide");
    }

    if (event.key == "Enter") {
      unhighlightAll();
      calculate("=");
      errorDisplayed();
    } else if (event.key === "Escape") {
      document.getElementById("clear-button").click();
    } else if (event.key === ",") {
      getDisplayValue(event.key);
    }
    if (event.key === "Control" && currentDisplay != 'Error') {
      setHiglightOperator("plus-minus");
      if (operator != '' ){
        isNegative = false;
        setPositiveOrNegative();
      } else {
        setPositiveOrNegative();
      }
    }
  });
}

function calculate(key) {
  if (secondNumber == null || firstNumber == null) {
    document.getElementById("resultScreen").innerText = "Error";
    errorDisplayed();
  } else if (operator == "+") {
    result = addOperation();
  } else if (operator == "-") {
    result = minusOperation();
  } else if (operator == "*") {
    result = multiplyOperation();
  }  else if (operator == "/") {
    result = divideOperation();
  }
if (result.toString().length > 11 && result.toString().includes('.')) {
  document.getElementById("resultScreen").innerText = cuttingDecimals(result);
} else if (result.toString().length > 10) {
  document.getElementById("resultScreen").innerText = "Error";
} 
else {
  checkLength();
}
  /*if (result.toString().length > 10 && result.toString().includes(',') == true) {
    console.log('hola')
    document.getElementById("resultScreen").innerText = "Error";
  	} else if (result.toString().length > 10 && result.toString().includes(',')) {
      document.getElementById("resultScreen").innerText = checkDecimalLength(result)
    }
	setMultiOperations(key);*/
	return result;
} 

function setMultiOperations (key) {
	if (key == '=') {
		isMutipleOperation = false;
		firstNumber = 0;
    secondNumber = 0;
    operator = "";
	} else {
		isMutipleOperation = true;
	}
}

function changeDotToComma(result) {
 return result.toString().replace(".", ",");
}

function errorDisplayed() {
  if (document.getElementById("resultScreen").innerText == "Error") {
    disableButtons();
    disableOperatorButtons();
    document.getElementById("clear-button").classList.remove("disabled-operator-btn");
    document.getElementById("clear-button").disabled = false;
  }
}
 
function addOperation() {
  secondNumber = document.getElementById("resultScreen").innerText;
  if (firstNumber.toString().includes(",") || secondNumber.toString().includes(",")) {
    changeCommaToDot ();
  } 
  result = parseFloat(firstNumber) + parseFloat(secondNumber);
  document.getElementById("resultScreen").innerText = changeDotToComma(result);
  return result
}

function minusOperation() {
  secondNumber = document.getElementById("resultScreen").innerText;
  if (firstNumber.toString().includes(",") || secondNumber.toString().includes(",")) {
    changeCommaToDot ();
  } 
  result = parseFloat(firstNumber) - parseFloat(secondNumber);
  document.getElementById("resultScreen").innerText = changeDotToComma(result);
  return result
  
}

function multiplyOperation() {
  secondNumber = document.getElementById("resultScreen").innerText;
  if (firstNumber.toString().includes(",") || secondNumber.toString().includes(",")) {
    changeCommaToDot ();
  } 
 result = parseFloat(firstNumber) * parseFloat(secondNumber);
 document.getElementById("resultScreen").innerText = changeDotToComma(result);
 return result
}

function divideOperation() {
  secondNumber = document.getElementById("resultScreen").innerText;
  if (firstNumber.toString().includes(",") || secondNumber.toString().includes(",")) {
    changeCommaToDot ();
  } 
  if (secondNumber == "0" && operator == "/") {
    document.getElementById("resultScreen").innerText = "Error";
    errorDisplayed();
    result = 0;
	} else {
    result = parseFloat(firstNumber) / parseFloat(secondNumber);
    document.getElementById("resultScreen").innerText = changeDotToComma(result);
  }
  return result
}


function changeCommaToDot () {
	firstNumber = firstNumber.toString().replace(",", ".");
  secondNumber = secondNumber.toString().replace(",", ".");
}

function setHiglightOperator (id) {
  document.getElementById(id).classList.add("disabled-operator-btn");
  document.getElementById(id).disabled = true;
  unhighlightNumericButtons();
}

function unhighlightOperator(id) {
  document.getElementById(id).classList.remove("disabled-operator-btn");
  document.getElementById(id).disabled = false;
}

function unhighlightNumericButtons() {
  let numericalButtons = document.getElementsByClassName("numbers-btn");
  for (let i = 0; i < numericalButtons.length; i++) {
    numericalButtons[i].classList.remove("disabled-numeric-btn");
    numericalButtons[i].disabled = false;
  }
}

function unhighlightAll() {
  let operatorButtons = document.getElementsByClassName("operator-btn");
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].classList.remove("disabled-operator-btn");
    operatorButtons[i].disabled = false;
  }
  let numericalButtons = document.getElementsByClassName("numbers-btn");
  for (let i = 0; i < numericalButtons.length; i++) {
    numericalButtons[i].classList.remove("disabled-numeric-btn");
    numericalButtons[i].disabled = false;
  }
  document.getElementById("comma").classList.remove("disabled-comma-btn");
  document.getElementById("comma").disabled = false;
}

getKeyNumbers();


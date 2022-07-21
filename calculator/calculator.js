var firstPart = 0;

var secondPart = 0;

var thirdPart = 0;

var operator = '';

var result = 0;

function takeValue(x) {
let results = document.getElementById('resultScreen');
if (results.innerText == '0') {
	if (x == ',') {
		document.getElementById('resultScreen').innerText = '0,';
	} else {
		results.innerText = '';
		results.innerText += x;
	}
} else if (results.innerText.length <= 9 || (results.innerText.length == 10 && results.innerText.includes(','))) {
	if (checkComa() === false) {
		document.getElementById('resultScreen').innerText += x;
		} else if (checkComa() === true && x != ',') {
			document.getElementById("comma").classList.add('disabled-comma-btn');
			document.getElementById('resultScreen').innerText += x;
			}
	}
	checkLength();

	if (operator != '') {
		if (secondPart == '0') {
			unhighlightNumericButtons();
			document.getElementById("comma").classList.remove('disabled-comma-btn');
			if (x == ',') {
				document.getElementById('resultScreen').innerText = '0,';
				document.getElementById("comma").classList.add('disabled-comma-btn')
			} else {
				document.getElementById('resultScreen').innerText = '';
				document.getElementById('resultScreen').innerText = x;
			}
			secondPart += x
		}
	} else if (result != 0) {
		getThirdValue(x)
	}
	
}

function getThirdValue(value) {
	if (operator != '') {
		if (thirdPart == '0') {
			unhighlightNumericButtons();
			document.getElementById("comma").classList.remove('disabled-comma-btn');
			if (value == ',') {
				document.getElementById('resultScreen').innerText = '0,';
				document.getElementById("comma").classList.add('disabled-comma-btn')
			} else {
				document.getElementById('resultScreen').innerText = '';
				document.getElementById('resultScreen').innerText = value;
			}
			thirdPart += value
		}
	}
}

function clearInput(y) {
	document.getElementById('resultScreen').innerText = y;
	firstPart = 0;
	secondPart = 0;
	thirdPart = 0;
	result = 0;
	operator = '';
	unhighlightAll();
}

function changeSumMin () {
	let results = document.getElementById('resultScreen');
	if (results.innerText.includes(',')) {
	let replacementComma = results.innerText.replace(',', '.');
	replacementComma *= -1;
	let replacementDot = replacementComma.toString().replace('.',',');
	document.getElementById('resultScreen').innerText = replacementDot;
	} else {
		results.innerText *= -1;
	}
}

function disableButtons () {
	let numericalButtons = document.getElementsByClassName('numbers-btn');
	for (let i=0; i<numericalButtons.length; i++) {
		numericalButtons[i].classList.add('disabled-numeric-btn');
	}

}

function disableOperatorButtons () {
	let operatorButtons = document.getElementsByClassName('operator-btn');
for (let i=0; i<operatorButtons.length; i++) {
	operatorButtons[i].classList.add('disabled-operator-btn');
}
}

function checkLength () {
	let result = document.getElementById('resultScreen');

	if ((result.innerText.length == 10 && result.innerText.includes(',') == false && result.innerText.includes('-') == false) 
	|| (result.innerText.length == 11 && result.innerText.includes(',') == false && result.innerText.includes('-') == true)
	|| (result.innerText.length == 11 && result.innerText.includes(',') == true && result.innerText.includes('-') == false)
	|| (result.innerText.length == 12 && result.innerText.includes(',') == true && result.innerText.includes('-') == true)) {
		document.getElementById("comma").classList.add('disabled-comma-btn');
		disableButtons();
	}
}

function checkComa (x) {
	if (document.getElementById('resultScreen').innerText.indexOf(',') > -1) {
		return true;
	} else {
		return false;
	}
}


function clickHighlight(button) {
	button.classList.add('disabled-operator-btn');
}

function operators (value) {
	if (value == '+') {
		firstPart = (document.getElementById('resultScreen').innerText);
		operator = '+';
	} else if (value == '-') {
		firstPart = (document.getElementById('resultScreen').innerText);
		operator = '-';
	} else if (value == '*') {
		firstPart = (document.getElementById('resultScreen').innerText);
		operator = '*';
	} else if (value == '/') {
		firstPart = (document.getElementById('resultScreen').innerText);
		operator = '/';
	}
}

function keyNumbers (){
document.addEventListener('keydown', function(event) {
	event.preventDefault();
	if (event.key >= 0 && event.key <= 9){
	takeValue(event.key);
	} else if (event.key == '+') {
		operators (event.key);
	} else if (event.key == '-') {
		operators (event.key);
	} else if (event.key == '*') {
		operators (event.key);
	} else if (event.key == '/') {
		operators (event.key);
	}
	if (event.key == 'Enter') {
		unhighlightAll();
		calculate();
		errorDisplayed ();
	} else if (event.key === 'Escape') {
		document.getElementById('clear-button').click();
	} else if (event.key === ',') {
		takeValue(event.key);
	}
	if (event.key === 'Control') {
		changeSumMin();
	}
	if (event.key >= 0 && event.key <= 9 && result !='') {
		getThirdValue(event.key);
	}
		})
}

function calculate() {
	console.log(operator);
	secondPart = document.getElementById('resultScreen').innerText;
	if (operator == '+' && ((firstPart.includes(',')) || (secondPart.includes(',')))){
		addOperation ();
	} else if (operator == '+'){
		result = parseFloat(firstPart) + parseFloat(secondPart);
		document.getElementById('resultScreen').innerText = result;
		console.log(result);
	} else if (operator == '-' && ((firstPart.includes(',')) || (secondPart.includes(',')))){
		minusOperation ();
	} else if (operator == '-') {
		result = parseFloat(firstPart) - parseFloat(secondPart);
		document.getElementById('resultScreen').innerText = result;
	} else if (operator == '*' && ((firstPart.includes(',')) || (secondPart.includes(',')))) {
		multiplyOperation ();
	} else if (operator == '*') {
		result = parseFloat(firstPart) * parseFloat(secondPart);
		document.getElementById('resultScreen').innerText = result;
	} else if (operator == '/' && ((firstPart.includes(',')) || (secondPart.includes(',')))) {
		divideOperation ();
	} else if (operator == '/'){
		result = parseFloat(firstPart) / parseFloat(secondPart);
		document.getElementById('resultScreen').innerText = result;
	}
	if ((secondPart == '0' && operator == '/')) {
		document.getElementById('resultScreen').innerText = 'Error';
	} 
	
	if (result.toString().length > 10) {
		document.getElementById('resultScreen').innerText = 'Error';
	}
}

function errorDisplayed () {
	if (document.getElementById('resultScreen').innerText == 'Error') {
		disableButtons();
		disableOperatorButtons();
		document.getElementById('clear-button').classList.remove('disabled-operator-btn');
	}
}

function addOperation () {
	firstPart = firstPart.toString().replace(',','.');
	secondPart = secondPart.toString().replace(',','.');
	result = (Math.floor((parseFloat(firstPart) + parseFloat(secondPart))*1000))/1000; //This code allow us to do mathematical operations with rounded numbers
	result = result.toString().replace('.',',');
	if (result.toString().length > 10) {
		document.getElementById('resultScreen').innerText = 'Error';
	} else {
		document.getElementById('resultScreen').innerText = result;
	}
}

function minusOperation () {
	firstPart = firstPart.toString().replace(',','.');
	secondPart = secondPart.toString().replace(',','.');
	result = (Math.floor((parseFloat(firstPart) - parseFloat(secondPart))*1000))/1000;
	result = result.toString().replace('.',',');
	if (result.toString().length > 10) {
		document.getElementById('resultScreen').innerText = 'Error';
	} else {
		document.getElementById('resultScreen').innerText = result;
	}
}

function multiplyOperation () {
	firstPart = firstPart.toString().replace(',','.');
	secondPart = secondPart.toString().replace(',','.');
	result = (Math.floor((parseFloat(firstPart) * parseFloat(secondPart))*1000))/1000;
	result = result.toString().replace('.',',');
	if (result.toString().length > 10) {
		document.getElementById('resultScreen').innerText = 'Error';
	} else {
		document.getElementById('resultScreen').innerText = result;
	}
}

function divideOperation () {
	firstPart = firstPart.toString().replace(',','.');
	secondPart = secondPart.toString().replace(',','.');
	result = (Math.floor((parseFloat(firstPart) / parseFloat(secondPart))*1000))/1000;
	result = result.toString().replace('.',',');
	if (result.toString().length > 10) {
		document.getElementById('resultScreen').innerText = 'Error';
	} else {
		document.getElementById('resultScreen').innerText = result;
	}
}

function keyHighlight () {
	document.addEventListener('keydown', function(event) {
	if (event.key === '+') {
	unhighlightOperator (document.getElementById("plus"))
	document.getElementById("plus").classList.add('disabled-operator-btn');
	unhighlightNumericButtons();
	} else if (event.key === '-') {
	unhighlightOperator (document.getElementById("minus"))
	document.getElementById("minus").classList.add('disabled-operator-btn');
	unhighlightNumericButtons();
	} else if (event.key === '/') {
	unhighlightOperator (document.getElementById("divide"))
	document.getElementById("divide").classList.add('disabled-operator-btn');
	unhighlightNumericButtons();
	} else if (event.key === '*') {
	unhighlightOperator (document.getElementById("by"))
	document.getElementById("by").classList.add('disabled-operator-btn');
	unhighlightNumericButtons();
	}else if (event.key === 'Control') {
	unhighlightOperator (document.getElementById("plus-minus"))
	document.getElementById("plus-minus").classList.add('disabled-operator-btn');
	unhighlightNumericButtons();
		}
	});
}

function unhighlightOperator (value) {
	value.classList.remove('disabled-operator-btn');
}

function unhighlightNumericButtons() {
	let numericalButtons = document.getElementsByClassName('numbers-btn');
	for (let i=0; i<numericalButtons.length; i++) {
		numericalButtons[i].classList.remove('disabled-numeric-btn');
	}
}

function unhighlightAll () {
let operatorButtons = document.getElementsByClassName('operator-btn');
for (let i=0; i<operatorButtons.length; i++) {
	operatorButtons[i].classList.remove('disabled-operator-btn');
}

let numericalButtons = document.getElementsByClassName('numbers-btn');
	for (let i=0; i<numericalButtons.length; i++) {
		numericalButtons[i].classList.remove('disabled-numeric-btn');
	}
	document.getElementById("comma").classList.remove('disabled-comma-btn');
}

keyNumbers();

keyHighlight();



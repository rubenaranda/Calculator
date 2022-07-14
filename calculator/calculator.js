
function takeValue(x) {
let results = document.getElementById('resultScreen');
if (results.innerText == '0') {
	results.innerText = '';
	results.innerText += x;
} else if (results.innerText.length <= 9) {
	document.getElementById('resultScreen').innerText += x;
	if (results.innerText.includes(',') && x == ',') {
		console.log('manolo');
	}  
	}
	}
}

function clearInput(y) {
	document.getElementById('resultScreen').innerText = y;
}

function calculate() {
	if (document.getElementById('resultScreen').innerText.includes('+')) {
		var x = document.getElementById('resultScreen').innerText.split('+');
		document.getElementById('resultScreen').innerText = parseInt(x[0]) + parseInt(x[1]);

	} else if (document.getElementById('resultScreen').innerText.includes('-')) {
		var x = document.getElementById('resultScreen').innerText.split('-');
		document.getElementById('resultScreen').innerText = parseInt(x[0]) - parseInt(x[1]);
		
	} else if (document.getElementById('resultScreen').innerText.includes('*')) {
		var x = document.getElementById('resultScreen').innerText.split('*');
		document.getElementById('resultScreen').innerText = parseInt(x[0]) * parseInt(x[1]);

	} else {
		var x = document.getElementById('resultScreen').innerText.split('/');
		document.getElementById('resultScreen').innerText = parseInt(x[0]) / parseInt(x[1]);
	}
}


function clickHighlight(button) {
	button.style.background = 'rgb(255, 255, 255)'
}

function keyNumbers (){
document.addEventListener('keydown', function(event) {
	if (event.key >= 0 && event.key <= 9){
	takeValue(event.key)
	} else if (event.key === '+') {
		document.getElementById('resultScreen').innerText += '+'
	} else if (event.key === '-') {
		document.getElementById('resultScreen').innerText += '-'
	} else if (event.key === '*') {
		document.getElementById('resultScreen').innerText += '*'
	} else if (event.key === '/') {
		document.getElementById('resultScreen').innerText += '/'
	}

	if (event.key === 'Enter') {
		calculate()
		unhighlight()
	} else if (event.key === 'Escape') {
		document.getElementById('clear-button').click();
	} else if (event.key === ',') {
		document.getElementById('resultScreen').innerText += ','
	}
})
}

function keyHighlight () {
	document.addEventListener('keydown', function(event) {
	if (event.key === '+') {
	document.getElementById("plus").style.background = 'rgb(255, 255, 255)'		
	} else if (event.key === '-') {
	document.getElementById("minus").style.background = 'rgb(255, 255, 255)'
	} else if (event.key === '/') {
	document.getElementById("divide").style.background = 'rgb(255, 255, 255)'
	} else if (event.key === '*') {
	document.getElementById("by").style.background = 'rgb(255, 255, 255)';
	}});
}

function unhighlight () {
document.getElementById("plus").style.background = "#2B3549"
document.getElementById("minus").style.background = "#2B3549"
document.getElementById("divide").style.background = "#2B3549"
document.getElementById("by").style.background = "#2B3549"
}

keyNumbers();

keyHighlight();

unhighlight();


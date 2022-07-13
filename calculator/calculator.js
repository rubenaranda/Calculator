let result = [];

function takeValue(x) {
	if (result.length < 9){
	document.getElementById('resultScreen').value += x;
	result.push(x)
	} else {
		document.getElementById('resultScreen').value = result
	}
}

function clearInput(y) {
	document.getElementById('resultScreen').value = y;
}

function calculate() {
	if (document.getElementById('resultScreen').value.includes('+')) {
		var x = document.getElementById('resultScreen').value.split('+');
		document.getElementById('resultScreen').value = parseInt(x[0]) + parseInt(x[1]);

	} else if (document.getElementById('resultScreen').value.includes('-')) {
		var x = document.getElementById('resultScreen').value.split('-');
		document.getElementById('resultScreen').value = parseInt(x[0]) - parseInt(x[1]);
		
	} else if (document.getElementById('resultScreen').value.includes('*')) {
		var x = document.getElementById('resultScreen').value.split('*');
		document.getElementById('resultScreen').value = parseInt(x[0]) * parseInt(x[1]);

	} else {
		var x = document.getElementById('resultScreen').value.split('/');
		document.getElementById('resultScreen').value = parseInt(x[0]) / parseInt(x[1]);
	}
}


function clickHighlight(button) {
	button.style.background = 'rgb(255, 255, 255)'
}

function keyNumbers (){
document.addEventListener('keydown', function(event) {
	document.getElementById('resultScreen').value += event.key
	if (event.key === 'Enter') {
		calculate()
		unhighlight()
	} else if (event.key === 'Escape') {
		document.getElementById('resultScreen').value = 0
	}})
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


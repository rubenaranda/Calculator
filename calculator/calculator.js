function takeValue(x) {
	document.getElementById('resultScreen').value += x;
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





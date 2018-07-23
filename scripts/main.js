// Custom enumerated type to keep track of the type of button last pressed.
const buttons = {
	OPERATION: '+, -, *, /', 
	EQUAL: '=', 
	NUM: '0,1,2,3,4,5,6,7,8,9,.,+/-,%'
}

// Object keeps track of last number operated on, last operation and last button pressed.
let history = new CalculatorHistory("", "", "");
let allButtons = document.querySelectorAll("button");
for(let i = 0; i < allButtons.length; i++){
	allButtons[i].addEventListener('click', pressButton);
}

// Keyboard input also valid for calculator.
// Keypress can pick up shifted keys, unlike keydown.
document.addEventListener('keypress', calcThruKeypress);

// Keypress doesn't pick up backspace.
document.addEventListener('keydown', (e) => {
	if (e.keyCode === 8){
		runCalculator("C");
	}
});

// Run calculator logic when a button is clicked on.
function pressButton(e) {
	let buttonTxt = e.target.innerHTML;
	runCalculator(buttonTxt);
}

// Update paramters of history object at the click of each button/key.
// Depending on what was last pressed, we can interpret the press of 
// the newest button differntly.
function runCalculator(buttonTxt) {
	let displayText = document.querySelector("#display");
	let displayNum = Number(displayText.textContent);
	adjustFontSize(displayText)	;

	// Pressing an operation means we need to record this operation for future evaluation,
	// and also possibly calculating a queued operation previosuly stored. 
	if(buttonTxt === "+" || buttonTxt === "-" || buttonTxt === "*" || buttonTxt === "/") {
		if (!history.getOperand() || history.getLastPressed() === buttons.EQUAL) {
			history.newOperand(displayNum);
		}
		else if (history.getLastPressed() === buttons.NUM) {
			let result = performArithmetic(history.getOperation(), history.getOperand(), displayNum);
			displayText.textContent = result.toString();
			history.newOperand(result);
		}
		history.newOperation(buttonTxt);
		history.newLastPressed(buttons.OPERATION);
	}
	// Clear all parameters when C is pressed
	else if (buttonTxt === "C") {
		history.newOperand("");
		history.newOperation("");
		history.newLastPressed(""); 
		displayText.textContent = "0";
		resetTextSize(displayText);
	}
	// Pressing equal means we do a calculation with the saved/displayed numbers and operations.
	// The order of operands can vary depending on whether an operand was just entered, or 
	// if we are hitting enter again and again to keep doing the same calculation.
	else if (buttonTxt === "=") {
		if (history.getLastPressed() === buttons.NUM && history.getOperand() !== "") {
			let result = performArithmetic(history.getOperation(), history.getOperand(), displayNum);
			history.newOperand(displayNum);
			displayText.textContent = result.toString();
			history.newLastPressed(buttons.EQUAL);
		}
		else if (history.getLastPressed() === buttons.EQUAL || history.getLastPressed() === buttons.OPERATION) {
			let result = performArithmetic(history.getOperation(), displayNum, history.getOperand());
			displayText.textContent = result.toString();
			history.newLastPressed(buttons.EQUAL);
		}
	}
	else if (buttonTxt === ".") {
		if (displayText.textContent.indexOf(".") === -1) {
			displayText.textContent += ".";
			history.newLastPressed(buttons.NUM);
		}
	}
	else if (buttonTxt === "+/-") {
		displayText.textContent = (displayNum * -1).toString();
		history.newLastPressed(buttons.NUM);
	}
	else if (buttonTxt === "%") {
		if (history.getOperand() && history.getOperation()) {
			let percentage = displayNum * 0.01 * history.getOperand();
			displayText.textContent = percentage.toString();
			history.newLastPressed(buttons.NUM);
		}
	}
	// When pressing a numeral, we might need to append the digit or replace the display entirely.
	else { //numbers 0-9
		if (history.getLastPressed() === buttons.NUM) {
			displayText.textContent += buttonTxt;
		}
		else if (history.getLastPressed() === buttons.EQUAL || 
			history.getLastPressed() === buttons.OPERATION || displayNum === 0) {
			displayText.textContent = buttonTxt;
		}
		history.newLastPressed(buttons.NUM);
	}
}

// Use keypress input to carry out calculator logic.
function calcThruKeypress(e) {
	console.log(e.keyCode);
	switch(e.keyCode) {
		case 48:
			runCalculator("0");
			break;
		case 49:
			runCalculator("1");
			break;
		case 50:
			runCalculator("2");
			break;
		case 51:
			runCalculator("3");
			break;
		case 52:
			runCalculator("4");
			break;
		case 53:
			runCalculator("5");
			break;
		case 54:
			runCalculator("6");
			break;
		case 55:
			runCalculator("7");
			break;
		case 56:
			runCalculator("8");
			break;
		case 57:
			runCalculator("9");
			break;
		case 61:
			runCalculator("=");
			break;
		case 13:
			runCalculator("=");
			break;
		case 43:
			runCalculator("+");
			break;
		case 45:
			runCalculator("-");
			break;
		case 47:
			runCalculator("/");
			break;
		case 46:
			runCalculator(".");
			break;
		case 42:
			runCalculator("*");
			break;
		case 37:
			runCalculator("%");
			break;
	}
}

// Given operation and two operands, perform the calculation
function performArithmetic(buttonTxt, A, B) {
	switch(buttonTxt) {
		case "+":
			return Number(A) + Number(B);
		case "-":
			return Number(A) - Number(B);
		case "*":
			return Number(A) * Number(B);
		case "/":
			return Number(A) / Number(B);
	}
}

// Decrease font size of display numbers if digits overflow
function adjustFontSize(displayText) {
	if (displayText.scrollWidth !== displayText.clientWidth) {
		let fontsz = window.getComputedStyle(displayText).fontSize;
		fontsz = fontsz.slice(0,fontsz.length - 2);
		displayText.style.cssText = "font-size: " + (Number(fontsz) - 10).toString() + "px;";
	}
}

// Reset display text to 52px (text might have been resized from number overflow)
function resetTextSize(displayText) {
	displayText.style.cssText = "font-size: 52px";
}

// This object records all the state parameters needed to carry out the 
// tasks of the calculator. Apart from the display number, we need another 
// number which was entered previously to perform a calculation, which is 
// saved in savedOperand. The last operation pressed and the type of the last
// button pressed are lastOperation and lastPressed respectively.
function CalculatorHistory(savedOperand, lastOperation, lastPressed) {
	this.savedOperand = savedOperand;
	this.lastOperation = lastOperation;
	this.lastPressed = lastPressed;
}

// CalculatorHistory methods
CalculatorHistory.prototype.newOperand = function(myNewOperand) {
	this.savedOperand = myNewOperand;
}

CalculatorHistory.prototype.newOperation = function(myNewOperation) {
	this.lastOperation = myNewOperation;
}

CalculatorHistory.prototype.newLastPressed = function(newPressed) {
	this.lastPressed = newPressed;
}

CalculatorHistory.prototype.getOperand = function() {
	return this.savedOperand;
}

CalculatorHistory.prototype.getOperation = function() {
	return this.lastOperation;
}

CalculatorHistory.prototype.getLastPressed = function() {
	return this.lastPressed;
}

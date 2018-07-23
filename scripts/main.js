/*  Custom enumerated type to keep track of whether
	the last button pressed was an operation button,
	number/number modification, equal sign, or other. 
*/
const buttons = {
	OPERATION: '+, -, *, /', 
	EQUAL: '=', 
	NUM: '0,1,2,3,4,5,6,7,8,9,.,+/-,%', 
}

// Object keeps track of last two numbers that were operated 
// on, the last operation, and the type of button that was last
// pressed.

let history = new CalculatorHistory("", "", "");
let allButtons = document.querySelectorAll("button");

// Every time a button is clicked on calculator, we update all our parameters
for(let i = 0; i < allButtons.length; i++){
	allButtons[i].addEventListener('click', pressButton);
}

// Evert time a keypress event is triggered, run calculator logic for that key.
// Keypress can pick up shifted keys, unlike keydown.
document.addEventListener('keypress', calcThruKeypress);

// Keypress doesn't pick up backspace
document.addEventListener('keydown', (e) => {
	switch(e.keyCode){
		case 8:
			runCalculator("C");
			break;
	}

});

// Run calculator logic when a button is clicked on
function pressButton(e) {
	let buttonTxt = e.target.innerHTML;
	runCalculator(buttonTxt);
}

// Update paramters of history object at the click of each button 
// so we can keep track of what changes need to be made. Every time a 
// button is clicked the state of our object is effectively updated
function runCalculator(buttonTxt) {
	//let buttonTxt = e.target.innerHTML;
	let displayText = document.querySelector("#display");
	let displayNum = Number(displayText.textContent);
	adjustFontSize(displayText)	;

	// Operation buttons trigger evaluations of calculations or 
	// simply the recording of the operation to be evaluated once
	// we get the next operand
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
	else if (buttonTxt === "=") {
		if (history.getLastPressed() === buttons.NUM && history.getOperand() !== "") {
			let result = performArithmetic(history.getOperation(), history.getOperand(), displayNum);
			history.newOperand(displayNum);
			displayText.textContent = result.toString();
		}
		else if (history.getLastPressed() === buttons.EQUAL || history.getLastPressed() === buttons.OPERATION) {
			let result = performArithmetic(history.getOperation(), displayNum, history.getOperand());
			displayText.textContent = result.toString();
		}
		history.newLastPressed(buttons.EQUAL);
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
	// Update numerical display according to what was pressed just before.
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
		case 43:
			runCalculator("+");
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

// Reset display text to 52px if text got resized from number overflow
function resetTextSize(displayText) {
	displayText.style.cssText = "font-size: 52px";
}

//This object records all the state parameters needed to carry out the 
// tasks of the calculator. firstOperand and secondOperand are the last 
// two operands that were operated on, so if we press the buttons 2, +,
// 3, and = in that order, 2 and 3 are our operands and + is the operation 
// stored. Also keep track of the type of the last button pressed, since this
// tends to effect the calculation the calculator will perform at any given stage.
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

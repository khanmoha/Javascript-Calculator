/*  Custom enumerated type to keep track of whether
	the last button pressed was an operation button,
	number/number modification, equal sign, or other. 
*/
const buttonEnums = {
	OPERATION: '+, -, *, /', 
	EQUAL: '=', 
	NUM: '0,1,2,3,4,5,6,7,8,9,.,+/-,%', 
	OTHER: 'C'
}

// Object keeps track of last two numbers that were operated 
// on, the last operation, and the type of button that was last
// pressed.

let calcHistory = new CalculatorClass("", "", "", buttonEnums.OTHER);
let buttons = document.querySelectorAll("button");

// Every time a button is clicked on calculator, we update all our parameters
for(let i = 0; i < buttons.length; i++){
	buttons[i].addEventListener('click', pressButton);
}

// Evert time a keypress event is triggered, run calculator logic for that key
// Keypress only fires when a character is pressed.
document.addEventListener('keypress', calcThruKeypress);

// Keypress doesn't detect backspace.
document.addEventListener('keydown', (e) => {
	if (e.keyCode === 8) {
		runCalculator("C");
	}
});

// Run calculator logic when a button is clicked on
function pressButton(e) {
	let buttonTxt = e.target.innerHTML;
	runCalculator(buttonTxt);
}

// Update paramters of calcHistory object at the click of each button 
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
	if(buttonTxt === "+" || buttonTxt === "-" || 
		buttonTxt === "*" || buttonTxt === "/") {

		if (calcHistory.getFirstO() === "") { 
			calcHistory.newFirstO(displayNum);
			calcHistory.newOperation(buttonTxt);
			calcHistory.newLastPressed(buttonEnums.OPERATION);
		}
		else if (calcHistory.getSecondO() === "" && 
			calcHistory.getLastPressed() !== buttonEnums.OPERATION) {
			calcHistory.newSecondO(displayNum);
			let result = performArithmetic(calcHistory.getOperation(), 
				calcHistory.getFirstO(), calcHistory.getSecondO());
			displayText.textContent = result.toString();
			calcHistory.newFirstO(result);
			calcHistory.newSecondO("");
			calcHistory.newOperation(buttonTxt);
			calcHistory.newLastPressed(buttonEnums.OPERATION);
			
		}
		else if (calcHistory.getLastPressed() === buttonEnums.EQUAL) {
			calcHistory.newSecondO("");
			calcHistory.newOperation(buttonTxt);
			calcHistory.newLastPressed(buttonEnums.OPERATION);
		}
		else {
			calcHistory.newOperation(buttonTxt);
			calcHistory.newLastPressed(buttonEnums.OPERATION);
		}
	}
	// Clear all parameters when C is pressed
	else if (buttonTxt === "C") {
		calcHistory.newFirstO("");
		calcHistory.newSecondO("");
		calcHistory.newOperation("");
		displayText.textContent = "0";
		resetTextSize(displayText);
		calcHistory.newLastPressed(buttonEnums.OTHER); 
	}
	// Evaluate calculation that has been stored in our object.
	// If we press equal after an operation, we must perform the 
	// operation on the currently displayed number.
	else if (buttonTxt === "=") {
		if ((calcHistory.getLastPressed() === buttonEnums.NUM ||
			calcHistory.getLastPressed() === buttonEnums.EQUAL) &&
			calcHistory.getFirstO()) {
			if (calcHistory.getSecondO() === "") {
				calcHistory.newSecondO(displayNum);
			}
			let result = performArithmetic(calcHistory.getOperation(),
				calcHistory.getFirstO(), calcHistory.getSecondO());
			displayText.textContent = result.toString();
			calcHistory.newFirstO(result);
			calcHistory.newLastPressed(buttonEnums.EQUAL);
		}
		else if (calcHistory.getLastPressed() === buttonEnums.OPERATION) {
			if (calcHistory.getSecondO() === "") {
				let result = performArithmetic(calcHistory.getOperation(), 
					calcHistory.getFirstO(), calcHistory.getFirstO());
				displayText.textContent = result.toString();
				calcHistory.newSecondO(calcHistory.getFirstO());
				calcHistory.newFirstO(result);
				calcHistory.newLastPressed(buttonEnums.EQUAL);
			}
			else {
				let result = performArithmetic(calcHistory.getOperation(), 
					calcHistory.getFirstO(), calcHistory.getSecondO());
				displayText.textContent = result.toString();
				calcHistory.newFirstO(result);
				calcHistory.newLastPressed(buttonEnums.EQUAL);
			}
		}
		
	}
	else if (buttonTxt === ".") {
		if (displayText.textContent.indexOf(".") === -1) {
			displayText.textContent += ".";
			calcHistory.newLastPressed(buttonEnums.NUM);
		}
	}
	else if (buttonTxt === "+/-") {
		if (displayText.textContent === "0") {
			return;
		}
		if (displayText.textContent[0] === "-") {
			displayText.textContent = displayText.textContent.slice(1);
		}
		else {
			displayText.textContent = "-" + displayText.textContent;
		}
		calcHistory.newLastPressed(buttonEnums.NUM);
	}
	else if (buttonTxt === "%") {
		if (calcHistory.getFirstO() && calcHistory.getOperation()) {
			let percentage = Number(displayNum) * 
			0.01 * calcHistory.getFirstO();
			displayText.textContent = percentage.toString();
			calcHistory.newSecondO(percentage);
			calcHistory.newLastPressed(buttonEnums.NUM);
		}
	}
	// Update numerical display according to what was pressed just before.
	else { //numbers 0-9
		if (calcHistory.getLastPressed() === buttonEnums.OPERATION || 
			calcHistory.getLastPressed() === buttonEnums.OTHER || displayText.textContent === "0") {
			displayText.textContent = buttonTxt;
			calcHistory.newLastPressed(buttonEnums.NUM);
		}		
		else if (calcHistory.getLastPressed() === buttonEnums.NUM) {			
			displayText.textContent += buttonTxt;
			calcHistory.newLastPressed(buttonEnums.NUM);
		}	
		else if (calcHistory.getLastPressed() === buttonEnums.EQUAL) {
			displayText.textContent = buttonTxt;
			calcHistory.newFirstO("");
			calcHistory.newSecondO("");
			calcHistory.newLastPressed(buttonEnums.NUM);
		}
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
		case 187:
			runCalculator("=");
			break;
		case 13:
			runCalculator("=");
			break;
		case 42:
			runCalculator("*");
			break;
		case 95:
			runCalculator("-");
			break;
		case 37:
			runCalculator("%");
			break;
		case 191:
			runCalculator("/");
			break;
		case 189:
			runCalculator("-");
			break;
		case 190:
			runCalculator(".");
			break;
		case 8:
			runCalculator("C");
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
function CalculatorClass(firstOperand, secondOperand, lastOperation, lastPressed) {
	this.firstOperand = firstOperand;
	this.secondOperand = secondOperand;
	this.lastOperation = lastOperation;
	this.lastPressed = lastPressed;
}
	
// CalculatorClass methods
CalculatorClass.prototype.newFirstO = function(myNewOperand) {
	this.firstOperand = myNewOperand;
}

CalculatorClass.prototype.newSecondO = function(myNewOperand) {
	this.secondOperand = myNewOperand;
}

CalculatorClass.prototype.newOperation = function(myNewOperation) {
	this.lastOperation = myNewOperation;
}

CalculatorClass.prototype.newLastPressed = function(newPressed) {
	this.lastPressed = newPressed;
}

CalculatorClass.prototype.getFirstO = function() {
	return this.firstOperand;
}

CalculatorClass.prototype.getSecondO = function() {
	return this.secondOperand;
}

CalculatorClass.prototype.getOperation = function() {
	return this.lastOperation;
}

CalculatorClass.prototype.getLastPressed = function() {
	return this.lastPressed;
}

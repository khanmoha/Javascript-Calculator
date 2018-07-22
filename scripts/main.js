const buttonEnums = {
	OPERATION: '+, -, *, /', 
	EQUAL: '=', 
	NUM: '0,...,9', 
	OTHER: '., +/-, %, C'
}

let calcHistory = new CalculatorClass("", "", "", buttonEnums.OTHER);

let buttons = document.querySelectorAll("button");

for(let i = 0; i < buttons.length; i++){
	buttons[i].addEventListener('click', pressButton);
}

function pressButton(e) {
	let buttonTxt = e.target.innerHTML;
	let displayText = document.querySelector("#display");
	let displayNum = Number(displayText.textContent);
	if(buttonTxt === "+" || buttonTxt === "-" || 
		buttonTxt === "*" || buttonTxt === "/") {

		if (calcHistory.getFirstO() === "") { 
			calcHistory.newFirstO(displayNum);
			calcHistory.newOperation(buttonTxt);
			calcHistory.newLastPressed(buttonEnums.OPERATION);
		}
		else if (calcHistory.getSecondO() === "") {
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
	else if (buttonTxt === "C") {
		calcHistory.newFirstO("");
		calcHistory.newSecondO("");
		calcHistory.newOperation("");
		displayText.textContent = "0";
		calcHistory.newLastPressed(buttonEnums.OTHER); 
	}
	else if (buttonTxt === "=") {
		if (calcHistory.getLastPressed() === buttonEnums.NUM ||
			calcHistory.getLastPressed() === buttonEnums.EQUAL) {
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
		displayText.textContent += ".";
		calcHistory.newLastPressed(buttonEnums.NUM);
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
	else { //numbers 0-9
		if (calcHistory.getLastPressed() === buttonEnums.OPERATION || 
			calcHistory.getLastPressed() === buttonEnums.OTHER || displayNum === 0) {
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

function CalculatorClass(firstOperand, secondOperand, lastOperation, lastPressed) {
	this.firstOperand = firstOperand;
	this.secondOperand = secondOperand;
	this.lastOperation = lastOperation;
	this.lastPressed = lastPressed;
}
	

CalculatorClass.prototype.newFirstO = function(myNewOperand) {
	this.firstOperand = myNewOperand;
}

CalculatorClass.prototype.removeFirstO = function(myNewOperand) {
	this.firstOperand = "";
}

CalculatorClass.prototype.newSecondO = function(myNewOperand) {
	this.secondOperand = myNewOperand;
}

CalculatorClass.prototype.removeSecondO = function(myNewOperand) {
	this.secondOperand = "";
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

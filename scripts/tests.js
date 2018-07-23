// These tests are meant to be used in the console.

// Test a + b =
	document.querySelector("#btnC").click();
	document.querySelector("#btn1").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnEq").click();	
	console.assert(document.querySelector("#display").textContent === "3");


// Test a * b =
	document.querySelector("#btnC").click();
	document.querySelector("#btn3").click();
	document.querySelector("#btnMul").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnEq").click();	
	console.assert(document.querySelector("#display").textContent === "6");

// Test a / b =
	document.querySelector("#btnC").click();
	document.querySelector("#btn1").click();
	document.querySelector("#btn4").click();
	document.querySelector("#btnDiv").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnEq").click();	
	console.assert(document.querySelector("#display").textContent === "7");

// Test a - b =
	document.querySelector("#btnC").click();
	document.querySelector("#btn5").click();
	document.querySelector("#btnSub").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnEq").click();	
	console.assert(document.querySelector("#display").textContent === "3");

// Test successive numbers entered
	document.querySelector("#btnC").click();
	document.querySelector("#btn1").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btn3").click();
	document.querySelector("#btn4").click();
	document.querySelector("#btn5").click();
	document.querySelector("#btn6").click();
	document.querySelector("#btn7").click();
	document.querySelector("#btn8").click();
	document.querySelector("#btn9").click();
	document.querySelector("#btn0").click();
	console.assert(document.querySelector("#display").textContent === "1234567890");

// Test a + b = =
	document.querySelector("#btnC").click();
	document.querySelector("#btn1").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnEq").click();
	document.querySelector("#btnEq").click();	
	console.assert(document.querySelector("#display").textContent === "5");

// Test a * b = =
	document.querySelector("#btnC").click();
	document.querySelector("#btn3").click();
	document.querySelector("#btnMul").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnEq").click();	
	document.querySelector("#btnEq").click();
	console.assert(document.querySelector("#display").textContent === "12");

// Test a / b = =
	document.querySelector("#btnC").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btn8").click();
	document.querySelector("#btnDiv").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnEq").click();	
	document.querySelector("#btnEq").click();
	console.assert(document.querySelector("#display").textContent === "7");

// Test a - b = =
	document.querySelector("#btnC").click();
	document.querySelector("#btn5").click();
	document.querySelector("#btnSub").click();
	document.querySelector("#btn4").click();
	document.querySelector("#btnEq").click();	
	document.querySelector("#btnEq").click();	
	console.assert(document.querySelector("#display").textContent === "-3");

// Test a + b - c * d / e =
	document.querySelector("#btnC").click();
	document.querySelector("#btn5").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btn6").click();
	document.querySelector("#btnSub").click();
	document.querySelector("#btn4").click();
	document.querySelector("#btnMul").click();
	document.querySelector("#btn6").click();
	document.querySelector("#btnDiv").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btn1").click();
	document.querySelector("#btnEq").click();
	console.assert(document.querySelector("#display").textContent === "2");

// Test a + b + 
	document.querySelector("#btnC").click();
	document.querySelector("#btn5").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btn6").click();
	document.querySelector("#btnAdd").click();
	console.assert(document.querySelector("#display").textContent === "11");

// Test a + b + = =
	document.querySelector("#btnC").click();
	document.querySelector("#btn5").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btn6").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btnEq").click();
	document.querySelector("#btnEq").click();
	console.assert(document.querySelector("#display").textContent === "33");

// Test a + + +
	document.querySelector("#btnC").click();
	document.querySelector("#btn1").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btnAdd").click();
	console.assert(document.querySelector("#display").textContent === "1");

// Test a + b % =
	document.querySelector("#btnC").click();
	document.querySelector("#btn7").click();
	document.querySelector("#btn2").click();
	document.querySelector("#btnAdd").click();
	document.querySelector("#btn5").click();
	document.querySelector("#btnPer").click();
	document.querySelector("#btnEq").click();
	console.assert(document.querySelector("#display").textContent === "75.6");

// Test a . b
	document.querySelector("#btnC").click();
	document.querySelector("#btn7").click();
	document.querySelector("#btnDec").click();
	document.querySelector("#btn3").click();
	console.assert(document.querySelector("#display").textContent === "7.3");
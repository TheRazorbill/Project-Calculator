const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let previousInput = "";
let operator = null;

function updateDisplay() {
  inputBox.value = currentInput || previousInput || "0";
}

function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay();
}

function calculate() {
  let num1 = parseFloat(previousInput);
  let num2 = parseFloat(currentInput);
  if (isNaN(num1) || isNaN(num2)) return;

  let result = 0;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 === 0 ? "Erro" : num1 / num2;
      break;
    case "%":
      result = num1 % num2;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerText.trim(); // <- IMPORTANTE!

    if (value === "AC") {
      clearAll();
    } else if (value === "DEL") {
      deleteLast();
    } else if (["+", "-", "*", "/", "%"].includes(value)) {
      if (currentInput === "" && previousInput !== "") {
        operator = value;
      } else if (currentInput !== "") {
        if (previousInput !== "") calculate();
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    } else if (value === "=") {
      if (operator !== null && currentInput !== "") calculate();
    } else if (value === ".") {
      if (!currentInput.includes(".")) {
        currentInput += value;
        updateDisplay();
      }
    } else {
      currentInput += value;
      updateDisplay();
    }
  });
});

updateDisplay();

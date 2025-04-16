// DOM Elements
const input = document.getElementById("input");
const history = document.getElementById("history");

// Variables
let inputstring = "";
let lastResult = "";
let calculationHistory = "";

// Add event listener for keyboard input
document.addEventListener("keydown", handleKeyPress);

// Functions for calculator operations
function EnterNumber(number) {
  if (input.value === "Error") {
    clearInput();
  }
  inputstring += number;
  input.value = inputstring;
}

function EnterOperator(op) {
  if (inputstring === "") {
    if (lastResult !== "") {
      inputstring = lastResult;
    } else {
      return;
    }
  }

  const lastChar = inputstring[inputstring.length - 1];
  if (["+", "-", "*", "/", "."].includes(lastChar)) {
    inputstring = inputstring.slice(0, -1);
  }

  inputstring += op;
  input.value = inputstring;
}

function EnterDot() {
  if (input.value === "Error") {
    clearInput();
  }

  if (inputstring === "" || /[+\-*/]$/.test(inputstring)) {
    inputstring += "0.";
  } else if (!/\d*\.\d*$/.test(inputstring.split(/[+\-*/]/).pop())) {
    inputstring += ".";
  }

  input.value = inputstring;
}

function clearInput() {
  inputstring = "";
  input.value = "";
  history.textContent = "";
}

function backspace() {
  if (input.value === "Error") {
    clearInput();
    return;
  }

  inputstring = inputstring.slice(0, -1);
  input.value = inputstring;
}

function percent() {
  if (inputstring !== "") {
    try {
      calculationHistory = inputstring + " % = ";
      inputstring = (parseFloat(eval(inputstring)) / 100).toString();
      input.value = inputstring;
      history.textContent = calculationHistory;
      lastResult = inputstring;
    } catch (e) {
      input.value = "Error";
    }
  }
}

function squareRoot() {
  if (inputstring !== "") {
    try {
      calculationHistory = "√(" + inputstring + ") = ";
      const value = eval(inputstring);

      if (value < 0) {
        input.value = "Error";
        return;
      }

      inputstring = Math.sqrt(value).toString();
      input.value = inputstring;
      history.textContent = calculationHistory;
      lastResult = inputstring;
    } catch (e) {
      input.value = "Error";
    }
  }
}

function power() {
  if (inputstring !== "") {
    try {
      calculationHistory = inputstring + "² = ";
      inputstring = Math.pow(eval(inputstring), 2).toString();
      input.value = inputstring;
      history.textContent = calculationHistory;
      lastResult = inputstring;
    } catch (e) {
      input.value = "Error";
    }
  }
}

function copyInput() {
  if (input.value !== "" && input.value !== "Error") {
    navigator.clipboard.writeText(input.value);
    // Optional: Show a temporary message that text was copied
    const originalValue = input.value;
    input.value = "Copied!";
    setTimeout(() => {
      input.value = originalValue;
    }, 800);
  }
}

function equals() {
  if (inputstring === "") return;

  try {
    calculationHistory = inputstring + " = ";
    // Replace display symbols with JavaScript operators
    const expression = inputstring
      .replace(/\u00D7/g, "*")
      .replace(/\u00F7/g, "/");
    const result = eval(expression);

    // Format the result to avoid extremely long decimals
    inputstring = formatResult(result);
    input.value = inputstring;
    history.textContent = calculationHistory;
    lastResult = inputstring;
  } catch (e) {
    input.value = "Error";
    inputstring = "";
  }
}

// Helper function to format results
function formatResult(result) {
  // If it's an integer, return as is
  if (Number.isInteger(result)) {
    return result.toString();
  }

  // For floating point numbers, limit to 8 decimal places
  return parseFloat(result.toFixed(8)).toString();
}

// Handle keyboard input
function handleKeyPress(e) {
  const key = e.key;

  // Numbers
  if (/^[0-9]$/.test(key)) {
    EnterNumber(parseInt(key));
  }
  // Operators
  else if (key === "+" || key === "-") {
    EnterOperator(key);
  } else if (key === "*" || key === "x") {
    EnterOperator("*");
  } else if (key === "/") {
    EnterOperator("/");
  }
  // Decimal point
  else if (key === ".") {
    EnterDot();
  }
  // Equals (Enter or =)
  else if (key === "Enter" || key === "=") {
    equals();
  }
  // Backspace
  else if (key === "Backspace") {
    backspace();
  }
  // Clear (Escape or Delete)
  else if (key === "Escape" || key === "Delete") {
    clearInput();
  }
  // Prevent default behavior for calculator keys
  if (
    [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "/",
      ".",
      "=",
      "Enter",
      "Backspace",
      "Escape",
      "Delete",
    ].includes(key)
  ) {
    e.preventDefault();
  }
}

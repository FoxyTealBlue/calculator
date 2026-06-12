const calculatorButtons = document.querySelectorAll(".calculatorButton");
const calculator = {
  operator1: "",
  operator2: "",
  operand: "",
  operandSet: false,
  solution: "",
  assignValue: function (value) {
    if (value === ".") {
      if (!this.operandSet && !this.operator1.includes(".")) {
        this.operator1 = this.operator1 + value;
        updateDisplayCurrent(this.operator1);
      }
      if (this.operandSet && !this.operator2.includes(".")) {
        this.operator2 = this.operator2 + value;
        updateDisplayCurrent(this.operator2);
      }
      return;
    }
    if (isNaN(value) && this.operandSet) {
      calculator.solution =
        "" +
        operate(
          Number(calculator.operator1),
          Number(calculator.operator2),
          calculator.operand,
        );
      this.operator1 = this.solution;
      this.operator2 = "";
      this.operand = value;
      updateDisplayCurrent(this.operator1);
      return;
    }
    if (isNaN(value)) {
      this.operand = value;
      this.operandSet = true;
      updateHistory();
      return;
    }
    if (
      (value === "0" && this.operator1 === "") ||
      (value === "0" && this.operator2 === "" && this.operandSet)
    ) {
      return;
    }
    if (!this.operandSet) {
      this.operator1 = this.operator1 + value;
      updateDisplayCurrent(this.operator1);
    }
    if (this.operandSet) {
      this.operator2 = this.operator2 + value;
      updateDisplayCurrent(this.operator2);
    }
  },
};

calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.target.innerText === "C") {
      backspace();
    } else if (event.target.innerText === "AC") {
      clearAll();
    } else if (event.target.innerText === "=") {
      calculator.solution =
        "" +
        operate(
          Number(calculator.operator1),
          Number(calculator.operator2),
          calculator.operand,
        );
      updateDisplayCurrent(calculator.solution);
      console.table(calculator);
    } else {
      calculator.assignValue(event.target.innerText);
      console.table(calculator);
    }
  });
});

function backspace() {
  if (
    calculator.operator1 === "" &&
    calculator.operator2 === "" &&
    calculator.operand === ""
  ) {
    console.log("should clear all");
    clearAll();
  } else if (!calculator.operandSet) {
    calculator.operator1 = calculator.operator1.substring(
      0,
      calculator.operator1.length - 1,
    );
    updateDisplayCurrent(calculator.operator1);
  } else if (calculator.operandSet && calculator.operator2 === "") {
    calculator.operand = "";
    calculator.operandSet = false;
    updateDisplayCurrent(calculator.operator1);
  } else if (calculator.operandSet && calculator.operator2 !== "") {
    calculator.operator2 = calculator.operator2.substring(
      0,
      calculator.operator2.length - 1,
    );
    updateDisplayCurrent(calculator.operator2);
  }
  console.table(calculator);
  return;
}

function clearAll() {
  updateDisplayCurrent("0");
  calculator.operator1 = "";
  calculator.operator2 = "";
  calculator.operand = "";
  calculator.operandSet = false;
  calculator.solution = "";
  updateHistory();
  console.table(calculator);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if ((x === 0 && y === 0) || y === 0) {
    return console.error("You cannot divide by 0.");
  }
  return x / y;
}

function operate(x, y, operator) {
  let result = undefined;
  switch (operator) {
    case "+":
      result = add(x, y);
      break;
    case "-":
      result = subtract(x, y);
      break;
    case "*":
      result = multiply(x, y);
      break;
    case "/":
      result = divide(x, y);
      break;
    default:
      console.error("You went and broke it, congrats.");
  }
  return result;
}

function updateDisplayCurrent(input) {
  const current = document.querySelector("#current");
  current.textContent = input;
  updateHistory();
  return;
}

function updateHistory() {
  const history = document.querySelector("#history");
  history.textContent =
    calculator.operator1 +
    " " +
    calculator.operand +
    " " +
    calculator.operator2;
}

const calculatorButtons = document.querySelectorAll(".calculatorButton");
const calculator = {
  operand1: "",
  operand2: "",
  operator: "",
  operatorSet: false,
  solution: "",
  availableOperands: ["/", "*", "-", "+", "."],
  assignValue: function (value) {
    if (this.solution !== "") {
      console.log("this.solution !== ''");
      if (this.availableOperands.includes(value)) {
        console.log("this.availalbeOperands.includes(value)");
        this.operator = value;
        this.operatorSet = true;
        this.operand2 = "";
        this.solution = "";
        updateDisplayCurrent();
        return;
      }
      return;
    }
    if (value === ".") {
      console.log("value === '.'");
      if (!this.operatorSet && !this.operand1.includes(".")) {
        this.operand1 = this.operand1 + value;
        updateDisplayCurrent(this.operand1);
      }
      if (this.operatorSet && !this.operand2.includes(".")) {
        this.operand2 = this.operand2 + value;
        updateDisplayCurrent(this.operand2);
      }
      return;
    }
    if (isNaN(value) && this.operatorSet) {
      console.log("isNaN(value) && this.operatorSet");
      calculator.solution =
        "" +
        operate(
          Number(calculator.operand1),
          Number(calculator.operand2),
          calculator.operator,
        );
      this.operand1 = this.solution;
      this.operand2 = "";
      this.operator = value;
      updateDisplayCurrent(this.operand1);
      return;
    }
    if (isNaN(value)) {
      this.operator = value;
      this.operatorSet = true;
      updateHistory();
      return;
    }
    if (
      (value === "0" && this.operand1 === "") ||
      (value === "0" && this.operand2 === "" && this.operatorSet)
    ) {
      return;
    }
    if (!this.operatorSet) {
      this.operand1 = this.operand1 + value;
      updateDisplayCurrent(this.operand1);
    }
    if (this.operatorSet) {
      this.operand2 = this.operand2 + value;
      updateDisplayCurrent(this.operand2);
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
          Number(calculator.operand1),
          Number(calculator.operand2),
          calculator.operator,
        );
      updateDisplayCurrent(calculator.solution);
      console.table(calculator);
    } else {
      calculator.assignValue(event.target.innerText);
      console.table(calculator);
    }
  });
});

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "Enter") {
    calculator.solution =
      "" +
      operate(
        Number(calculator.operand1),
        Number(calculator.operand2),
        calculator.operator,
      );
    updateDisplayCurrent(calculator.solution);
    return console.table(calculator);
  }
  if (calculator.availableOperands.includes(event.key) || !isNaN(event.key)) {
    return calculator.assignValue(event.key);
  }
});

function backspace() {
  if (
    calculator.operand1 === "" &&
    calculator.operand2 === "" &&
    calculator.operator === ""
  ) {
    console.log("should clear all");
    clearAll();
  } else if (!calculator.operatorSet) {
    calculator.operand1 = calculator.operand1.substring(
      0,
      calculator.operand1.length - 1,
    );
    updateDisplayCurrent(calculator.operand1);
  } else if (calculator.operatorSet && calculator.operand2 === "") {
    calculator.operator = "";
    calculator.operatorSet = false;
    updateDisplayCurrent(calculator.operand1);
  } else if (calculator.operatorSet && calculator.operand2 !== "") {
    calculator.operand2 = calculator.operand2.substring(
      0,
      calculator.operand2.length - 1,
    );
    updateDisplayCurrent(calculator.operand2);
  }
  console.table(calculator);
  return;
}

function clearAll() {
  updateDisplayCurrent("0");
  calculator.operand1 = "";
  calculator.operand2 = "";
  calculator.operator = "";
  calculator.operatorSet = false;
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
    calculator.operand1 + " " + calculator.operator + " " + calculator.operand2;
}

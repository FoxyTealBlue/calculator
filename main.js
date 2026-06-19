const calculatorButtons = document.querySelectorAll(".calculatorButton");
const calculator = {
  operand1: "",
  operand2: "",
  operator: "",
  operatorSet: false,
  solution: "",
  buttonMap: {
    Clear: "clear",
    Delete: "delete",
    Backspace: "delete",
    "/": "divide",
    "*": "mulitply",
    7: "seven",
    8: "eight",
    9: "nine",
    "-": "subtract",
    4: "four",
    5: "five",
    6: "six",
    "+": "add",
    1: "one",
    2: "two",
    3: "three",
    Enter: "equals",
    0: "zero",
    ".": "point",
  },
  availableOperands: ["/", "*", "-", "+"],
  specialCharacters: ["."],
  clickSound: new Audio("./clickSound.mp3"),
  runCalculator: function (value) {
    if (value === "C") {
      return backspace();
    } else if (value === "AC") {
      return clearAll();
    }
    this.assignValue(value);
  },
  assignValue: function (value) {
    // TODO : CLEAN THIS UP, MAY NOT NEED.
    if (this.solution !== "") {
      if (this.availableOperands.includes(value)) {
        this.operator = value;
        this.operatorSet = true;
        this.operand2 = "";
        this.solution = "";
        updateDisplayCurrent();
        return;
      }
      return;
    }
    if (value === "=" && this.operand2 === "") {
      this.solution = this.operand1;

      return updateDisplayCurrent(this.solution, "=");
    }
    if (value === "=") {
      calculator.solution =
        "" +
        operate(
          Number(calculator.operand1),
          Number(calculator.operand2),
          calculator.operator,
        );
      updateDisplayCurrent(calculator.solution, "=");
      calculator.operand1 = calculator.solution;
      return;
    }
    if (value === ".") {
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
      this.solution = "";
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
      return updateDisplayCurrent(this.operand1);
    }
    if (this.operatorSet) {
      this.operand2 = this.operand2 + value;
      return updateDisplayCurrent(this.operand2);
    }
  },
};

calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    calculator.runCalculator(event.target.innerText);
    calculator.clickSound.currentTime = 0;
    calculator.clickSound.play();
  });
  button.addEventListener("transitionend", () => {
    button.classList.remove("buttonDepressed");
  });
});

document.addEventListener("keydown", (event) => {
  if (calculator.buttonMap[event.key]) {
    const value = calculator.buttonMap[event.key];
    document.querySelector(`#${value}`).classList.add("buttonDepressed");
    calculator.clickSound.currentTime = 0;
    calculator.clickSound.play();
  }
  if (event.key === "Enter") {
    calculator.runCalculator("=");
  }
  if (event.key === "Clear") {
    calculator.runCalculator("AC");
  }
  if (event.key === "Backspace" || event.key === "Delete") {
    calculator.runCalculator("C");
  }
  if (
    calculator.availableOperands.includes(event.key) ||
    !isNaN(event.key) ||
    calculator.specialCharacters.includes(event.key)
  ) {
    return calculator.assignValue(event.key);
  }
});

function backspace() {
  if (
    calculator.operand1 === "" &&
    calculator.operand2 === "" &&
    calculator.operator === ""
  ) {
    return clearAll();
  } else if (!calculator.operatorSet) {
    if (calculator.operand1.length === 1) {
      return clearAll();
    }
    calculator.operand1 = calculator.operand1.substring(
      0,
      calculator.operand1.length - 1,
    );
    return updateDisplayCurrent(calculator.operand1);
  } else if (calculator.operatorSet && calculator.operand2 === "") {
    calculator.operator = "";
    calculator.operatorSet = false;
    return updateDisplayCurrent(calculator.operand1);
  } else if (calculator.operatorSet && calculator.operand2 !== "") {
    calculator.operand2 = calculator.operand2.substring(
      0,
      calculator.operand2.length - 1,
    );
    return updateDisplayCurrent(calculator.operand2);
  }
  return updateDisplayCurrent("0");
}

function clearAll() {
  updateDisplayCurrent("0");
  calculator.operand1 = "";
  calculator.operand2 = "";
  calculator.operator = "";
  calculator.operatorSet = false;
  calculator.solution = "";
  updateHistory();
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

function updateDisplayCurrent(input, equals = "") {
  const current = document.querySelector("#current");
  current.textContent = input;
  updateHistory(equals);
  return;
}

function updateHistory(equals = "") {
  const history = document.querySelector("#history");
  history.textContent =
    calculator.operand1 +
    " " +
    calculator.operator +
    " " +
    calculator.operand2 +
    " " +
    equals;
  return;
}

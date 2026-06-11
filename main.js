const calculatorButtons = document.querySelectorAll(".calculatorButton");
const calculator = {
  operator1: "",
  operator2: "",
  operand: "",
  operandSet: false,
  solution: "",
  assignValue: function (value) {
    if (isNaN(value)) {
      this.operand = value;
      this.operandSet = true;
      return;
    }
    !this.operandSet
      ? (this.operator1 = this.operator1 + value)
      : (this.operator2 = this.operator2 + value);
  },
};

calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.target.innerText === "C") {
      deleteNumber();
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
    } else {
      calculator.assignValue(event.target.innerText);
      console.table(calculator);
    }
  });
});

function deleteNumber() {
  console.log("deleteNumber");
}

function clearAll() {
  console.log("allClear");
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

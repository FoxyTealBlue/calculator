const calculatorButtons = document.querySelectorAll(".calculatorButton");

calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.target.innerText === "C") {
      deleteNumber();
    } else if (event.target.innerText === "AC") {
      allClear();
    } else {
      console.log(event);
      alert(event.target.innerText);
    }
  });
});

function deleteNumber() {
  console.log("deleteNumber");
}

function allClear() {
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

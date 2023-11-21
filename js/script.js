const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);

const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalesButton = document.querySelector("[data-equales]");

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
//

//
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  numberButton(button) {
    const strButton = button.toString();
    const strCurrent = this.currentOperand.toString();
    if (strCurrent.includes(".") && strButton === ".") return;
    this.currentOperand += strButton;
  }

  chooseOperations(operations) {
    if (this.currentOperand == "") return;
    if (this.previousOperand !== "") {
      this.equales();
    }
    this.operation = operations;
    this.previousOperand = `${this.currentOperand} ${this.operation}`;
    this.currentOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  equales() {
    let equale;
    const current = parseFloat(this.currentOperand);
    const prev = parseFloat(this.previousOperand);
    // const operation = this.operation;

    if (isNaN(current) || isNaN(prev)) return;
    switch (this.operation) {
      case "+":
        equale = prev + current;
        break;

      case "-":
        equale = prev - current;
        break;

      case "*":
        equale = prev * current;
        break;

      case "/":
        equale = prev / current;
        break;

      default:
        return;
    }

    this.currentOperand = equale;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateValue() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
//

//
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//
numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.numberButton(button.innerText);
    calculator.updateValue();
  });
});
//

//
operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperations(button.innerText);
    calculator.updateValue();
  });
});
//

//
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateValue();
});

//
equalesButton.addEventListener("click", () => {
  calculator.equales();
  calculator.updateValue();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateValue();
});

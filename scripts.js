let total = 0;
let initialValue = "";
let nextValue = "";
let operator = "";
let isOperatorActive = false;
let firstEquationHappened = false;
let displayText = "";

const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator")
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const display = document.querySelector('.display')
const deleteButton = document.querySelector('.delete');

const MAX_LENGTH = 15;

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function () {
        if (isOperatorActive == false) {
            if (initialValue.length < MAX_LENGTH) {
                initialValue += this.textContent;
                calculator.updateDisplay(initialValue);
            }
        } else {
            if (nextValue.length < MAX_LENGTH) {
                nextValue += this.textContent;
                calculator.updateDisplay(nextValue);
            }
        }
    });
};

for (let i = 0; i < operatorButtons.length; i++) { 
    operatorButtons[i].addEventListener("click", function () {
        operator = this.textContent;
        calculator.updateDisplay(operator);
        isOperatorActive = true;
        calculator.enableAllButtons();
    });
};

equalsButton.addEventListener("click", function () {
    if (nextValue) {
        calculator.operate();
        firstEquationHappened = true;
        calculator.disableNumberButtons();
    }
});

clearButton.addEventListener("click", function () {
    total = 0;
    calculator.updateDisplay(total);
    initialValue = "";
    nextValue = "";
    operator = "";
    isOperatorActive = false;
    firstEquationHappened = false;
    calculator.enableAllButtons();
});

deleteButton.addEventListener("click", function () {
    calculator.delete();
});

const calculator = {
    operate: function() {
        if (initialValue && isOperatorActive && nextValue || firstEquationHappened) {
            switch (operator) {
                case "+":
                    total += (Number(initialValue) + Number(nextValue));
                    break;
                case "-":
                    total += (Number(initialValue) - Number(nextValue));
                    break;
                case "*":
                    if (firstEquationHappened) {
                        total *= nextValue;
                        break;
                    } else {
                        total += (Number(initialValue) * Number(nextValue));
                        break;
                    }
                case "/":
                    if (initialValue !== 0 && nextValue != 0 && firstEquationHappened == false) {
                        total += (Number(initialValue) / Number(nextValue));
                        break;
                    } else if (initialValue !== 0 && nextValue != 0 && firstEquationHappened) {
                        total /= nextValue
                        break;
                    } else {
                        total = "Lol don't do that";
                        this.updateDisplay(total);
                        this.disableAllButtons();
                        return;
                    }
            }
        }
        if (typeof total === 'number') {
            if (Math.abs(total) > 1e+12) {
                total = total.toExponential(4);
            } else {
                total = parseFloat(total.toFixed(7));
            }
        }
        this.updateDisplay(total);
        initialValue = "";
        nextValue = "";
        isOperatorActive = false;
    },
    delete: function() {
        if (isOperatorActive) {
            nextValue = nextValue.slice(0, -1);
            this.updateDisplay(nextValue);
        } else {
            initialValue = initialValue.slice(0, -1);
            this.updateDisplay(initialValue);
        }
    },
    updateDisplay: function(value) {
        display.textContent = value;
    },
    disableNumberButtons: function () {
        for (let i = 0; i < numberButtons.length; i++) {
            numberButtons[i].disabled = true;
            deleteButton.disabled = true;
        }
    },
    disableAllButtons: function () {
        document.querySelectorAll("button").forEach(button => {
            if (!button.classList.contains("clear")) {
              button.disabled = true;
            }
          });
    },
    enableNumberButtons: function () {
        for (let i = 0; i < numberButtons.length; i++) {
            numberButtons[i].disabled = false;
        }
    },
    enableAllButtons: function () {
        document.querySelectorAll("button").forEach(button => button.disabled = false);
    }
};
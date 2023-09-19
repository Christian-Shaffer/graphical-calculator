let total = 0;
let initialValue = "";
let nextValue = "";
let operator = "";
let isOperatorActive = false;
let firstEquationHappened = false;
let displayText = "";
let isDisplayFrozen = false;

const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator")
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const display = document.querySelector('.display')
const deleteButton = document.querySelector('.delete');

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function () {
        if (isOperatorActive == false) {
            initialValue += this.textContent
            console.log(initialValue);
            calculator.updateDisplay(initialValue);
        } else {
            nextValue += this.textContent;
            console.log(nextValue);
            calculator.updateDisplay(nextValue);
        }
    });
};

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", function () {
        operator = this.textContent;
        calculator.updateDisplay(operator);
        isOperatorActive = true;
        calculator.enableNumberButtons();
        console.log(operator);
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
    console.log('hit clear button');
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
                    console.log(total);
                    break;
                case "-":
                    total += (Number(initialValue) - Number(nextValue));
                    console.log(total);
                    break;
                case "*":
                    if (firstEquationHappened) {
                        total *= nextValue;
                        console.log(total);
                        break;
                    } else {
                        total += (Number(initialValue) * Number(nextValue));
                        console.log(total);
                        break;
                    }
                case "/":
                    if (initialValue !== 0 && nextValue != 0 && firstEquationHappened == false) {
                        total += (Number(initialValue) / Number(nextValue));
                        console.log(total);
                        break;
                    } else if (initialValue !== 0 && nextValue != 0 && firstEquationHappened) {
                        total /= nextValue
                        console.log(total);
                        break;
                    } else {
                        total = "Divide by 0 error - hit clear button";
                        calculator.updateDisplay(total);
                        calculator.disableAllButtons();
                        return;
                        // Disable other buttons here
                    }
            }
        }
        initialValue = "";
        nextValue = "";
        isOperatorActive = false;
        calculator.updateDisplay(total);
    },
    delete: function() {
        if (isDisplayFrozen == false) {
            if (isOperatorActive) {
                nextValue = nextValue.slice(0, -1);
                calculator.updateDisplay(nextValue);
                console.log('Deleted last character, operator detected');
            } else {
                initialValue = initialValue.slice(0, -1);
                calculator.updateDisplay(initialValue);
                console.log('Deleted last character, operator not detected');
            }
        }
    },
    updateDisplay: function(value) {
        display.textContent = value;
        if (value == total) {
            isDisplayFrozen = true;
        }
    },
    disableNumberButtons: function () {
        for (let i = 0; i < numberButtons.length; i++) {
            numberButtons[i].disabled = true;
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



// for (let i = 0; i < numberButtons.length; i++) {
//     numberButtons[i].addEventListener("click", function () {

// Once disable buttons working, rework the frozen display part
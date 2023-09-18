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

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function () {
        if (isOperatorActive == false) {
            initialValue += this.textContent
            console.log(initialValue);
            display.textContent = initialValue;
        } else {
            nextValue += this.textContent;
            console.log(nextValue);
            display.textContent = nextValue;
        }
    });
};

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", function () {
        operator = this.textContent;
        display.textContent = operator;
        isOperatorActive = true;
        console.log(operator);
    });
};

equalsButton.addEventListener("click", function () {
    calculator.operate();
    firstEquationHappened = true;
});

clearButton.addEventListener("click", function () {
    total = 0;
    initialValue = "";
    nextValue = "";
    operator = "";
    isOperatorActive = false;
    firstEquationHappened = false;
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
                    total += (Number(initialValue) * Number(nextValue));
                    console.log(total);
                    break;
                case "/":
                    if (initialValue !== 0 && nextValue != 0) {
                        total += (Number(initialValue) / Number(nextValue));
                        console.log(total);
                        break;
                    } else {
                        let total = "Divide by 0 error - hit clear button";
                        console.log(total);
                        return total;
                    }
            }
        }
        initialValue = "";
        nextValue = "";
        isOperatorActive == false;
        display.textContent = total;
    },
    updateDisplay: function() {
        display.textContent
    }
};
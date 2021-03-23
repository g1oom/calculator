function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "no u";
    } else {
        return a / b;
    }
}

function operate(num1, operator, num2) {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '/') {
        return divide(num1, num2);
    } else {
        return "invalid";
    }
}

let numbers = document.querySelector('.calculator-button .number');
numbers.addEventListener('click', function(event) {
    console.log(event.target);
});

/*
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let display = document.querySelector('.display');

numbers.forEach(this.onclick = function () {
    display.innerHTML += this.innerHTML;
});
*/
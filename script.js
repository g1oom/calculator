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
        if (a == 0) {
            return "Error";
        }
        return "Infinity";
    } else {
        // count number of digits to check whether decimal place needs to be rounded
        let answer = a / b;
        if (Math.floor(answer) !== answer) {
            let digitCount = answer.toString().split('.').join('').length;
            if (digitCount > 12) {
                let dp = 12 - answer.toString().split('.')[0].length;
                answer = answer.toFixed(dp);
            }
        }
        return answer;
    }
}

function operate(num1, operator, num2) {
    // check for calculations involving infinity
    if (num1 == "Infinity") {
        if (num2 == '0' && operator == '*') {
            return "Error";
        }
        return "Infinity";
    }

    // check for calculations involving error
    if (num1 == "Error") {
        return "Error";
    }

    num1 = Number(num1);
    num2 = Number(num2);
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '/') {
        return divide(num1, num2);
    }
}

function update_display_num(num_input) {
    let current_num = document.querySelector('.calculator-display').innerText;

    // if last key pressed was operator, refresh display
    if ((last_key != null) && (last_key.match(/[\+\-\*\/\=]/))) {
        current_num = num_input;
    }

    // numbers with more than one digit or non decimals cannot start with 0
    else if (current_num == '0') {
        if (num_input != '0') {
            current_num = num_input;
        }
    }
    else {
        current_num += num_input;
    }

    document.querySelector('.calculator-display').innerText = current_num;
    last_key = num_input;
}

function update_display_op(op_input) {
    let current_num = document.querySelector('.calculator-display').innerText;

    if (last_key == null) {
        // if first button pressed is operator, assume first number is 0
        saved_num = current_num.toString();
    } else {
        // store previous results to saved_num and show answer if operate can be called
        if (!last_key.match(/[\+\-\*\/]/)) {
            if (saved_num == null) {
                saved_num = current_num.toString(); // saved_num is stored in string format to account for Infinity and Error
            } else {
                saved_num = operate(saved_num, saved_op, current_num);
                document.querySelector('.calculator-display').innerText = saved_num;
            }
        }
    }

    saved_op = op_input;
    last_key = op_input;
}

function update_display_equal() {
    let current_num = document.querySelector('.calculator-display').innerText;

    // check if operate can be called
    if ((!isNaN(last_key)) && (saved_num != null)) {
        document.querySelector('.calculator-display').innerText = operate(saved_num, saved_op, current_num);
        // after last operation, refresh saved variables
        saved_num = null;
        saved_op = null;
    }

    last_key = '=';
}

function update_display_clear() {
    document.querySelector('.calculator-display').innerText = '0';
    saved_num = null;
    saved_op = null;
    last_key = null;
}

let numbers = document.querySelectorAll('.number > button');
numbers.forEach(number => number.addEventListener('click', function() {
    update_display_num(number.innerText);
}));

let operators = document.querySelectorAll('.operator > button');
operators.forEach(operator => operator.addEventListener('click', function() {
    update_display_op(operator.innerText);
}));

let equal = document.querySelector('.equal');
equal.addEventListener('click', function() {
    update_display_equal();
});

let clear = document.querySelector('.clear');
clear.addEventListener('click', function() {
    update_display_clear();
});

let saved_num = null;
let saved_op = null;
let last_key = null;

// todo: when result is error, reset everything, but still display error instead of 0
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    // fix recurring decimals for subtracting float values
    let dpA = 0;
    let dpB = 0;
    if (Math.floor(a) !== a) {
        dpA = a.toString().split('.')[1].length;
    }
    if (Math.floor(b) !== b) {
        dpB = b.toString().split('.')[1].length;
    }

    let dp = 0;
    if (dpA >= dpB) {
        dp = dpA;
    } else {
        dp = dpB;
    }
    return +(a - b).toFixed(dp);
}

function multiply(a, b) {
    return +(a * b).toFixed(11);
}

function divide(a, b) {
    if (b == 0 || b == -0) {
        if (a == 0 || a == -0) {
            return "Error";
        }
        return "Infinity";
    } else {
        let answer = a / b;

        // count number of digits to check whether decimal place needs to be rounded
        if (Math.floor(answer) !== answer) {
            let digitCount = answer.toString().split('.').join('').length;
            if (digitCount > 12) {
                let dp = 12 - answer.toString().split('.')[0].length;
                answer = +answer.toFixed(dp);
            }
        }
        return answer;
    }
}

function operate(num1, operator, num2) {
    // check for calculations involving infinity
    num2 = Number(num2);
    if (num1 == "Infinity") {
        if ((num2 == '0' || num2 == "-0") && operator == '*') {
            return "Error";
        }
        return "Infinity";
    }

    num1 = Number(num1);
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '÷' || operator == '/') {
        return divide(num1, num2);
    }
}

function update_display_num(num_input) {
    let current_num = document.querySelector('.calculator-display-inner').innerText;

    if (current_num != "Error") {
        // if last key pressed was operator, refresh display
        if ((last_key != null) && (last_key.match(/[+\-*÷/=]/))) {
            current_num = num_input;
        }

        // numbers with more than one digit or non decimals cannot start with 0
        else if (current_num == '0') {
            if (num_input != '0') {
                current_num = num_input;
            }
        }

        // negative zero
        else if (current_num == "-0") {
            if (num_input != '0') {
                current_num = '-' + num_input;
            }
        }

        else {
            current_num += num_input;
        }

        document.querySelector('.calculator-display-inner').innerText = current_num;
        last_key = num_input;
    }
}

function update_display_op(op_input) {
    let current_num = document.querySelector('.calculator-display-inner').innerText;

    if (current_num != "Error") {
        if (last_key == null) {
            // if first button pressed is operator, assume first number is 0
            saved_num = current_num.toString();
        } else {
            // store previous results to saved_num and show answer if operate can be called
            if (!last_key.match(/[+\-*÷/]/)) {
                if (saved_num == null) {
                    saved_num = current_num.toString(); // saved_num is stored in string format to account for Infinity and Error
                } else {
                    saved_num = operate(saved_num, saved_op, current_num);
                    document.querySelector('.calculator-display-inner').innerText = saved_num;
                }
            }
        }
        
        // if result is Error, reset saved_num and saved_op
        if (saved_num == "Error") {
            saved_num = null;
            saved_op = null;
        } else {
            saved_op = op_input;
        }

        last_key = op_input;
    }
}

function update_display_decimal() {
    let current_num = document.querySelector('.calculator-display-inner').innerText;
    if (current_num != "Error") {
        // if last key pressed was operator, refresh display
        if ((last_key != null) && (last_key.match(/[+\-*÷/=]/))) {
            current_num = "0.";
        } else {
            // check if there's already one decimal place in number
            let length = current_num.length;
            let i = 0;
            while ((i < length) && (current_num[i] != '.')) {
                i++;
            }
            if (i == length) {
                current_num += '.';
            }
        }

        document.querySelector('.calculator-display-inner').innerText = current_num;
        last_key = '.';
    }
}

function update_display_plusminus() {
    let current_num = document.querySelector('.calculator-display-inner').innerText;
    if (current_num != "Error") {
        // if last key pressed was operator, refresh display
        if ((last_key != null) && (last_key.match(/[+\-*÷/=]/))) {
            current_num = "-0";
        } else {
            if (current_num[0] == '-') {
                current_num = current_num.substring(1);
            } else {
                current_num = '-' + current_num;
            }
        }

        document.querySelector('.calculator-display-inner').innerText = current_num;
        last_key = '_';
    }
}

function update_display_equal() {
    let current_num = document.querySelector('.calculator-display-inner').innerText;

    if (current_num != "Error") {
        // check if operate can be called
        if ((last_key.match(/[0-9._]/)) && (saved_num != null)) {
            document.querySelector('.calculator-display-inner').innerText = operate(saved_num, saved_op, current_num);
            // after last operation, refresh saved variables
            saved_num = null;
            saved_op = null;
        }
        
        last_key = '=';
    }
}

function update_display_clear() {
    document.querySelector('.calculator-display-inner').innerText = '0';
    saved_num = null;
    saved_op = null;
    last_key = null;
}

function update_display_back() {
    let current_num = document.querySelector('.calculator-display-inner').innerText;

    if ((last_key != null) && (last_key.match(/[0-9._]/))) {
        if (current_num.length <= 1 || current_num == "-0") {
            current_num = '0';
        }

        else if (current_num.length == 2 && current_num[0] == '-') {
            current_num = "-0";
        }

        else {
            current_num = current_num.slice(0, -1);
        }
        document.querySelector('.calculator-display-inner').innerText = current_num;
    }
}

let numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', function() {
    update_display_num(number.innerText);
}));

let operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', function() {
    update_display_op(operator.innerText);
}));

let decimal = document.querySelector('.decimal');
decimal.addEventListener('click', function() {
    update_display_decimal();
});

let plusminus = document.querySelector('.plusminus');
plusminus.addEventListener('click', function() {
    update_display_plusminus();
});

let equal = document.querySelector('.equal');
equal.addEventListener('click', function() {
    update_display_equal();
});

let clear = document.querySelector('.clear');
clear.addEventListener('click', function() {
    update_display_clear();
});

let back = document.querySelector('.back');
back.addEventListener('click', function() {
    update_display_back();
});

let saved_num = null;
let saved_op = null;
let last_key = null;

// keyboard support
document.addEventListener('keydown', function(event) {
    // prevent repeat
    if (!event.repeat) {
        // numbers
        if (!isNaN(event.key)) {
            update_display_num(event.key);
            numbers[`${event.key}`].classList.add("active");
        }

        // operators
        else if (event.key.match(/[\+\-\*\/]/)) {
            update_display_op(event.key);

            // loop to find corresponding button
            if (event.key === '/') {
                document.getElementById("obelus").classList.add("active");
            } else {
                let k = event.key;
                let i = 0;
                let found = false;
                while (i < 3 && !found) {
                    if (k == operators[i].innerHTML) {
                        operators[i].classList.add("active");
                        found = true;
                    }
                    i++;
                }
            }
        }

        // decimal
        else if (event.key === '.') {
            update_display_decimal();
            document.querySelector('.decimal').classList.add("active");
        }
        
        // plusminus
        else if (event.key === '_') {
            update_display_plusminus();
            document.querySelector('.plusminus').classList.add("active");
        }

        // equal
        else if (event.key === '=' || event.key === "Enter") {
            update_display_equal();
            document.querySelector('.equal').classList.add("active");
        }

        // clear
        else if (event.key === 'c' || event.key === 'C') {
            update_display_clear();
            document.querySelector('.clear').classList.add("active");
        }
        // back
        else if (event.key === "Backspace") {
            update_display_back();
            document.querySelector('.back').classList.add("active");
        }
    }
});

// CSS purposes: remove darker button border when keyup
document.addEventListener('keyup', function(event) {
    // numbers
    if (!isNaN(event.key)) {
        numbers[`${event.key}`].classList.remove("active");
    }

    // operators
    else if (event.key.match(/[\+\-\*\/]/)) {
        if (event.key === '/') {
            document.getElementById("obelus").classList.remove("active");
        } else {
            let k = event.key;
            let i = 0;
            let found = false;
            while (i < 3 && !found) {
                if (k == operators[i].innerHTML) {
                    operators[i].classList.remove("active");
                    found = true;
                }
                i++;
            }
        }
    }

    // decimal
    else if (event.key === '.') {
        document.querySelector('.decimal').classList.remove("active");
    }

    // plusminus
    else if (event.key === '_') {
        document.querySelector('.plusminus').classList.remove("active");
    }

    // equal
    else if (event.key === '=' || event.key === "Enter") {
        document.querySelector('.equal').classList.remove("active");
    }

    // clear
    else if (event.key === 'c' || event.key === 'C') {
        document.querySelector('.clear').classList.remove("active");
    }
    // back
    else if (event.key === "Backspace") {
        document.querySelector('.back').classList.remove("active");
    }
});
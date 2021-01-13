function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if(b==0) {
        return false
    } else {
        return a/b;
    }
}

function operate(num1,operator,num2) {
    if(operator=='+') {
        return add(num1,num2);
    } else if(operator=='-') {
        return subtract(num1,num2);
    } else if(operator=='*') {
        return multiply(num1,num2);
    } else if(operator=='/') {
        return divide(num1,num2);
    }
}
// calculator.js
let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    currentInput += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    // Map button IDs to operator symbols
    switch (op) {
        case 'add':
            operator = '+';
            break;
        case 'subtract':
            operator = '-';
            break;
        case 'multiply':
            operator = '*';
            break;
        case 'divide':
            operator = '/';
            break;
        default:
            return;
    }
    previousInput = currentInput;
    currentInput = '';
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.id));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.id));
});

document.getElementById('equals').addEventListener('click', compute);
document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('decimal').addEventListener('click', () => appendNumber('.'));
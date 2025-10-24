const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");
const decimalButton = document.getElementById("decimal");

// Variáveis de Estado
let firstNumber = null;
let operator = null;
let waitForSecondNumber = false;
let displayValue = "0";

// --- Funções Matemáticas Básicas (add, subtract, multiply, divide) ---

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return "Erro: / 0"; // Mensagem de erro irônica
    }
    return a / b;
};
const modulus = (a, b) => a % b;

/**
 * Arredonda o resultado para evitar problemas de ponto flutuante longos.
 * (8 casas decimais é um bom padrão)
 */
function roundResult(number) {
    return Math.round(number * 100000000) / 100000000;
}

/**
 * Função principal que executa a operação (operate).
 */
function operate(op, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (op) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "%":
            return modulus(num1, num2);
        default:
            return num2; // Se não houver operador, apenas retorna o segundo número
    }
}

// --- Funções de Display e Estado ---

function updateDisplay(value = displayValue) {
    inputBox.value = value;
    // Desabilita o botão decimal se o valor atual já contiver um ponto
    decimalButton.disabled = value.includes('.');
}

/**
 * Lógica para limpar tudo (AC).
 */
function clearAll() {
    displayValue = "0";
    firstNumber = null;
    operator = null;
    waitForSecondNumber = false;
    updateDisplay();
}

/**
 * Lógica para Backspace (DEL).
 */
function deleteLast() {
    if (displayValue === "Erro: / 0") {
        clearAll();
        return;
    }
    
    // Não permite apagar se for o resultado de uma operação (apenas apaga o que está sendo digitado)
    if (waitForSecondNumber && firstNumber !== null) {
        return; 
    }

    displayValue = displayValue.slice(0, -1);
    if (displayValue === "") {
        displayValue = "0";
    }
    updateDisplay();
}

/**
 * Processa a entrada de dígitos.
 */
function inputDigit(digit) {
    if (displayValue === "Erro: / 0") {
        clearAll();
    }
    
    // Gotcha: Se um resultado está na tela, um novo dígito inicia um novo cálculo.
    if (waitForSecondNumber) {
        displayValue = (digit === "00" ? "0" : digit); // Limpa o display e começa o novo número
        waitForSecondNumber = false;
    } else {
        // Se for "00", e o display já for "0", mantém "0". Senão, anexa.
        if (digit === "00" && displayValue === "0") {
            return;
        }
        // Impede múltiplos zeros iniciais (ex: 01, 002)
        if (displayValue === "0" && digit !== ".") {
            displayValue = digit;
        } else {
            displayValue += digit;
        }
    }
    updateDisplay();
}

/**
 * Processa a entrada de ponto decimal.
 */
function inputDecimal() {
    if (displayValue === "Erro: / 0") {
        clearAll();
    }
    
    // Se o display for o resultado de um cálculo, inicia um novo número com "0."
    if (waitForSecondNumber) {
        displayValue = "0.";
        waitForSecondNumber = false;
    } 
    // Garante que só haja um ponto
    else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}


/**
 * Processa a entrada de operadores (+, -, *, /).
 */
function inputOperator(nextOperator) {
    if (displayValue === "Erro: / 0") return;

    const inputValue = parseFloat(displayValue);

    // 1. Início: Armazena o primeiro número
    if (firstNumber === null && !isNaN(inputValue)) {
        firstNumber = inputValue;
    } 
    // 2. Encadeamento: Se já tem um primeiro número e um operador, calcula o resultado
    else if (operator) {
        const result = operate(operator, firstNumber, displayValue);

        // Tratamento de Erro de Divisão por Zero
        if (result === "Erro: / 0") {
            displayValue = result;
            firstNumber = null;
            operator = null;
            waitForSecondNumber = false;
            updateDisplay();
            return;
        }
        
        // Arredonda o resultado
        firstNumber = roundResult(result);
        displayValue = firstNumber.toString();
    }

    // Gotcha: Atualiza o operador, mesmo que pressionado consecutivamente
    operator = nextOperator;
    waitForSecondNumber = true; // Sinaliza que o próximo dígito deve limpar o display
    updateDisplay();
}

/**
 * Processa o cálculo final (=).
 */
function handleEquals() {
    if (operator === null || waitForSecondNumber) {
        return; // Não faz nada se não houver operação pendente
    }

    const result = operate(operator, firstNumber, displayValue);
    
    // Tratamento de Erro de Divisão por Zero
    if (result === "Erro: / 0") {
        displayValue = result;
    } else {
        // Arredonda e exibe o resultado
        displayValue = roundResult(result).toString();
    }

    // Prepara para a próxima operação (o resultado é o novo firstNumber, mas só se for um número válido)
    firstNumber = (displayValue.includes("Erro") ? null : parseFloat(displayValue));
    operator = null;
    waitForSecondNumber = true; // Permite iniciar um novo cálculo com o próximo dígito
    updateDisplay();
}


// --- Event Listeners ---

// 1. Botões de Clique
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const value = e.target.innerText.trim();
        
        // Mapeamento dos botões para as funções de lógica
        if (!isNaN(parseFloat(value)) || value === "00") {
            inputDigit(value);
        } else if (["+", "-", "*", "/", "%"].includes(value)) {
            inputOperator(value);
        } else if (value === "=") {
            handleEquals();
        } else if (value === ".") {
            inputDecimal();
        } else if (value === "AC") {
            clearAll();
        } else if (value === "DEL") {
            deleteLast();
        }
    });
});

// 2. Suporte ao Teclado (Crédito Extra)
document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Previne que a tecla Enter submeta formulários (se houver)
    if (key === "Enter") {
        e.preventDefault();
    }

    if (!isNaN(parseFloat(key))) { // 0-9
        inputDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        inputOperator(key);
    } else if (key === "%") {
        // Módulo (o botão % está no HTML)
        inputOperator(key);
    } else if (key === "." || key === ",") {
        inputDecimal();
    } else if (key === "Enter" || key === "=") {
        handleEquals();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key.toLowerCase() === "c") { // 'c' ou 'C' para Clear
        clearAll();
    }
});

// Inicialização
updateDisplay();
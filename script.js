let numberButton = document.querySelectorAll('[data-number]')
let operationButton = document.querySelectorAll('[data-operation]')
let equalButton = document.querySelector('[data-equals]')
let deleteButton = document.querySelector('[data-delete]')
let clearButton = document.querySelector('[data-all-clear]')
let previousOperandTextElement = document.querySelector('[data-previous-operand]')
let currendOperandTextElement = document.querySelector('[data-currend-operand]')


class Calculator {
    constructor(previousOperandTextElement, currendOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement,
            this.currendOperandTextElement = currendOperandTextElement
        this.clear()
    }

    clear() {
        this.currendOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currendOperand = this.currendOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currendOperand.includes('.')) return
        this.currendOperand = this.currendOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currendOperand === '') return
        if (this.previousOperand !== '') {
            this.computer
        }
        this.operation = operation
        this.previousOperand = this.currendOperand
        this.currendOperand = ''
    }

    computer() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const currend = parseFloat(this.currendOperand)
        if (isNaN(prev) || isNaN(currend)) return
        switch (this.operation) {
            case '+':
                computation = prev + currend
                break
            case '-':
                computation = prev - currend
                break
            case '*':
                computation = prev * currend
                break
            case '/':
                computation = prev / currend
                break
            default:
                return

        }
        this.currendOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDispley() {
        this.currendOperandTextElement.innerText = this.getDisplayNumber(this.currendOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
}



let calculator = new Calculator(previousOperandTextElement, currendOperandTextElement)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDispley()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDispley()
    })
})

equalButton.addEventListener('click', button => {
    calculator.computer()
    calculator.updateDispley()
})


clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDispley()
})


deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDispley()
})





















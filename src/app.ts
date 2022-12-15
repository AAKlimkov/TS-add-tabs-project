//Validation
interface Validatable {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}

function validate(input: Validatable) {
    let isValid = true
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0
    }
    if (input.minLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.trim().length > input.minLength
    }
    if (input.maxLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.trim().length < input.maxLength
    }

    if (input.min != null && typeof input.value === 'number') {
        isValid = isValid && input.value > input.min
    }
    if (input.max != null && typeof input.value === 'number') {
        isValid = isValid && input.value < input.max
    }

    return isValid
}

// autobind decorator
function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this)
        }
    }
    return adjDescriptor
}


//ProjectInput Class
class formInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    importedNode: DocumentFragment;
    element: HTMLFormElement;
    titleElementInput: HTMLInputElement;
    descriptionElementInput: HTMLInputElement;
    peopleElementInput: HTMLInputElement;

    constructor() {
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement

        this.importedNode = document.adoptNode(this.templateEl.content)

        this.element = this.importedNode.firstElementChild as HTMLFormElement
        this.element.id = 'user-input'
        this.hostEl.append(this.element)
        this.titleElementInput = this.element.querySelector('#title')!
        this.descriptionElementInput = this.element.querySelector('#description')!
        this.peopleElementInput = this.element.querySelector('#people')!
        this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleElementInput.value
        const enteredDescription = this.titleElementInput.value
        const enteredPeople = this.peopleElementInput.value

        const titleValidation: Validatable = {
            value: enteredTitle,
            required: true,
        }
        const descriptionValidation: Validatable = {
            value: enteredTitle,
            required: true,
        }
        const peopleValidation: Validatable = {
            value: enteredTitle,
            required: true,
            min: 1
        }

        if (
            !validate(titleValidation) || !validate(descriptionValidation) || !validate(peopleValidation)
        ) {
            alert('invalid inputs')
            return
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    private clearInputs() {
        this.titleElementInput.value = ''
        this.titleElementInput.value = ''
        this.peopleElementInput.value = ''
    }

    @autobind
    private submitHandler(e: Event) {
        e.preventDefault()
        const userInput = this.gatherUserInput()
        if (Array.isArray(userInput)) {
            // const [tittle, desc, people] = userInput
            this.clearInputs()
        }
        console.log(userInput);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
}

const form = new formInput()
// console.log(form)


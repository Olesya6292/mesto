export class FormValidator {
    constructor(formElement, validationParams) {
        this._validationParams = validationParams;
        this._formElement = formElement;
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationParams.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validationParams.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationParams.inputErrorClass);
        errorElement.classList.remove(this._validationParams.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {

        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableSubmitButton(buttonElement) {
        buttonElement.classList.add(this._validationParams.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    }

    _enableSubmitButton(buttonElement) {
        buttonElement.classList.remove(this._validationParams.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    };

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationParams.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationParams.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);

                this._toggleButtonState(inputList, buttonElement, this._validationParams.inactiveButtonClass);
            });
        });
    }

    resetValidationState() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationParams.inputSelector));
        const submitButton = this._formElement.querySelector(this._validationParams.submitButtonSelector);
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState(inputList, submitButton);
    }

    enableValidation() {
        this._setEventListeners();
    }
}
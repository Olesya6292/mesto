export class FormValidator {
    constructor(formElement, validationParams) {
        this._validationParams = validationParams;
        this._formElement = formElement;
        this._inputErrorClass = validationParams.inputErrorClass;
        this._errorClass = validationParams.errorClass;
        this._inactiveButtonClass = validationParams.inactiveButtonClass;
        this._inputSelector = validationParams.inputSelector;
        this._submitButtonSelector = validationParams.submitButtonSelector;
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
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
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    }

    _enableSubmitButton(buttonElement) {
        buttonElement.classList.remove(this._inactiveButtonClass);
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
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);

                this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
            });
        });
    }

    resetValidationState() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState(inputList, submitButton);
    }

    enableValidation() {
        this._setEventListeners();
    }
}
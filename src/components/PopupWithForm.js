import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit');
        this._submitButtonText = this._submitButton.textContent;
        this._inputsList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    renderLoading(isLoading) {
        if (isLoading) {
          this._submitButton.textContent = 'Сохранение...';
        } else {
          this._submitButton.textContent = this._submitButtonText;
        }
      }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._popupForm.reset();

    }
}
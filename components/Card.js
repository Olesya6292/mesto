export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }


    _switchLikeBtn() {
        this._cardLikeBtn.classList.toggle('card__like-button_active');
    }

    _deleteCard() {
        this._cardDeleteBtn.closest('.card').remove();
    }


    _setEventListeners() {
        this._cardLikeBtn.addEventListener('click', () => {
            this._switchLikeBtn();
        });
        this._cardDeleteBtn.addEventListener('click', () => {
            this._deleteCard();
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

    }
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        this._cardLikeBtn = this._element.querySelector('.card__like-button');
        this._cardDeleteBtn = this._element.querySelector('.card__delete');
        this._setEventListeners();
        return this._element;
    }
}
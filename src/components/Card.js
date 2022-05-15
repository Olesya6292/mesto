export default class Card {
  constructor({
    data,
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick
  }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = data.userId;


    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._cardSelector = cardSelector;

  }

  isLiked() {
    return this._likes.some(user => user._id === this._userId);
  }

  _updateLikes() {
    if (this.isLiked()) {
      this._cardLikeBtn.classList.add('card__like-button_active');
    } else {
      this._cardLikeBtn.classList.remove('card__like-button_active');
    }
    this._cardLikeCount.textContent = this._likes.length;
  }


  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }


  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._cardDeleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  getId() {
    return this._id
  }

  setLikes(data) {
    this._likes = data.likes;
    this._updateLikes();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardLikeBtn = this._element.querySelector('.card__like-button');
    this._cardLikeCount = this._element.querySelector('.card__like-button-count');
    this._cardDeleteBtn = this._element.querySelector('.card__delete');
    this._setEventListeners();
    this._updateLikes();

    if (this._ownerId !== this._userId) {
      this._cardDeleteBtn.remove();
    }
    return this._element;
  }
}

import { openPopup, closePopup, closeByEsc } from "./utils.js";
import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";


const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupFormEdit = document.querySelector('.form-edit');
const popupFormAdd = document.querySelector('.form-add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const cardContainer = document.querySelector('.cards__list');


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const cardSelector = '.cards-template';

function fillForm() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}


function submitProfileForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEdit);

}

function renderCard(card) {

    const cardElement = new Card(card, cardSelector);
    cardContainer.prepend(cardElement.generateCard());
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const card = {
        name: titleInput.value,
        link: linkInput.value
    };
    renderCard(card);
    closePopup(popupAdd);
}

initialCards.forEach((card) => {
    renderCard(card);
});


popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {

        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});

const formEditValidator = new FormValidator(popupFormEdit, validationConfig);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(popupFormAdd, validationConfig);
formAddValidator.enableValidation();


editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    fillForm();
    formEditValidator.resetValidationState();

});

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    popupFormAdd.reset();
    formAddValidator.resetValidationState();

});


popupFormEdit.addEventListener('submit', submitProfileForm);
popupFormAdd.addEventListener('submit', handleCardFormSubmit);
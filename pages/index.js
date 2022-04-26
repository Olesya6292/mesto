import { openPopup, closePopup, closeByEsc } from "../components/utils.js";
import { initialCards } from "../components/initialCards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const popupList = document.querySelectorAll('.popup');
const popupEdit = '.popup_type_edit';
const popupAdd = '.popup_type_add';
const popupFormEdit = document.querySelector('.form-edit');
const popupFormAdd = document.querySelector('.form-add');
const popupTypeImage = '.popup_type_image';
const popupImage = '.popup__image';
const popupImageCaption = '.popup__caption';
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');


const userInfo = new UserInfo({ profileName: nameProfile, profileDescription: jobProfile });
const openPopupImage = new PopupWithImage(popupTypeImage, popupImage, popupImageCaption);


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function handleCardClick(name, link) {
    openPopupImage.open(name, link);
    openPopupImage.setEventListeners();
}

/*function fillForm() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}


function submitProfileForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEdit);

}*/



/*function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const card = {
        name: titleInput.value,
        link: linkInput.value
    };
    renderCard(card);
    closePopup(popupAdd);
}


popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {

        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});*/

const formEditValidator = new FormValidator(popupFormEdit, validationConfig);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(popupFormAdd, validationConfig);
formAddValidator.enableValidation();


/*editButton.addEventListener('click', () => {
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
function createCard(data) {
    const card = new Card(data, '.cards-template', handleCardClick);
    const cardElement = card.createCard();
    return cardElement;
}

const cardListSection = new Section({
        data: initialCards,
        renderer: (item) => {
            cardListSection.addItem(createCard(item));
        }
    },
    '.cards__list'
);*/



const cardListSection = new Section({
        data: initialCards,
        renderer: (item) => {
            const card = new Card(item, '.cards-template', handleCardClick);
            const cardElement = card.generateCard();
            cardListSection.addItem(cardElement);
        }
    },
    '.cards__list'
);
cardListSection.renderItems();


const popupEditForm = new PopupWithForm(popupEdit,
    (data) => {
        userInfo.setUserInfo(data);
        popupEditForm.close();
    }
);

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
    const userDescription = userInfo.getUserInfo();
    formEditValidator.resetValidationState();
    nameInput.value = userDescription.name;
    jobInput.value = userDescription.job;
    popupEditForm.open();

});


/*----Заполнение формы карточки----*/
const popupAddForm = new PopupWithForm(
    popupAdd,
    (data) => {
        const cardElement = {
            name: data.name,
            link: data.link
        };
        cardListSection.addItem(cardElement);
        popupAddForm.close();
    }
);

popupAddForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupAddForm.open();

    formAddValidator.resetValidationState();
});
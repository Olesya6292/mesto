import "./index.css";
import { initialCards } from "../components/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
    popupEdit,
    popupAdd,
    popupTypeImage,
    nameProfile,
    jobProfile,
    popupFormEdit,
    popupFormAdd,
    nameInput,
    jobInput,
    titleInput,
    linkInput,
    editButton,
    addButton,
    validationConfig
} from '../components/constants.js';


const formEditValidator = new FormValidator(popupFormEdit, validationConfig);

const formAddValidator = new FormValidator(popupFormAdd, validationConfig);

const openPopupImage = new PopupWithImage(popupTypeImage);

const userInfo = new UserInfo({ nameSelector: nameProfile, descriptionSelector: jobProfile });

const handleCardClick = (name, link) => {
    openPopupImage.open(name, link);
};

const createCard = (data) => {
    const card = new Card(data, '.cards-template', handleCardClick);
    return card.generateCard();
};

const cardListSection = new Section({
        items: initialCards,
        renderer: (data) => {
            const card = createCard(data);
            cardListSection.addItem(card);
        },
    },
    '.cards__list');

const popupEditForm = new PopupWithForm(popupEdit, {
    handleFormSubmit: () => {
        userInfo.setUserInfo({ name: nameInput.value, description: jobInput.value });
    },
});

const openPopupEditForm = () => {
    const userData = userInfo.getUserInfo();
    popupEditForm.open();
    nameInput.value = userData.name;
    jobInput.value = userData.description;
    formEditValidator.resetValidationState();

};

const popupAddForm = new PopupWithForm(popupAdd, {
    handleFormSubmit: () => {
        const newCard = createCard({
            name: titleInput.value,
            link: linkInput.value
        });
        cardListSection.addItem(newCard);
    },
});

cardListSection.renderItems();

editButton.addEventListener('click', () => {
    openPopupEditForm();
    formEditValidator.disableSubmitButton();
});

addButton.addEventListener('click', () => {
    popupAddForm.open();
    formAddValidator.resetValidationState();
});

formEditValidator.enableValidation();
formAddValidator.enableValidation();

openPopupImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
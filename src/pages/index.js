import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
    initialCards,
    popupEdit,
    popupAdd,
    popupTypeImage,
    nameProfile,
    jobProfile,
    cardsTemplate,
    cardsContainer,
    popupFormEdit,
    popupFormAdd,
    nameInput,
    jobInput,
    titleInput,
    linkInput,
    editButton,
    addButton,
    validationConfig,
    formAvatar,
    editAvatar,
    profilePhoto,
    linkInputAvatar,
    popupAvatar,
    popupDelete
} from '../utils/constants.js';


const formAvatarValidator = new FormValidator(formAvatar, validationConfig);

const formEditValidator = new FormValidator(popupFormEdit, validationConfig);

const formAddValidator = new FormValidator(popupFormAdd, validationConfig);

const openPopupImage = new PopupWithImage(popupTypeImage);

const userInfo = new UserInfo({ nameSelector: nameProfile, descriptionSelector: jobProfile });

const handleCardClick = (name, link) => {
    openPopupImage.open(name, link);
};

const popupAvatarForm = new PopupWithForm(popupAvatar, {
    handleFormSubmit: () => {
        profilePhoto.src = linkInputAvatar.value;
    },
});

const popupDeleteCard = new PopupWithForm(popupDelete, {
    handleFormSubmit: () => {},
});

const createCard = (data) => {
    const card = new Card(data, cardsTemplate, handleCardClick);
    return card.generateCard();
};

const cardListSection = new Section({
        items: initialCards,
        renderer: (data) => {
            const card = createCard(data);
            cardListSection.addItem(card);
        },
    },
    cardsContainer);

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

editAvatar.addEventListener('click', () => {
    popupAvatarForm.open();
    formAvatarValidator.resetValidationState();
});

formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();

openPopupImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupDeleteCard.setEventListeners();
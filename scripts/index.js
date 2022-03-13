"use strict";

const initialCards = [{
        name: 'Карачаевск',
        link: './images/karachaevsk.jpg'
    },
    {
        name: 'Гора Эльбрус',
        link: './images/elbrus.jpg'
    },
    {
        name: 'Домбай',
        link: './images/dombai.jpg'
    },
    {
        name: 'Камчатка',
        link: './images/kamchatka.jpg'
    },
    {
        name: 'Северная Осетия',
        link: './images/osetia.jpg'
    },
    {
        name: 'Сочи',
        link: './images/sochi.jpg'
    }
];

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupFormEdit = document.querySelector('.form-edit');
const popupFormAdd = document.querySelector('.form-add');
const closeButtonEdit = document.querySelector('.popup__close_type_edit');
const closeButtonAdd = document.querySelector('.popup__close_type_add');
const closeButtonImg = document.querySelector('.popup__close_type_image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const cardContainer = document.querySelector('.cards__list');



function fillForm() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function popupOpened(popup) {
    popup.classList.add('popup_opened');
}

function popupClosed(popup) {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    popupClosed(popupEdit);

}

const createCard = (data) => {
    const cardTemplate = document.querySelector('.cards-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardDeleteBtn = cardElement.querySelector('.card__delete');

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    cardLikeBtn.addEventListener('click', switchLikeBtn);
    cardDeleteBtn.addEventListener('click', deleteCard);
    togglePopupImg(cardImage);

    return cardElement;
};


function switchLikeBtn(evt) {
    evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

const togglePopupImg = (cardImage) => {
    cardImage.addEventListener('click', () => {

        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        popupImageCaption.textContent = cardImage.alt;

        popupOpened(popupTypeImage);
    });
};

const renderCard = (data, cardContainer) => {

    const cardElement = createCard(data);
    cardContainer.prepend(cardElement);
};

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    renderCard({
        name: titleInput.value,
        link: linkInput.value
    }, cardContainer);

    titleInput.value = '';
    linkInput.value = '';

    popupClosed(popupAdd);
}

initialCards.forEach((card) => {
    renderCard({
        name: card.name,
        link: card.link
    }, cardContainer);
});

editButton.addEventListener('click', function() {
    popupOpened(popupEdit),
        fillForm();
});
closeButtonEdit.addEventListener('click', function() {
    popupClosed(popupEdit);
});

addButton.addEventListener('click', function() {
    popupOpened(popupAdd);
});
closeButtonAdd.addEventListener('click', function() {
    popupClosed(popupAdd);
});

closeButtonImg.addEventListener('click', function() {
    popupClosed(popupTypeImage);
});

popupFormEdit.addEventListener('submit', formSubmitHandler);
popupFormAdd.addEventListener('submit', handleCardFormSubmit);
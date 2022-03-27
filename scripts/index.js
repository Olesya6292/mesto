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

const openPopupBtns = document.querySelectorAll('.popup__open');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupFormEdit = document.querySelector('.form-edit');
const popupFormAdd = document.querySelector('.form-add');
const submitBtnFormEdit = document.querySelector('.popup__submit_type_edit');
const submitBtnFormAdd = document.querySelector('.popup__submit_type_add');
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function submitProfileForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEdit);

}

function resetForm() {
    const formList = document.querySelectorAll('.popup__form');
    formList.forEach((element) => {
        element.reset();
    });
}

function resetInputError() {
    const errorList = document.querySelectorAll('.popup__input-error');
    const inputList = document.querySelectorAll('.popup__input');

    inputList.forEach((element) => {
        element.classList.remove('popup__input_type_error');
    });

    errorList.forEach((element) => {
        element.classList.remove('popup__input-error_active');
        element.textContent = '';
    });
}

const createCard = (data) => {
    const cardTemplate = document.querySelector('.cards-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');


    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    cardContainer.addEventListener('click', switchLikeBtn);

    cardContainer.addEventListener('click', deleteCard);

    cardImage.addEventListener('click', () => {

        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        popupImageCaption.textContent = cardImage.alt;

        openPopup(popupTypeImage);
    });

    return cardElement;
};

function switchLikeBtn(evt) {
    if (evt.target.classList.contains('card__like-button'))
        evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(evt) {
    if (evt.target.classList.contains('card__delete'))
        evt.target.closest('.card').remove();
}

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

    popupFormAdd.reset();

    closePopup(popupAdd);
}

initialCards.forEach((card) => {
    renderCard({
        name: card.name,
        link: card.link
    }, cardContainer);
});


popupList.forEach(function(popup) {
    popup.addEventListener('click', closeOverlay);
});

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    fillForm();
    resetInputError();
    submitBtnFormEdit.classList.remove('popup__submit_inactive');
    submitBtnFormEdit.removeAttribute('disabled');
});

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    resetForm();
    resetInputError();
    submitBtnFormAdd.classList.add('popup__submit_inactive');
    submitBtnFormAdd.setAttribute('disabled', 'disabled');
});

closePopupBtns.forEach(function(button) {
    const popup = button.closest('.popup');
    button.addEventListener('click', function(evt) { closePopup(popup); });
    resetForm();
    resetInputError();
});


popupFormEdit.addEventListener('submit', submitProfileForm);
popupFormAdd.addEventListener('submit', handleCardFormSubmit);
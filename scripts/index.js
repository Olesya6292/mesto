"use strict";

const container = document.querySelector('.profile__container');
const popup = document.querySelector('.popup');
const editButton = container.querySelector('.profile__edit-button');
const popupForm = popup.querySelector('.popup__name');
const closeButton = popup.querySelector('.popup__close');



let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_profession');
let nameProfile = container.querySelector('.profile__title');
let jobProfile = container.querySelector('.profile__subtitle');


function popupOpened() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function popupClosed() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    popupClosed();

}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);
popupForm.addEventListener('submit', formSubmitHandler);
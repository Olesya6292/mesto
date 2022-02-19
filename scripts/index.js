"use strict";

const container = document.querySelector('.profile__container');
const popup = document.querySelector('.popup');
const editButton = container.querySelector('.profile__edit-button');
const popupForm = popup.querySelector('.popup__form');
const closeButton = popup.querySelector('.popup__close');



let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_profession');
let nameProfile = container.querySelector('.profile__title');
let jobProfile = container.querySelector('.profile__subtitle');


function popupOpened() {
    popup.classList.add('popup_opened');
    document.body.classList.add('page_disabled');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function popupClosed() {
    popup.classList.remove('popup_opened');
    document.body.classList.remove('page_disabled');
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
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupImageSelector, popupCaptionSelector) {
        super(popupSelector);
        this._popupImage = document.querySelector(popupImageSelector);
        this._popupCaption = document.querySelector(popupCaptionSelector);
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}
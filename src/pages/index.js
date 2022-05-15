import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import {
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
  editButton,
  addButton,
  validationConfig,
  formAvatar,
  editAvatar,
  profilePhoto,
  popupAvatar,
  popupDelete
} from '../utils/constants.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '3169eb65-c58d-4215-b028-e01f344467b3',
    'Content-Type': 'application/json'
  }
});

const formAvatarValidator = new FormValidator(formAvatar, validationConfig);

const formEditValidator = new FormValidator(popupFormEdit, validationConfig);

const formAddValidator = new FormValidator(popupFormAdd, validationConfig);

const openPopupImage = new PopupWithImage(popupTypeImage);

const popupDeleteCard = new PopupWithConfirmation(popupDelete);

const userInfo = new UserInfo({
  nameSelector: nameProfile,
  descriptionSelector: jobProfile,
  profilePhotoSelector: profilePhoto
});

api.getAllData()
  .then(([dataCards, dataUser]) => {

    userInfo.setUserInfo({
      name: dataUser.name,
      description: dataUser.about,
      avatar: dataUser.avatar,
      _id: dataUser._id
    });

    cardListSection.renderItems(dataCards);
  })
  .catch(err => console.log(err));


const createCard = (cardData) => {
  const card = new Card({
    data: {
      ...cardData,
      userId: userInfo._id
    },
    handleCardClick: (name, link) => {
      openPopupImage.open(name, link);
    },
    handleLikeClick: (card) => {
      if (card.isLiked()) {
        api.deleteLike(card.getId())
          .then((data) => {
            card.setLikes(data)
          })
          .catch(err => console.log(err));
      } else {
        api.putLike(card.getId())
          .then((data) => {
            card.setLikes(data)
          })
          .catch(err => console.log(err));
      }
    },
    handleDeleteIconClick: (card) => {
      popupDeleteCard.open();
      popupDeleteCard.setHandleFormSubmitAction(() => {
        api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            popupDeleteCard.close();
          })
          .catch(err => console.log(err));
      });
    },
  }, cardsTemplate);

  return card.generateCard();
};

const cardListSection = new Section({
    renderer: (data) => {
      const card = createCard(data);
      cardListSection.addItem(card);
    },
  },
  cardsContainer);

const popupEditForm = new PopupWithForm(popupEdit, {
  handleFormSubmit: (data) => {
    popupEditForm.renderLoading(true),
      api.setUserInfo({
        name: data.name,
        about: data.profession
      })
      .then((infoData) => {
        userInfo.setUserInfo({
          name: infoData.name,
          description: infoData.about,
          avatar: infoData.avatar
        })
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupEditForm.renderLoading(false);
      });
  }
});
const popupAvatarForm = new PopupWithForm(popupAvatar, {
  handleFormSubmit: (data) => {
    popupAvatarForm.renderLoading(true),
      api.setUserAvatar({
        avatar: data["link-avatar"]
      })
      .then((data) => {
        console.log(data)
        userInfo.setUserInfo({
          name: data.name,
          description: data.about,
          avatar: data.avatar
        })
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupAvatarForm.renderLoading(false);
      });
  },
});


const popupAddForm = new PopupWithForm(popupAdd, {
   handleFormSubmit: (data) => {
    popupAddForm.renderLoading(true),
      api.addCard({
        name: data.title,
        link: data.link
      })
      .then(data => {
        
        const newCard = createCard(data);
        cardListSection.addItem(newCard);
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupAddForm.renderLoading(false)
      })
  },
});

const openPopupEditForm = () => {
  const userData = userInfo.getUserInfo();
  popupEditForm.open();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  formEditValidator.resetValidationState();
};

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

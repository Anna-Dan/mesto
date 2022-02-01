import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import {
  validationSettings,
  popupEditElement,
  formEditElement,
  nameInput,
  jobInput,
  popupAddElement,
  formAddElement,
  popupZoomElement,
  addButton,
  editButton,
  templateCard,
  elementsList,
  profileName,
  profileDescription,
  formAvatarElement,
  profileAvatar,
  popupConfirmElement,
  popupAvatarElement,
  avatarButton,
} from "../utils/constants.js";

//Валидация форм
const editFormValidator = new FormValidator(
  validationSettings,
  formEditElement
);

const addFormValidator = new FormValidator(validationSettings, formAddElement);

const avatarFormValidator = new FormValidator(
  validationSettings,
  formAvatarElement
);
//Включить валидацию всех форм
[editFormValidator, addFormValidator, avatarFormValidator].forEach(
  (formValidator) => formValidator.enableValidation()
);

//Запросы к серверу
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "9d2d2564-ddb0-415d-88e2-d41c280f2f09",
    "Content-Type": "application/json",
  },
});
//Загрузка инфо для отрисовки карточек и юзер-инфо
let userId = "";
Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then((res) => {
    userId = res[1]._id;
    cardList.renderItems(res[0]);
    userInfo.setUserInfo({
      name: res[1].name,
      about: res[1].about,
    });
    userInfo.setAvatar(res[1].avatar);
  })
  .catch((err) => {
    console.log(err);
  });

// Отрисовка карточек
const cardList = new Section(
  {
    renderItems: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  elementsList
);

// Профиль пользователя
const userInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
  avatarSelector: profileAvatar,
});

// Функция создания карточки
function createCard(item) {
  const cardElement = new Card(item, userId, templateCard, {
    handleOpenPopup: () => {
      popupZoom.open(item.link, item.name);
    },
    deleteCard: (card, cardId) => {
      popupConfirm.submitCallbackDelete((evt) => {
        evt.preventDefault();
        api
          .deleteCard(cardId)
          .then(() => {
            card.remove();
            card = null;
            popupConfirm.close();
          })
          .catch((err) => {
            console.error(err);
          });
      });
      popupConfirm.open();
    },
    handleLikeClick: (cardId) => {
      if (cardElement.isLiked) {
        api
          .deleteLike(cardId)
          .then((data) => {
            cardElement.removeLike();
            cardElement.likesCounter(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(cardId)
          .then((data) => {
            cardElement.setLike();
            cardElement.likesCounter(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  return cardElement.generateCard();
}

//Confirm popup
const popupConfirm = new PopupWithConfirm(popupConfirmElement);

//Zoom popup
const popupZoom = new PopupWithImage(popupZoomElement);

//Edit popup
const popupEditProfile = new PopupWithForm(popupEditElement, {
  submitHandler: (inputValues) => {
    popupEditProfile.renderLoading(true);
    api
      .updateUserInfo(inputValues)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          about: data.about,
        });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  },
});
//Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editFormValidator.resetError();
  popupEditProfile.open();
});

//Avatar popup
const popupAvatar = new PopupWithForm(popupAvatarElement, {
  submitHandler: (inputValues) => {
    popupAvatar.renderLoading(true);
    api
      .updateUserAvatar(inputValues)
      .then((res) => {
        userInfo.setAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  },
});
//Открыть попап редактирования аватара
avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetError();
  avatarFormValidator.deactivateSubmit();
  popupAvatar.open();
});

// Add popup
const popupAddCard = new PopupWithForm(popupAddElement, {
  submitHandler: (inputValues) => {
    popupAddCard.renderLoading(true);
    api
      .addCard(inputValues)
      .then((data) => {
        cardList.addNewItem(createCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  },
});
// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  addFormValidator.resetError();
  addFormValidator.deactivateSubmit();
  popupAddCard.open();
});

//Установить слушатели на все попапы
[popupEditProfile, popupAddCard, popupZoom, popupConfirm, popupAvatar].forEach(
  (popup) => popup.setEventListeners()
);

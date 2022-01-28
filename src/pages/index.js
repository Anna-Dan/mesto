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
  initialCards,
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
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, formAddElement);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationSettings,
  formAvatarElement
);
avatarFormValidator.enableValidation();

let userId = "";

// запросы к серверу
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "9d2d2564-ddb0-415d-88e2-d41c280f2f09",
    "Content-Type": "application/json",
  },
});

// Профиль пользователя
const userInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
  avatarSelector: profileAvatar,
});

//первоначальные данные с сервера (bio и карточки)
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((res) => {
  userId = res[1]._id;
  cardList.renderItems(res[0]);
  userInfo.setUserInfo(res[1]);
})
.catch((err) => {
  console.log(err);
});

// Функция создания карточки
function createCard(item) {
  const cardElement = new Card(item, userId, templateCard, {
    handleOpenPopup: () => {
      popupZoom.open(item.link, item.name);
    },
    deleteCard: (card, cardId) => {
      popupConfirm.newSubmitCallback((evt) => {
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
            cardElement.unsetLike();
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

// Отрисовка карточек
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  elementsList
);

//cardList.renderItems();

//Confirm popup
const popupConfirm = new PopupWithConfirm(popupConfirmElement);

//Zoom popup
const popupZoom = new PopupWithImage(popupZoomElement);

// // Функция открытия Zoom popup
// function handleOpenPopup(link, name) {
//   popupZoom.open(name, link);
// }

//Edit popup
const popupEditProfile = new PopupWithForm(popupEditElement, {
  submitHandler: (inputValues) => {
    api
      .updateUserInfo(inputValues)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
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
// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editFormValidator.resetError();
  popupEditProfile.open();
});

//AVATAR
//Форма редактирования аватара
const popupAvatar = new PopupWithForm(popupAvatarElement, {
  handleFormSubmit: (inputValues) => {
    api
      .updateUserAvatar(inputValues)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
        });
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

// открытие попапа редактирования аватара
avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetError();
  avatarFormValidator.deactivateSubmit();
  popupAvatar.open();
});

// Add popup
const popupAddCard = new PopupWithForm(popupAddElement, {
  submitHandler: (inputValues) => {
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

//Устанавливаем слушатели на все попапы
[popupEditProfile, popupAddCard, popupZoom, popupConfirm, popupAvatar].forEach(
  (popup) => popup.setEventListeners()
);

import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
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
} from "../utils/constants.js";

// Функция создания карточки
function createCard(item) {
  const cardElement = new Card(
    item.name,
    item.link,
    templateCard,
    handleOpenPopup
  );
  const card = cardElement.generateCard();
  return card;
}

// Отрисовка карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  elementsList
);

cardList.renderItems();

// Профиль пользователя
const userInfo = new UserInfo({
  nameSelector: profileName,
  descriptionSelector: profileDescription,
});

//Zoom popup
const popupZoom = new PopupWithImage(popupZoomElement);

// Функция открытия Zoom popup
function handleOpenPopup(link, name) {
  popupZoom.open(name, link);
}

//Валидация форм
const editFormValidator = new FormValidator(
  validationSettings,
  formEditElement
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, formAddElement);
addFormValidator.enableValidation();

//Edit popup
const popupEditProfile = new PopupWithForm(popupEditElement, {
  submitHandler: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEditProfile.close();
  },
});
// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editFormValidator.resetError();
  popupEditProfile.open();
});

// Add popup
const popupAddCard = new PopupWithForm(popupAddElement, {
  submitHandler: (inputValues) => {
    cardList.addItem(createCard(inputValues));
    popupAddCard.close();
  },
});
// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  addFormValidator.resetError();
  addFormValidator.deactivateSubmit();
  popupAddCard.open();
});

//Устанавливаем слушатели на все попапы
[popupEditProfile, popupAddCard, popupZoom].forEach((popup) =>
  popup.setEventListeners()
);

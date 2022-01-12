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
} from "../components/constants.js";

// Функция создания карточки
function createCard(item) {
  const cardElement = new Card(
    item.name,
    item.link,
    ".template-card",
    handleOpenPopup
  );
  const card = cardElement.generateCard();
  cardList.addItem(card);
}

// Отрисовка карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
    },
  },
  ".elements__list"
);

cardList.renderer();

// Профиль пользователя
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
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
const popupEdit = new PopupWithForm(popupEditElement, {
  submitHandler: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEdit.close();
  },
});
// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editFormValidator.resetError();
  popupEdit.open();
});

// Add popup
const popupAdd = new PopupWithForm(popupAddElement, {
  submitHandler: (inputValues) => {
    createCard(inputValues);
    popupAdd.close();
  },
});
// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  addFormValidator.resetError();
  addFormValidator.deactivateSubmit();
  popupAdd.open();
});

//Устанавливаем слушатели на все попапы
[popupEdit, popupAdd, popupZoom].forEach((popup) => popup.setEventListeners());

import { Card } from "./Card.js";
import { initialCards } from "./constants.js";
import {
  errorStateReset,
  validationSettings,
  toggleButtonState,
} from "./validation.js";

// All popups
const popupList = document.querySelectorAll(".popup");
// Edit popup
const popupEditElement = document.querySelector(".popup_type_edit");

const formEditElement = document.querySelector(".popup__form_type_edit");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
// Add popup
const popupAddElement = document.querySelector(".popup_type_add");
const saveAddButton = popupAddElement.querySelector(".popup__submit");
const formAddElement = document.querySelector(".popup__form_type_add");
const placeInput = formAddElement.querySelector(".popup__input_type_place");
const urlInput = formAddElement.querySelector(".popup__input_type_url");
// Zoom popup
const popupZoomElement = document.querySelector(".popup_type_zoom");
const figureImage = popupZoomElement.querySelector(".popup__figure-image");
const figcaption = popupZoomElement.querySelector(".popup__figcaption");

// Профиль
const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// Карточка
const cardTemplate = document.querySelector(".template-card").content;
const elementsList = document.querySelector(".elements__list");

// Функция открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}
// Функция закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

// Функция закрытия попапа кликом по оверлей и кнопке закрытия
popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close-button") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(popup);
    }
  });
});

// Функция закрытия попапа по esc
function closeByEsc(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

//  EDIT POPUP
// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditElement);
  errorStateReset(popupEditElement, validationSettings);
});

// Обработчик сохранения данных пользователя
function editSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditElement);
}
// Сохранить данные пользователя
formEditElement.addEventListener("submit", editSubmitHandler);

// ф-я для передачи ссылки и подписи при открытии фуллскрин попапа

function handleOpenImage(name, link) {
  // ПЕРЕМЕННЫЕ ФУЛЛСКРИН ПОПАПА
  figureImage.src = link;
  figureImage.alt = name;
  figcaption.textContent = name;
  openPopup(popupZoomElement);
}

// ADD POPUP
// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  openPopup(popupAddElement);
  placeInput.value = "";
  urlInput.value = "";
  errorStateReset(popupAddElement, validationSettings);
  // Отключаем кнопку сабмита после добавления карточки
  saveAddButton.classList.add("popup__submit_inactive");
  saveAddButton.disabled = true;
});

//ИНИЦИАЛИЗАЦИЯ КАРТОЧЕК
function insertCard(card) {
  const photoCard = createCard(card);
  elementsList.prepend(photoCard);
}

// тут создаете карточку и возвращаете ее
function createCard(item) {
  // const cards = new Card(item.name, item.link, cardTemplate, handleOpenImage);

  const cards = new Card(item.name, item.link, ".template-card", handleOpenImage);
  const photo = cards.generateCard();
  return photo;
}

//Вывести карточки на страницу
initialCards.forEach(function (item) {
  insertCard(item);
});

// Обработчик сохранения карточки места
function addSubmitHandler(evt) {
  evt.preventDefault();
  const userCardElement = {
    name: placeInput.value,
    link: urlInput.value,
  };
  insertCard(userCardElement);
  placeInput.value = "";
  urlInput.value = "";

  closePopup(popupAddElement);
}
// Сохранить карточку места
formAddElement.addEventListener("submit", addSubmitHandler);

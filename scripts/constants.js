//Массив карточек
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Объект настроек для валидации
export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// All popups
export const popupList = document.querySelectorAll(".popup");
// Edit popup
export const popupEditElement = document.querySelector(".popup_type_edit");
export const formEditElement = document.querySelector(".popup__form_type_edit");
export const nameInput = formEditElement.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
// Add popup
export const popupAddElement = document.querySelector(".popup_type_add");
export const formAddElement = document.querySelector(".popup__form_type_add");
export const placeInput = formAddElement.querySelector(
  ".popup__input_type_place"
);
export const urlInput = formAddElement.querySelector(".popup__input_type_url");
// Zoom popup
export const popupZoomElement = document.querySelector(".popup_type_zoom");
export const figureImage = popupZoomElement.querySelector(
  ".popup__figure-image"
);
export const figcaption = popupZoomElement.querySelector(".popup__figcaption");
// Профиль
export const profile = document.querySelector(".profile");
export const addButton = profile.querySelector(".profile__add-button");
export const editButton = profile.querySelector(".profile__edit-button");
export const profileName = profile.querySelector(".profile__name");
export const profileDescription = profile.querySelector(
  ".profile__description"
);
// Карточка
export const elementsList = document.querySelector(".elements__list");

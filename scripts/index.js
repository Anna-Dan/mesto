import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  initialCards,
  validationSettings,
  popupList,
  popupEditElement,
  formEditElement,
  nameInput,
  jobInput,
  popupAddElement,
  formAddElement,
  placeInput,
  urlInput,
  popupZoomElement,
  figureImage,
  figcaption,
  addButton,
  editButton,
  profileName,
  profileDescription,
  elementsList,
} from "./constants.js";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Функция создания карточки
function createCard(item) {
  const cardElement = new Card(
    item.name,
    item.link,
    ".template-card",
    handleOpenPopup
  );
  const card = cardElement.generateCard();
  return card;
}
//Функция добавления карточки
function addCard(item) {
  elementsList.prepend(createCard(item));
}

// Первоначальное отображение 6 карточек
initialCards.forEach(function (item) {
  addCard(item);
});

//Валидация форм
const editFormValidator = new FormValidator(
  validationSettings,
  formEditElement
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, formAddElement);
addFormValidator.enableValidation();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
// Функция заполнения Zoom попапа
function handleOpenPopup(name, link) {
  figureImage.src = link;
  figureImage.alt = name;
  figcaption.textContent = name;
  openPopup(popupZoomElement);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  EDIT POPUP
// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  editFormValidator.activateSubmit();
  editFormValidator.inputList.forEach((inputElement) =>
    editFormValidator.hideInputError(inputElement)
  );
  openPopup(popupEditElement);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADD POPUP
// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  openPopup(popupAddElement);
  placeInput.value = "";
  urlInput.value = "";
  addFormValidator.inputList.forEach((inputElement) =>
    addFormValidator.hideInputError(inputElement)
  );
  // Отключаем кнопку сабмита после добавления карточки
  addFormValidator.deactivateSubmit();
});
// Обработчик сохранения карточки места
function addSubmitHandler(evt) {
  evt.preventDefault();
  const userCardElement = {
    name: placeInput.value,
    link: urlInput.value,
  };
  addCard(userCardElement);
  placeInput.value = "";
  urlInput.value = "";
  closePopup(popupAddElement);
}
// Сохранить карточку места
formAddElement.addEventListener("submit", addSubmitHandler);

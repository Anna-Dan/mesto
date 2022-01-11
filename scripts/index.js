import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
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
// function createCard(item) {
//   const cardElement = new Card(
//     item.name,
//     item.link,
//     ".template-card",
//     handleOpenPopup
//   );
//   const card = cardElement.generateCard();
//   return card;
// }
//Функция добавления карточки
// function addCard(item) {
//   elementsList.prepend(createCard(item));
// }

// Первоначальное отображение 6 карточек
// const initialRendering = initialCards.map((item) => {
//   return createCard(item);
// });
// elementsList.append(...initialRendering);

// // Отрисовка карточек
// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const cardElement = new Card(
//         item.name,
//         item.link,
//         ".template-card",
//         handleOpenPopup
//       );
//       const card = cardElement.generateCard();

//       cardList.addItem(card);
//     },
//   },
//   ".elements__list"
// );

// cardList.renderer();

//Валидация форм
const editFormValidator = new FormValidator(
  validationSettings,
  formEditElement
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, formAddElement);
addFormValidator.enableValidation();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Функция открытие попапа
// function openPopup(popupElement) {
//   popupElement.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEsc);
// }
// // Функция закрытие попапа
// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
// }
// // Функция закрытия попапа кликом по оверлей и кнопке закрытия
// popupList.forEach((popup) => {
//   popup.addEventListener("click", (evt) => {
//     if (
//       evt.target.classList.contains("popup__close-button") ||
//       evt.target.classList.contains("popup")
//     ) {
//       closePopup(popup);
//     }
//   });
// });
// // Функция закрытия попапа по esc
// function closeByEsc(evt) {
//   if (evt.key === "Escape") {
//     const popupOpened = document.querySelector(".popup_opened");
//     closePopup(popupOpened);
//   }
// }
// // Функция заполнения Zoom попапа
// function handleOpenPopup(name, link) {
//   figureImage.src = link;
//   figureImage.alt = name;
//   figcaption.textContent = name;
//   openPopup(popupZoomElement);
//}
// Функция заполнения инпутов
// function addContent(input, source) {
//   input.value = source.textContent;
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  EDIT POPUP
// Открыть попап редактирования профиля
// editButton.addEventListener("click", () => {
//   addContent(nameInput, profileName);
//   addContent(jobInput, profileDescription);
//   editFormValidator.resetError();
//   openPopup(popupEditElement);
// });
// // Обработчик сохранения данных пользователя
// function editSubmitHandler(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
//   closePopup(popupEditElement);
// }
// // Сохранить данные пользователя
// formEditElement.addEventListener("submit", editSubmitHandler);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADD POPUP
// // Открыть попап добавления карточки места
// addButton.addEventListener("click", () => {
//   formAddElement.reset();
//   addFormValidator.resetError();
//   addFormValidator.deactivateSubmit();
//   openPopup(popupAddElement);
// });
// // Обработчик сохранения карточки места
// function addSubmitHandler(evt) {
//   evt.preventDefault();
//   const userCardElement = {
//     name: placeInput.value,
//     link: urlInput.value,
//   };
//   cardList.addItem(userCardElement);
//   closePopup(popupAddElement);
// }
// // Сохранить карточку места
// formAddElement.addEventListener("submit", addSubmitHandler);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

const popupZoom = new PopupWithImage(popupZoomElement);

const popupEdit = new PopupWithForm(popupEditElement, (evt) => {
  evt.preventDefault();
  // информация из импутов
  const inputValues = popupEdit._getInputValues();
  const data = {
    name: inputValues["name"],
    job: inputValues["description"],
  };
  userInfo.setUserInfo(data);
  popupEdit.close();
});

function handleOpenPopup(link, name) {
  popupZoom.open(name, link);
}

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
// Отрисовка карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements__list"
);
//Первоначальное отображение 6 карточек
cardList.renderer();

const popupAdd = new PopupWithForm(popupAddElement, (evt, data) => {
  evt.preventDefault();

  const userCardElement = {
    name: data["place"],
    link: data["url"],
  };

  cardList.renderer(userCardElement);

  popupAdd.close();
});

[popupEdit, popupAdd, popupZoom].forEach((popup) => popup.setEventListeners());

// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editFormValidator.resetError();
  popupEdit.open();
});

// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  addFormValidator.resetError();
  addFormValidator.deactivateSubmit();
  popupAdd.open();
});

// Edit popup
const popupEditElement = document.querySelector(".popup_type_edit");
const closeEditButton = popupEditElement.querySelector(".popup__close-button");
const saveEditButton = popupEditElement.querySelector(".popup__save-button");
const formEditElement = document.querySelector(".popup__form_type_edit");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
// Add popup
const popupAddElement = document.querySelector(".popup_type_add");
const closeAddButton = popupAddElement.querySelector(".popup__close-button");
const saveAddButton = popupAddElement.querySelector(".popup__save-button");
const formAddElement = document.querySelector(".popup__form_type_add");
const placeInput = formAddElement.querySelector(".popup__input_type_place");
const urlInput = formAddElement.querySelector(".popup__input_type_url");
// Профиль
const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

// Функция открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}
// Функция закрытие попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

//  Edit popup
// Заполнение данными со страницы при открытии формы редактирования профиля
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  openPopup(popupEditElement);
});

// Закрыть попап редактирования профиля
closeEditButton.addEventListener("click", () => {
  closePopup(popupEditElement);
});

// Обработчик сохранения данных пользователя
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditElement);
}
// Сохранить данные пользователя
formEditElement.addEventListener("submit", formSubmitHandler);

// Add popup
// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  openPopup(popupAddElement);
});

// Закрыть попап добавления карточки места
closeAddButton.addEventListener("click", () => {
  closePopup(popupAddElement);
});

// Обработчик сохранения карточки места
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const userCardElement = createElementDomNode({
    name: placeInput.value,
    link: urlInput.value,
  });
  elementsList.prepend(userCardElement);
  placeInput.value = '';
  urlInput.value = '';
  closePopup(popupAddElement);
}

// Сохранить карточку места
formAddElement.addEventListener("submit", formAddSubmitHandler);

// Первоначальное отображение 6 карточек
const initialCards = [
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

const elementsList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector(".template-card");

const createElementDomNode = (item) => {
  const cardElement = cardTemplate.content
    .querySelector(".elements__card")
    .cloneNode(true);

  cardElement.querySelector(".elements__image").src = item.link;
  cardElement.querySelector(".elements__title").textContent = item.name;

  return cardElement;
};

const initialRendering = initialCards.map((item) => {
  return createElementDomNode(item);
});

elementsList.append(...initialRendering);

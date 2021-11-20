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
// Zoom popup
const popupZoomElement = document.querySelector(".popup_type_zoom");
const closeZoomButton = popupZoomElement.querySelector(".popup__close-button");
const figureImage = popupZoomElement.querySelector(".popup__figure-image");
const figcaption = popupZoomElement.querySelector(".popup__figcaption");

// Профиль
const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// Карточка
const elementsList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector(".template-card");

// Функция открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}
// Функция закрытие попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}
// Функция заполнения Zoom попапа
function ZoomPopup(evt) {
  figureImage.src = evt.target.src;
  figureImage.alt = evt.target.alt;
  figcaption.textContent = evt.target.alt;
  openPopup(popupZoomElement);
}
// Функция лайка
function likeCard(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

// Функция создания карточки
const createElementDomNode = (item) => {
  const cardElement = cardTemplate.content
    .querySelector(".elements__card")
    .cloneNode(true);
  // Переменные карточки
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  const likeButton = cardElement.querySelector(".elements__like-button");
  const deleteButton = cardElement.querySelector(".elements__delete-button");
  // Заполнение карточки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  // Zoom
  cardImage.addEventListener("click", ZoomPopup);
  // Лайк
  likeButton.addEventListener("click", likeCard);
  // Удаление
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
};

// Закрыть zoom попап
closeZoomButton.addEventListener("click", () => {
  closePopup(popupZoomElement);
});

// Первоначальное отображение 6 карточек
const initialRendering = initialCards.map((item) => {
  return createElementDomNode(item);
});

elementsList.append(...initialRendering);

//  EDIT POPUP
// Открыть попап редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditElement);
});
// Закрыть попап редактирования профиля
closeEditButton.addEventListener("click", () => {
  closePopup(popupEditElement);
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

// ADD POPUP
// Открыть попап добавления карточки места
addButton.addEventListener("click", () => {
  openPopup(popupAddElement);
});
// Закрыть попап добавления карточки места
closeAddButton.addEventListener("click", () => {
  closePopup(popupAddElement);
});
// Обработчик сохранения карточки места
function addSubmitHandler(evt) {
  evt.preventDefault();
  const userCardElement = createElementDomNode({
    name: placeInput.value,
    link: urlInput.value,
  });
  elementsList.prepend(userCardElement);
  placeInput.value = "";
  urlInput.value = "";
  closePopup(popupAddElement);
}
// Сохранить карточку места
formAddElement.addEventListener("submit", addSubmitHandler);

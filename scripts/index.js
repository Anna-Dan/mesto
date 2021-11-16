const popupElement = document.querySelector(".popup");
const closeButton = popupElement.querySelector(".popup__close-button");
const saveButton = popupElement.querySelector(".popup__save-button");
const profile = document.querySelector("profile");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
// Открытие попапа
function openPopup() {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}
// Закрытие попапа
function closePopup() {
  popupElement.classList.remove("popup_opened");
}
// Обработчик сохранения данных пользователя
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

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

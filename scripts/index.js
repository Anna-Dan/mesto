const popupElement = document.querySelector(".popup");
const closeButton = popupElement.querySelector(".popup__close-button");
const saveButton = popupElement.querySelector(".popup__save-button");
const profile = document.querySelector("profile");
const editButton = document.querySelector(".profile__edit-button");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_description");
let formElement = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

function openPopup() {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup() {
  popupElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

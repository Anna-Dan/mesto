export class Card {
  constructor(name, link, templateSelector, handleOpenPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }
  //Копируем разметку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }
  //Создаем карточку
  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._cardElement.querySelector(".elements__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._cardElement.querySelector(".elements__title").textContent =
      this._name;

    return this._cardElement;
  }
  //Удаляем карточку
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  //Лайк
  _likeCard() {
    this._cardElement
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
  }
  //Устанавливаем слушатели
  _setEventListeners() {
    this._cardElement
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._cardElement
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleOpenPopup(this._name, this._link);
      });
  }
}

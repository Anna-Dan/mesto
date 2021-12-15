export class Card {
  constructor(name, link, templateSelector, handleOpenImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleOpenImage;
  }
  //добавить разметку
  _getTemplate() {
    const cardItem = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    //this._cardTemplate = this._templateSelector;
    //this._cardItem = this._cardTemplate.cloneNode(true);

    //return this._cardItem;
    return cardItem;
  }

  // //добавить карточки на страницу
  // generateCard() {
  //   this._element = this._getTemplate();
  //   this._setEventListeners();
  //   this._elementImage = this._cardItem.querySelector(".elements__image");
  //   this._elementImage.src = this._link;
  //   this._elementImage.alt = this._name;
  //   this._element.querySelector(".elements__title").textContent = this._name;
  //   return this._element;
  // }

   //добавить карточки на страницу
  generateCard() {
    this._cardItem = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._cardItem.querySelector(".elements__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._cardItem.querySelector(".elements__title").textContent = this._name;

    return this._cardItem;
  }

  //УДАЛИТЬ КАРТОЧКУ
  _deleteCard(evt) {
    const cardToDelete = evt.target.closest(".elements__card");
    cardToDelete.remove();
  }

  // ФУНКЦИЯ ДЛЯ ЛАЙКА
  _likeCard(evt) {
    evt.target.classList.toggle("elements__like-button_active");
  }

  //слушатели
  _setEventListeners() {
    this._cardItem
      .querySelector(".elements__delete-button")
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
    this._cardItem
      .querySelector(".elements__like-button")
      .addEventListener("click", (evt) => {
        this._likeCard(evt);
      });
    this._cardItem
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleOpenImage(this._name, this._link);
      });
  }
}

export class Card {
  constructor(
    data,
    userId,
    templateSelector,
    { handleOpenPopup, deleteCard, handleLikeClick }
  ) {
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
    this._deleteCard = deleteCard;
    this._handleLikeClick = handleLikeClick;
  }
  //Копируем разметку
  _getTemplate() {
    const cardItem = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardItem;
  }
  //Создаем карточку
  generateCard() {
    this._cardElement = this._getTemplate();
    if (this._userId != this._cardOwnerId) {
      this._cardElement.querySelector(".elements__delete-button").remove();
    }
    this._cardElement.querySelector(".elements__like-count").textContent =
      this._likes.length;
    this._setEventListeners();
    this._elementImage = this._cardElement.querySelector(".elements__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._cardElement.querySelector(".elements__title").textContent =
      this._name;

    return this._cardElement;
  }
  // //Удаляем карточку
  // _deleteCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }
  //постановка лайка
  setLike() {
    this._cardElement
      .querySelector(".elements__like-button")
      .classList.add("elements__like-button_active");
    this.isLiked = true;
  }

  //снятие лайка
  unsetLike() {
    this._cardElement
      .querySelector(".elements__like-button")
      .classList.remove("elements__like-button_active");
    this.isLiked = false;
  }

  //проверка автора лайка
  _checkUserLike() {
    return this._likes.some((item) => item._id === this._currentUserId);
  }

  //проверка состояние лайка
  _toggleLikeState() {
    if (this._checkUserLike()) {
      this.setLike();
    } else {
      this.unsetLike();
    }
  }

  //подсчет лайков
  likesCounter(data) {
    this._cardElement.querySelector(".elements__like-count").textContent =
      data.length;
  }

  //Устанавливаем слушатели
  _setEventListeners() {
    this._cardElement
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._deleteCard(this._cardElement, this._cardId);
    console.log(this._cardElement);
    console.log(this._cardId);
      });
    this._cardElement
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this._cardId);
      });
    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleOpenPopup(this._link, this._name);
      });
  }
}

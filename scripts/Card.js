




// // const cardImage = cardElement.querySelector(".elements__image");
// // const cardTitle = cardElement.querySelector(".elements__title");
// // const likeButton = cardElement.querySelector(".elements__like-button");
// // const deleteButton = cardElement.querySelector(".elements__delete-button");
// const elementsList = document.querySelector(".elements__list");

// export class Card {
//   constructor(title, image, cardSelector) {
//     this._title = title;
//     this._image = image;
//     this._cardSelector = cardSelector;
//   }
//   // Функция создания карточки
//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".elements__card")
//       .cloneNode(true);

//     return cardElement;
//   }
//   _handleOpenPopup() {
//     popupFullPhotoPhoto.src = this._galleryPhoto.src;
//     popupFullPhotoPhoto.alt = this._galleryFigCaption.textContent;
//     popupFullPhotoFigcaption.textContent = this._galleryFigCaption.textContent;
//   }
//   _setEventListeners() {
//     // Удаление
//     // this._element.querySelector('.elements__delete-button').addEventListener("click", () =>
//     //   this.cardElement.remove()
//     // );
//     // Лайк
//     // this.__element.querySelector('.elements__like-button').addEventListener("click", (evt) =>
//     //   evt.target.classList.toggle("elements__like-button_active")
//     // );
//     // Zoom
//     // this._cardImage.addEventListener("click", () => {
//     //   ZoomPopup;
//     // });
//   }






//   generateCard() {
//     this._element = this._getTemplate();
//     this._setEventListeners();

//     // this._cardImage = this.cardElement.querySelector(".elements__image");
//     // this._cardTitle = this.cardElement.querySelector(".elements__title");
//     // this._likeButton = this.cardElement.querySelector(".elements__like-button");
//     // this._deleteButton = this.cardElement.querySelector(
//     //   ".elements__delete-button"
//     // );
//     // Заполнение карточки
//     this._element.querySelector('.elements__image').src = this._link;
//     this._element.querySelector('.elements__image').alt = this._name;
//     this._element.querySelector('.elements__title').textContent = this._name;



//     return this._element;
//   }
// }

// function addPhoto(item) {
//   const cardTemplate = new Card(item.name, item.link, ".template-card");
//   const card = cardTemplate.generateCard();
//   elementsList.prepend(card);
// }

// initialCards.forEach((item) => {
//   addPhoto(item);
// });
// 6 карточек
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

//Массив с начальными карточками
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}


export const elementsList = document.querySelector(".elements__list");

const popupFull = document.querySelector(".popup_type_zoom");
// ПЕРЕМЕННЫЕ ФУЛЛСКРИН ПОПАПА
const popupFullImage = document.querySelector(".popup__figure-image");
const popupFullFigcaption = document.querySelector(".popup__figcaption");
const cardTemplate = document.querySelector(".template-card").content;

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;

    this._templateSelector = templateSelector;
  }
  //добавить разметку
  _getTemplate() {

   // const cardItem = document.querySelector(this._templateSelector).content.querySelector(".elements__card")
     //    .cloneNode(true);


     this._cardTemplate = this._templateSelector;
     this._cardItem = this._cardTemplate.cloneNode(true);

    return this._cardItem;
  }

  //добавить карточки на страницу
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._elementImage = this._cardItem.querySelector(".elements__image");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._element.querySelector(".elements__title").textContent = this._name;

    return this._element;
  }



  //УДАЛИТЬ КАРТОЧКУ
  _deletePhoto(evt) {
    const cardToDelete = evt.target.closest(".elements__card");
    cardToDelete.remove();
  }

  // ФУНКЦИЯ ДЛЯ ЛАЙКА
  _likePhoto(evt) {
    evt.target.classList.toggle("elements__like-button_active");
  }

  // ф-я для передачи ссылки и подписи при открытии фуллскрин попапа
_handlerFullFormSubmit(evt) {
    popupFullImage.src = evt.target.src;
    popupFullImage.alt = evt.target.alt;
    popupFullFigcaption.textContent = evt.target.alt;
    // Закрываем попап
    openPopup(popupFull);
  }



  //слушатели
  _setEventListeners() {
    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", (evt) => {
        this._deletePhoto(evt);
      });
    this._element
      .querySelector(".elements__like-button")
      .addEventListener("click", (evt) => {
        this._likePhoto(evt);
      });
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", (evt) => {
        this._handlerFullFormSubmit(evt);
      });
  }
}



function insertCard(card) {
  const cardsh= new Card(card.name, card.link, cardTemplate);

  const photoCard = cardsh.generateCard();
  elementsList.prepend(photoCard);
}

//Вывести карточки на страницу
initialCards.forEach(function (item) {
  insertCard(item);
});









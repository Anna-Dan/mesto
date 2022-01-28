import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  //колбэк для удаления карточки
  newSubmitCallback(action) {
    this._handlerSubmitForm = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(evt);
    });
  }
}

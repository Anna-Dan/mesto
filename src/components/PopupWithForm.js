import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  renderLoading(isLoading = true) {
    if (isLoading) {
      this._saveButton.textContent = "Сохранение...";
    } else {
      this._saveButton.textContent = "Сохранить";
    }
  }
}

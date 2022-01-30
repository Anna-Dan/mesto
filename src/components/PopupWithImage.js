import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figureImage = document.querySelector(".popup__figure-image");
    this._figcaption = document.querySelector(".popup__figcaption");
  }

  open(link, name) {
    super.open();
    this._figureImage.src = link;
    this._figureImage.alt = name;
    this._figcaption.textContent = name;
  }
}

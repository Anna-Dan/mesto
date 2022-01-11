import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figureImage = document.querySelector(".popup__figure-image");
    this._figcaption = document.querySelector(".popup__figcaption");
  }

  open({ name, link }) {
    super.open();
    figureImage.src = link;
    figureImage.alt = name;
    figcaption.textContent = name;
  }
}

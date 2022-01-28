export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  //добавление новых карточек
  addNewItem(element) {
    this._container.prepend(element);
  }

  //добавление карточек при отрисовке
  addItem(element) {
    this._container.append(element);
  }
}

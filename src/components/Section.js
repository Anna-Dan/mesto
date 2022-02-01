export class Section {
  constructor({ renderItems }, containerSelector) {
    this._renderer = renderItems;
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

  //добавление карточек при загрузке
  addItem(element) {
    this._container.append(element);
  }
}

export class FormValidator {
  constructor(config, form) {
    this._inputElement = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  // Показать ошибку
  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  // Скрыть ошибку
  hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  // Проверяем валидность инпутов
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this.hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }
  // Проверяем есть ли невалидный инпут для переключения кнопки
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Активируем кнопку
  activateSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  //Деактивируем кнопку
  deactivateSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  // Переключение кнопки
  _toggleButtonState() {
    this.inputList = Array.from(
      this._form.querySelectorAll(this._inputElement)
    );
    const notValid = this._hasInvalidInput(this.inputList);
    if (notValid) {
      this.deactivateSubmit();
    } else {
      this.activateSubmit();
    }
  }

  // Устанавливаем слушатели на все инпуты
  _setEventListeners = () => {
    this.inputList = this._form.querySelectorAll(this._inputElement);
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    //Отменяем стандартную обработку
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //Проверяем кнопку
    this._toggleButtonState();
    //Живая валидация
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        //Проверряем кнопку
        this._toggleButtonState();
      });
    });
  };

  //Запускаем валидацию
  enableValidation() {
    this._setEventListeners();
  }
}

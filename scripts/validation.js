export class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
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
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  // Проверяем валидность инпутов
  _checkInputValidity (inputElement)  {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  // Устанавливаем слушатели на все инпуты
  _setEventListeners = () => {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._toggleButtonState(
      inputList,
      //_buttonElement,
      //this._inactiveButtonClass
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          inputElement,
         // this._inputErrorClass,
         // this._errorClass
        );

        this._toggleButtonState(
          inputList,
          //_buttonElement,
         // this._inactiveButtonClass
        );
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

  // Проверяем есть ли невалидный инпут для переключения кнопки
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };


  // Переключение кнопки

  // _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  //   const isFormValid = this._hasInvalidInput(inputList);
  //   buttonElement.classList.toggle(inactiveButtonClass, isFormValid);
  //   buttonElement.disabled = isFormValid;
  // };
  _toggleButtonState(inputList) {
    const isFormValid = this._hasInvalidInput(inputList);
    if (isFormValid) this.deactivateButton()
    else this.activateButton();
  }

  activateButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  deactivateButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }


}


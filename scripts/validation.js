// Заполняем юзер-инфо перед валидацией, что бы сабмит была активной при первом открытии попап
initEditForm();

// Показать ошибку
const showInputError = (inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = inputElement
    .closest("form")
    .querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

// Скрыть ошибку
const hideInputError = (inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = inputElement
    .closest("form")
    .querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

// Проверяем валидность инпутов
const checkInputValidity = (inputElement, { inputErrorClass, errorClass }) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, { inputErrorClass, errorClass });
  } else {
    hideInputError(inputElement, { inputErrorClass, errorClass });
  }
};

// Проверяем есть ли невалидный инпут для переключения кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Переключение кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  buttonElement.classList.toggle(inactiveButtonClass, hasInvalidInput(inputList));
  buttonElement.disabled = hasInvalidInput(inputList);
};
// Устанавливаем слушатели на все инпуты
const setEventListeners = (
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, { inputErrorClass, errorClass });

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Устанавливаем слушатели на все формы
const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationSettings);
  });
};

// Запускаем валидацию
enableValidation(validationSettings);

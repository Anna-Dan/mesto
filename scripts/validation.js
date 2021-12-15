const formEditElement = document.querySelector(".popup__form_type_edit");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// Объект настроек для валидации
 export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
// Функция заполнения юзер-инфо перед валидацией
 const initEditForm = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};


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

// Очищаем инпуты от ошибок
export function errorStateReset(popupElement, config) {
  const { inputErrorClass, errorClass } = config;
  const inputElements = popupElement.querySelectorAll(".popup__input");
  inputElements.forEach((inputElement) =>
    hideInputError(inputElement, { inputErrorClass, errorClass })
  );
}

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
export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  buttonElement.classList.toggle(
    inactiveButtonClass,
    hasInvalidInput(inputList)
  );
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





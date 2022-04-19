// Массив объектов для валидации
const validationObj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__input-error_active'
};

// Показываем ошибки
const showInputError = (formElement, inputElement, errorMessage, validationObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим все ошибки
    inputElement.classList.add(validationObj.inputErrorClass); // Показываем ошибки
    errorElement.textContent = errorMessage; // Показываем сообщение ошибки
    errorElement.classList.add(validationObj.errorClass); // Отмечаем поле с ошибкой 
};

// Скрываем ошибки
const hideInputError = (formElement, inputElement, validationObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим все ошибки
    inputElement.classList.remove(validationObj.inputErrorClass); // Скрываем ошибки
    errorElement.classList.remove(validationObj.errorClass); // Снимаем отметку с поля 
    errorElement.textContent = ''; // Удаляем сообщение об ошибке
};

// Првоеряем валидацию и скрываем или показываем ошибки
const checkInputValidity = (formElement, inputElement, validationObj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationObj); // Если валидация не прошла показываем ошибки
    } else {
        hideInputError(formElement, inputElement, validationObj);// Если валидация прошла скрываем ошибки
    }
};

// Прикрепляем обработчики к полям формы и кнопке отправить
const setEventListeners = (formElement, validationObj) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector)); // Создаем коллекцию из полей ввода
    const buttonElement = formElement.querySelector(validationObj.submitButtonSelector); // Находим кнопку сохранить
    // Проверяем формы  
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationObj); // проверяем валидацию
            toggleButtonState(inputList, buttonElement, validationObj); // Включаем/выключаем кнопку сохранить/создать
        });
    });
};

// Прикрепляем обработчики на элементы форм
const enableValidation = (validationObj) => {
    const formList = Array.from(document.querySelectorAll(validationObj.formSelector)); // Создаем коллекцию из элементов форм
    // Находим все кнопки submit и прикрепляем к ним обработчики 
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault(); // Отменяем стандартную отправку формы
        });
        setEventListeners(formElement, validationObj);
    });
};
enableValidation(validationObj); // Включаем валидацию обьектов

// Првоеряем валидицию при вводе информации
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Включаем или выключаем кнопку сохранить/создать при вводе информации 
function toggleButtonState(inputList, buttonElement, validationObj) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationObj.inactiveButtonClass); // Выключаем кнопку если поля заполнены не верно
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationObj.inactiveButtonClass); // Включаем кнопку если поля заполнены верно
        buttonElement.disabled = false;
    }
};
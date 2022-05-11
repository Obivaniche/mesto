// Показываем ошибки
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим все ошибки
    inputElement.classList.add(inputErrorClass); // Показываем ошибки
    errorElement.textContent = errorMessage; // Показываем сообщение ошибки
    errorElement.classList.add(errorClass); // Отмечаем поле с ошибкой 
};

// Скрываем ошибки
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим все ошибки
    inputElement.classList.remove(inputErrorClass); // Скрываем ошибки
    errorElement.classList.remove(errorClass); // Снимаем отметку с поля 
    errorElement.textContent = ''; // Удаляем сообщение об ошибке
};

// Првоеряем валидацию и скрываем или показываем ошибки
const checkInputValidity = (formElement, inputElement, rest) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest); // Если валидация не прошла показываем ошибки
    } else {
        hideInputError(formElement, inputElement, rest);// Если валидация прошла скрываем ошибки
    }
};

// Прикрепляем обработчики к полям формы и кнопке отправить
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); // Создаем коллекцию из полей ввода
    const buttonElement = formElement.querySelector(submitButtonSelector); // Находим кнопку сохранить
    // Проверяем формы  
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, rest); // проверяем валидацию
            toggleButtonState(inputList, buttonElement, inactiveButtonClass); // Включаем/выключаем кнопку сохранить/создать
        });
    });
};

// Прикрепляем обработчики на элементы форм
const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector)); // Создаем коллекцию из элементов форм
    // Находим все кнопки submit и прикрепляем к ним обработчики 
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault(); // Отменяем стандартную отправку формы
        });
        setEventListeners(formElement, rest);
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
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass); // Выключаем кнопку если поля заполнены не верно
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass); // Включаем кнопку если поля заполнены верно
        buttonElement.disabled = false;
    }
};

// Массив объектов для валидации
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__input-error_active'
});
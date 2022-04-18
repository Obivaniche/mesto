// Показываем ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим все ошибки
    inputElement.classList.add('form__input-error'); // Показываем ошибки
    errorElement.textContent = errorMessage; // Показываем сообщение ошибки
    errorElement.classList.add('form__input-error_active'); // Отмечаем поле с ошибкой 
};

// Скрываем ошибки
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим все ошибки
    inputElement.classList.remove('form__input-error'); // Скрываем ошибки
    errorElement.classList.remove('form__input-error_active'); // Снимаем отметку с поля 
    errorElement.textContent = ''; // Удаляем сообщение об ошибке
};

// Првоеряем валидацию и скрываем или показываем ошибки
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage); // Если валидация не прошла показываем ошибки
    } else {
        hideInputError(formElement, inputElement);// Если валидация прошла скрываем ошибки
    }
};

// Прикрепляем обработчики к полям формы и кнопке отправить
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input')); // Создаем коллекцию из полей ввода
    const buttonElement = formElement.querySelector('.form__save-button'); // Находим кнопку сохранить
    toggleButtonState(inputList, buttonElement); // Проверяем валидацию и включаем/выключаем кнопку сохранить/создать
    // Проверяем формы  
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement); // проверяем валидацию
            toggleButtonState(inputList, buttonElement); // Включаем/выключаем кнопку сохранить/создать
        });
    });
};

// Прикрепляем обработчики на элементы форм
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form')); // Создаем коллекцию из элементов форм
    // Находим все кнопки submit и прикрепляем к ним обработчики 
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault(); // Отменяем стандартную отправку формы
        });
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__set')); // Создаем коллекцию из полей форм
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet); // Находим все поля форм и прикрепляем к ним обработчики 
        });
    });
};
enableValidation(); // Включаем валидацию обьектов

// Првоеряем валидицию при вводе информации
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Включаем или выключаем кнопку сохранить/создать при вводе информации 
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__save-button_disabled'); // Выключаем кнопку если поля заполнены не верно
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('form__save-button_disabled'); // Включаем кнопку если поля заполнены верно
        buttonElement.disabled = false;
    }
};
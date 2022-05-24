// Создаем и экспортируем класс
export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        // Создаем коллекцию из полей ввода
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        // Находим кнопку сохранить
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    // Показываем ошибки
    _showInputError(inputElement, errorMessage) {
        // Находим все ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        // Показываем ошибки
        inputElement.classList.add(this._config.inputErrorClass);
        // Показываем сообщение ошибки
        errorElement.textContent = errorMessage;
        // Отмечаем поле с ошибкой 
        errorElement.classList.add(this._config.errorClass);
    };

    // Скрываем ошибки
    _hideInputError(inputElement) {
        // Находим все ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        // Скрываем ошибки
        inputElement.classList.remove(this._config.inputErrorClass);
        // Снимаем отметку с поля
        errorElement.classList.remove(this._config.errorClass);
        // Удаляем сообщение об ошибке
        errorElement.textContent = '';
    };

    // Проверяем валидацию и скрываем или показываем ошибки
    _checkInputValidity(inputElement) {
        !inputElement.validity.valid
            // Если валидация не прошла показываем ошибки
            ? this._showInputError(inputElement, inputElement.validationMessage)
            // Если валидация прошла скрываем ошибки
            : this._hideInputError(inputElement);
    };

    // Проверяем валидицию при вводе информации
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // Включаем или выключаем кнопку сохранить/создать при вводе информации 
    _toggleButtonState() {
        this._hasInvalidInput()
            // Выключаем кнопку если поля заполнены не верно
            ? this._buttonElement.classList.add(this._config.inactiveButtonClass)
                ? this._buttonElement.disabled = true
                // Включаем кнопку если поля заполнены верно
                : this._buttonElement.classList.remove(this._config.inactiveButtonClass)
            : this._buttonElement.disabled = false;
    };

    // Прикрепляем обработчики к полям формы и кнопке отправить
    _setEventListeners() {
        this._toggleButtonState();
        // Проверяем формы  
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                // проверяем валидацию
                this._checkInputValidity(inputElement);
                // Включаем/выключаем кнопку сохранить/создать
                this._toggleButtonState(inputElement);
            });
        });
        // Отключаем стандартную отправку формы
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    };

    // Прикрепляем обработчики на элементы форм
    enableValidation() {
        this._setEventListeners();
    };
};
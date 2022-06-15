// Импортирем класс Popup для наследования
import Popup from './Popup.js';
// Создаем класс через наследование
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupSelector.querySelector('.form');
        this._inputList = this._formElement.querySelectorAll('.form__input');
        this._submitButton = this._formElement.querySelector('.form__submit-button');
        this._submitButtonText = this._submitButton.textContent;
    };
    // Уведомление о загрузке
    loading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    };
    // Собираем данные полей форм
    _getInputValues() {
        // Создаем пустой обьект
        this._formValues = {};
        // Перебираем поля формы и добавляем их 
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        // Возвращаем поля наружу
        return this._formValues;
    };
    // Вешаем слушатели на элементы формы
    setEventListeners() {
        // Перезаписываем слушатели из класса Popup
        super.setEventListeners();
        // Вешаем слушатель на кнопку сабмита
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            // Закрываем форму после нажатия сабмита
            this.close();
        });
    };
    // Закрываем попап
    close() {
        // Перезаписывем закрытие
        super.close();
    };
};
// Импортирем класс Popup для наследования
import Popup from './Popup.js';
// Создаем класс через наследование
export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._confirmButton = this._popupSelector.querySelector('.submit-confirm');
        this._handleSubmit = handleSubmit
    };
    // Сабмит
    submit(newSubmit) {
        this._handleSubmit = newSubmit;
    };
    // Слушатель сабмита
    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    };
};
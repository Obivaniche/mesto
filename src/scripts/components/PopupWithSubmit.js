// Импортирем класс Popup для наследования
import Popup from './Popup.js';
// Создаем класс через наследование
export default class PopupWithSubmit extends Popup {
    constructor(popup) {
        super(popup);
        this._confirmButton = this._popup.querySelector('.submit-confirm');
    };
    // Сабмит
    setSubmit(newSubmit) {
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
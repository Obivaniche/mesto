// Создаем и экпортируем класс для открытия и закрытия попапа
export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    };
    // Открываем
    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.classList.add('popup_opened');
    };
    // Закрываем
    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.classList.remove('popup_opened');
    };
    // Закрываем по ескейпу
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    };
    // Вешаем слушатели на клик по крестику и вне попапа для его закрытия
    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            };
        });
    };
};
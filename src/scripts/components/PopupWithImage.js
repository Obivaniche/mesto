// Импортирем класс Popup для наследования
import Popup from './Popup.js';
// Создаем класс через наследование
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = document.querySelector('.popup__img');
        this._popupDiscripton = document.querySelector('.popup__discripton');
    };
    // Открываем попап заполняя данные картнки
    open(data) {
        // Данные картинки
        this._popupImage.alt = data.name;
        this._popupImage.src = data.link;
        this._popupDiscripton.textContent = data.name;
        // Перезаписывем открытие
        super.open();
    };
};
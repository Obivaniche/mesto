// Импортируем необходимые элементы
import { popupImgTitle, popupImgLink, popupImg } from '/scripts/utils.js';
import { openPopup } from '/scripts/utils.js';

// Создаем класс карточки
export default class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._cardSelector = cardSelector;
    };

    // Копируем разметку
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        // Возвращаем разметку
        return cardElement;
    };

    // Создаем карточку
    generateCard() {
        // Запишем разметку в приватное поле _element
        this._element = this._getTemplate();
        // Картинка и ее данные
        this._cardImg = this._element.querySelector('.card__img');
        this._cardImg.src = this._link;
        this._cardImg.alt = this._title;
        // Заголовок карточки и его данные
        this._cardTitle = this._element.querySelector('.card__title');
        this._cardTitle.textContent = this._title;
        // Кнопки карточки
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete-button');
        // Слушатели карточки
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
    };

    // Вешаем слушатели на кнопки и картинку + открываем картинку
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeClick();
        });
        // Слушатель кнопки удалить
        this._deleteButton.addEventListener('click', () => {
            this._deleteClick();
        });
        // Слушатель кнопки открыть картинку
        this._cardImg.addEventListener("click", () => {
            popupImgTitle.textContent = this._title;
            popupImgLink.src = this._link;
            popupImgLink.alt = this._alt;
            openPopup(popupImg);
        });
    };

    // Ставим лайк
    _likeClick() {
        this._likeButton.classList.toggle('card__like-button_active');
    };
    // Удаляем карточку
    _deleteClick() {
        this._element.remove();
        this._element = null;
    };
};
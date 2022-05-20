// Импортируем необходимые элементы
import { popupImgTitle, popupImgLink, popupImg, openPopup } from './index.js';

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
            .querySelector('#card-template')
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    };

    generateCard() {
        // Запишем разметку в приватное поле _element
        this._element = this._getTemplate();
        // Картинка и ее данные
        this._cardImg = this._element.querySelector('.card__img');
        this._cardImg.src = this._link;
        console.log('Получили ссылку ' + this._cardImg.src);
        this._cardImg.alt = this._title;
        console.log('Получили альт ' + this._cardImg.alt);
        // Заголовок карточки и его данные
        this._cardTitle = this._element.querySelector('.card__title');
        this._cardTitle.textContent = this._title;
        console.log('Получили заголовок ' + this._cardTitle.textContent);
        // Кнопки карточки
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete-button');
        // Слушатели карточки
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
    };

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeClick();
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteClick();
        });

        this._cardImg.addEventListener("click", () => {
            popupImgTitle.textContent = this._name;
            popupImgLink.src = this._link;
            popupImgLink.alt = this._name;
            openPopup(popupImg);
        });
    };

    _likeClick() {
        this._likeButton.classList.toggle('card__like-button_active');
    };

    _deleteClick() {
        this._deleteButton.closest('.card').remove();
    };
};
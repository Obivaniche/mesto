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
        // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        // Вешаем слушатели на кнопки
        this._setEventListeners();

        // Находим кнопку Like в карточке
        this._likeButton = this._element.querySelector('.card__like-button');
        // Находим кнопку Delete
        this._deleteButton = this._element.querySelector('.card__delete-button');

        // Находим заголовок
        const cardTitle = this._element.querySelector('.card__title');
        // Находим картинку
        const cardImg = this._element.querySelector('.card__img');

        // Передаем информацию для картинки
        cardTitle.textContent = this._title;
        cardImg.src = this._link;
        cardImg.alt = this._alt;

        // Возвращаем готовую карточку
        return this._element;
    };

    // Создаем слушатели для кнопок и картинки
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeButtonClick();
        });
        this._deleteButton.addEventListener('click', () => {
            this._deleteButtonClick();
        });
        this.cardImg.addEventListener('click', () => {
            this._openImg();
        });
    };

    // Ставим лайк
    _likeButtonClick() {
        this._likeButton.classList.toggle('card__like-button_active');
    };

    // Удаляем карточку
    _deleteButtonClick() {
        this._deleteButton.closest('.card').remove();
    };

    // Открываем картинку
    _openImg() {
        // Подставляем значения полей
        popupImgTitle.textContent = this._title;
        popupImgLink.src = this._link;
        popupImgLink.alt = this._alt;
        // Открываем картинку
        openPopup(popupImg);
    };
};
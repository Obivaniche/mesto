// Создаем класс карточки
export default class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._cardImg.alt = this._name;
        // Заголовок карточки и его данные
        this._cardTitle = this._element.querySelector('.card__title');
        this._cardTitle.textContent = this._name;
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
            this._handleLikeClick();
        });
        // Слушатель кнопки удалить
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick();
        });
        // Слушатель кнопки открыть картинку
        this._cardImg.addEventListener("click", () => {
            this._handleCardClick();
        });
    };

    // Ставим лайк
    _handleLikeClick() {
        this._likeButton.classList.toggle('card__like-button_active');
    };
    // Удаляем карточку
    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    };
};
// Создаем класс карточки
export default class Card {
    constructor({ data, handleLikeClick, handleDeleteClick, handleCardClick, userId }, cardSelector) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._like = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleCardClick = handleCardClick;
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
    // Овнер лайк
    isLiked() {
        return this._like.some(item => item._id === this._userId);
    };
    // Ставим лайк
    _enableLike() {
        this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
    };
    //  Удаляем лайк
    _disableLike() {
        this._element.querySelector('.card__like-button').classList.remove('card__like-button_active');
    };
    // Отражаем лайки в счетчике
    setLikes(newLike) {
        // Новый лайк
        this._like = newLike;
        // Отображаем новый лайк в счетчике
        this._likeCounter.textContent = this._like.length;
        // Прибавляем или удаляем лайки
        if (this.isLiked()) {
            this._enableLike();
        } else {
            this._disableLike();
        }
    };
    // Откатываем лайки
    removeLike() {
        this._likeCounter.textContent = this._like.length;
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
        this._likeCounter = this._element.querySelector('.card__like-counter');
        // Удаление карточки пользователем
        if (this._ownerId !== this._userId) {
            this._deleteButton.remove();
        }
        // Слушатели карточки
        this.setLikes(this._like);
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

    // Удаляем карточку
    deleteCard() {
        this._element.remove();
        this._element = null;
    };
};
// Создаем класс Апишечки
export default class Api {
    constructor({
        url,
        headers
    }) {
        this._url = url;
        this._headers = headers;
    };
    // Проверяем результат запроса
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    };
    // Получаем данные пользователя
    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse);
    };
    // Редактируем данные пользователя
    editUserInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
        })
            .then(this._checkResponse);
    };
    // Получаем карточки по умолчанию
    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse);
    };
    // Добавляем карточки
    addCard(data) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse);
    };
    // Удаляем карточки
    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    };
    // Ставим лайк
    like(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkResponse);
    };
    // Убираем лайк
    dislike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    };
    // Редактируем аватар
    editAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse);
    };
};
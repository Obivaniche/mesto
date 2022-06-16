// Создаем класс UserInfo
export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    };
    // Подставляем данные пользователя
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            about: this._about.textContent,
        };
        // Возвращаем заполненные данные
        return userInfo;
    };
    // Принимаем и подставляем введенные данные
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
    };
};
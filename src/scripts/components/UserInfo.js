// Создаем класс UserInfo
export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    };
    // Подставляем данные пользователя
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent
        };
        // Возвращаем заполненные данные
        return userInfo;
    };
    // Принимаем и подставляем введенные данные
    setUserInfo({ name, job }) {
        this._name.textContent = name;
        this._job.textContent = job;
    };
};
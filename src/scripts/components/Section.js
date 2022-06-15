// Создаем класс Section
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };
    // Заполняем карточки
    renderItems(items) {
        items.reverse().forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        });
    };
    // Добавляем карточки в дом
    addItem(element) {
        this._container.prepend(element);
    };
};
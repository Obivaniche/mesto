// Создаем класс Section
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };
    // Создаем карточки
    renderItems() {
        // Перебираем массив заполняя данные
        this._items.forEach((item) => {
            // Отрисовываем карточки
            this._renderer(item);
        });
    };
    // Добалвяем карточки в дом
    addItem(element) {
        // заполняем карточки от начала к концу
        this._container.append(element);
    };
};
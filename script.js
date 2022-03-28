//  Находим кнопки в DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');

// Находим окно попапа в DOM
let popup = document.querySelector('.popup');

// Обработчик открытия формы кнопки редактировать профиль
function openPopup() {
    popup.classList.add('popup_opened');
}

// Обработчик закрытия формы кнопки закрыть
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчики к кнопкам открыть, закрыть и нравится
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name-input');
let jobInput = formElement.querySelector('.popup__job-input');

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

    // Получаем значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.value 
    let jobValue = jobInput.value 

    // Выбираем элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job'); 

    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameValue
    profileJob.textContent = jobValue
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
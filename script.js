//  Находим кнопки в DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.form__save-button');

// Находим окно попапа в DOM
let popup = document.querySelector('.popup');

// Прикрепляем обработчики к кнопкам открыть закрыть
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');

// Выбираем элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job'); 

// Обработчик открытия формы через кнопку редактировать профиль и вставка значений из profileName и profileJob в поля формы nameInput и jobInfo
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Обработчик закрытия формы кнопки закрыть
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    // Эта строчка отменяет стандартную отправку формы
    evt.preventDefault();

    // Получаем значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.value 
    let jobValue = jobInput.value 

    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameValue
    profileJob.textContent = jobValue

    // Закрываем форму
    closePopup(saveButton);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
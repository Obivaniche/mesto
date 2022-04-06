//  Находим кнопки в DOM
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = document.querySelector('.close-edit');
const saveEditButton = document.querySelector('.save-edit');
const closeAddButton = document.querySelector('.close-add');
const saveAddButton = document.querySelector('.save-add');

// Находим окно попапов в DOM
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');

// Прикрепляем обработчики к кнопкам открыть закрыть
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd)
closeEditButton.addEventListener('click', closePopupEdit);
closeAddButton.addEventListener('click', closePopupAdd);

// Находим формы в DOM
const formEditElement = document.querySelector('.form-edit');
const formAddElement = document.querySelector('.form-add');

// Находим поля формы в DOM
const nameInput = formEditElement.querySelector('.form__input_type_name');
const jobInput = formEditElement.querySelector('.form__input_type_job');
const titleInput = formAddElement.querySelector('.form__input_type_title');
const linkInput = formAddElement.querySelector('.form__input_type_link');

// Выбираем элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Находим шаблон карточки Template и получаем его содержимое
const cardTemplate = document.querySelector('#card-template').content;

// Находим блок в котором будет использован Template
const cardGrid = document.querySelector('.card-grid');

// Массив данных для карточек
const initialCards = [{
  name: 'Мурманская область',
  link: 'images/image-1.jpg'
},
{
  name: 'Камчатка',
  link: 'images/image-2.jpg'
},
{
  name: 'Сахалин',
  link: 'images/image-3.jpg'
},
{
  name: 'Куршская коса',
  link: 'images/image-4.jpg'
},
{
  name: 'Байкал',
  link: 'images/image-5.jpg'
},
{
  name: 'Рускеала',
  link: 'images/image-6.jpg'
}
];

// Обработчик открытия формы Edit через кнопку редактировать профиль и вставка значений из profileName и profileJob в поля формы nameInput и jobInfo
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Обработчик открытия формы Add через кнопку добавить карточку
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

// Обработчик закрытия формы Edit кнопки закрыть
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

// Обработчик закрытия формы Add кнопки закрыть
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

// Обработчик «отправки» формы Edit
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы
  evt.preventDefault();

  // Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value
  const jobValue = jobInput.value

  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameValue
  profileJob.textContent = jobValue

  // Закрываем форму
  closePopupEdit();
}

// Обработчик «отправки» формы Add
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы
  evt.preventDefault();

  const inputInfo = {
    name: titleInput.value,
    link: linkInput.value
  };

  renderCard(inputInfo);

  closePopupAdd();
}


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', formSubmitHandler);
formAddElement.addEventListener('submit', formSubmitHandler);

// Используем массив для заполнения карточек созданных методом Template
initialCards.forEach(function (cardInfo) {

  // Клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Наполняем блоки шаблона Template содержимым массива
  cardElement.querySelector('.card__img').src = cardInfo.link;
  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardElement.querySelector('.card__img').alt = cardInfo.name;

  // Отображаем карточки на странице
  cardGrid.append(cardElement);
});
//  Находим кнопки в DOM
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = document.querySelector('.close-edit');
const saveEditButton = document.querySelector('.save-edit');
const closeAddButton = document.querySelector('.close-add');
const saveAddButton = document.querySelector('.save-add');
const closeImgButton = document.querySelector('.close-img');

// Находим окна попапов в DOM
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupImg = document.querySelector('.popup-img');

// Находим формы в DOM
const formEditElement = document.querySelector('.form-edit');
const formAddElement = document.querySelector('.form-add');

// Находим поля формы в DOM
const nameInput = formEditElement.querySelector('.form__input_type_name');
const jobInput = formEditElement.querySelector('.form__input_type_job');
const titleInput = formAddElement.querySelector('.form__input_type_title');
const linkInput = formAddElement.querySelector('.form__input_type_link');

// Выбираем элементы попапов, куда должны быть вставлены другие значения 
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupImgLink = document.querySelector('.popup__img');
const popupImgTitle = document.querySelector('.popup__discripton');

// Находим шаблон карточки Template и получаем его содержимое
const cardTemplate = document.querySelector('#card-template').content;

// Находим блок в котором будет использован Template
const cardGrid = document.querySelector('.card-grid');

// Открываем все попапы
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрываем все попапы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчики к кнопкам
editButton.addEventListener('click', function openPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
closeEditButton.addEventListener('click', function closePopupEdit() {
  closePopup(popupEdit);
});
addButton.addEventListener('click', function openPopupAdd() {
  openPopup(popupAdd);
});
closeAddButton.addEventListener('click', function closePopupAdd() {
  closePopup(popupAdd);
});
closeImgButton.addEventListener('click', function closePopupImg() {
  closePopup(popupImg);
});

// Обработчик «отправки» формы Edit
function editFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  const nameValue = nameInput.value; // Получаем значение полей jobInput и nameInput из свойства value
  const jobValue = jobInput.value;
  profileName.textContent = nameValue; // Вставляем новые значения с помощью textContent
  profileJob.textContent = jobValue;
  closePopup(popupEdit); // Закрываем форму
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', editFormSubmit);

// Массив данных для карточек
const initialCards = [
{
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
}];

// Создаем карточки
function addCard (cardLink, cardTitle) {
  const gridElement = cardTemplate.querySelector('.card').cloneNode(true);// Клонируем шаблоны
  const elementImg = gridElement.querySelector('.card__img'); // Находим изображение карточки
  gridElement.querySelector('.card__title').textContent = cardTitle; // Находим значение подписи картинки
  elementImg.src = cardLink; // Находим остальные атрибуты картинки
  elementImg.alt = cardTitle;
  // Обработчик события клика по картинке
  elementImg.addEventListener('click', function() {
    popupImgTitle.textContent = cardTitle; // Подставляем значения полей
    popupImgLink.src = cardLink;
    popupImgLink.alt = cardTitle;
    openPopup(popupImg); // Открываем картинку
  });
  const likeButton = gridElement.querySelector('.card__like-button'); // Находим кнопку Like в карточке
  // Прикрепляем обработчик к нопке
  likeButton.addEventListener("click", function likeButtonActive (evt) {
    evt.target.classList.toggle('card__like-button_active');
  }); 
  const deleteButton = gridElement.querySelector('.card__delete-button'); // Находим кнопку Delete
  // Прикрепляем обработчик к кнопке
  deleteButton.addEventListener("click", function deleteCard (evt) {
    evt.target.closest('.card').remove();
  });
  return gridElement; // возвращаем карточку
}

// Вставляем значения массива в поля карточек
function renderAddCard(initialCards) {
  initialCards.forEach(function (cardInfo) {
    cardGrid.append(addCard(cardInfo.link, cardInfo.name));
  });
}
// Применяем изменения
renderAddCard(initialCards);

// Добавляем карточку
function addImgSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  cardGrid.prepend(addCard(linkInput.value, titleInput.value));
  closePopup(popupAdd); // Закрываем форму
  linkInput.value = ''; // Очищаем поля формы
  titleInput.value = '';
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', addImgSubmit);
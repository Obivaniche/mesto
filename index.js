// Импортируем карточки
import Card from './card.js';

// Экспортрруем элементы для создания карточек
export {popupImgTitle, popupImgLink, popupImg, openPopup}; 

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
const nameInput = document.getElementById('name-input');
const jobInput = document.getElementById('job-input');
const titleInput = document.getElementById('title-input');
const linkInput = document.getElementById('link-input');

// Выбираем элементы попапов, куда должны быть вставлены другие значения 
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupImgLink = document.querySelector('.popup__img');
const popupImgTitle = document.querySelector('.popup__discripton');

// Находим шаблон карточки Template и получаем его содержимое
const cardTemplate = document.querySelector('#card-template').content;

// Находим блок в котором будет использован Template
const cardGrid = document.querySelector('.card-grid');

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
  submitButtonInactive()
});
closeAddButton.addEventListener('click', function closePopupAdd() {
  closePopup(popupAdd);
});
closeImgButton.addEventListener('click', function closePopupImg() {
  closePopup(popupImg);
});
formEditElement.addEventListener('submit', editFormSubmit);
formAddElement.addEventListener('submit', addImgSubmit);

// Обработчик «отправки» формы Edit
function editFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы
  evt.preventDefault();
  // Вставляем новые введеные значения с помощью textContent 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  // Закрываем форму
  closePopup(popupEdit);
};

// Открываем все попапы
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOver);
};

// Закрываем все попапы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOver);
};

// Закрываем попап через Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

// Закрываем попап через Overlay
function closePopupOver(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

/*
// Создаем карточки
function addCard (cardLink, cardTitle) {
  // Клонируем шаблоны
  const gridElement = cardTemplate.querySelector('.card').cloneNode(true);
  // Находим изображение карточки
  const elementImg = gridElement.querySelector('.card__img');
  // Находим значение подписи картинки
  gridElement.querySelector('.card__title').textContent = cardTitle;
  // Находим остальные атрибуты картинки
  elementImg.src = cardLink;
  elementImg.alt = cardTitle;
  // Обработчик события клика по картинке
  elementImg.addEventListener('click', function() {
    // Подставляем значения полей
    popupImgTitle.textContent = cardTitle;
    popupImgLink.src = cardLink;
    popupImgLink.alt = cardTitle;
    // Открываем картинку
    openPopup(popupImg); 
  });
  // Находим кнопку Like в карточке
  const likeButton = gridElement.querySelector('.card__like-button');
  // Прикрепляем обработчик к нопке
  likeButton.addEventListener("click", function likeButtonActive (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  // Находим кнопку Delete
  const deleteButton = gridElement.querySelector('.card__delete-button');
  // Прикрепляем обработчик к кнопке
  deleteButton.addEventListener("click", function deleteCard (evt) {
    evt.target.closest('.card').remove();
  });
  // Возвращаем готовую карточку
  return gridElement;
};
// Вставляем значения массива в поля карточек
function renderAddCard(initialCards) {
  initialCards.forEach(function (cardInfo) {
    cardGrid.append(addCard(cardInfo.link, cardInfo.name));
  });
};
// Применяем изменения
renderAddCard(initialCards);
*/

// Создаем карточки из массива
initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  // Добавляем картоки в DOM
  cardGrid.append(cardElement);
});

// Добавляем карточку
function addImgSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы
  evt.preventDefault();
  // Вставляем новые введеные значения в карточку через функцию создания карточек
  cardGrid.prepend(addCard(linkInput.value, titleInput.value));
  // Закрываем форму
  closePopup(popupAdd);
  // Сбрасываем форму
  formAddElement.reset();
};

// Делаем кнопку добавления новой карточки неактивной изначально
function submitButtonInactive() {
  // Очищаем поля
  linkInput.value = '';
  titleInput.value = '';
  // Отключаем кнопку
  saveAddButton.classList.add('form__save-button_disabled');
  saveAddButton.disabled = true;    
};
// Импортируем карточки
import Card from '/scripts/Сard.js';

// Импортируем валидацию
import FormValidator from '/scripts/FormValidator.js';

// Импортируем данные для карточек
import { initialCards } from '/scripts/initialCards.js';

// Импортирем переменные
import { popupImg, openPopup } from '/scripts/utils.js';

// Экспорт функций для utils
export { closePopupEsc, closePopupOver };

//  Находим кнопки в DOM
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = document.querySelector('.close-edit');
const closeAddButton = document.querySelector('.close-add');
const saveAddButton = document.querySelector('.save-add');
const closeImgButton = document.querySelector('.close-img');

// Находим окна попапов в DOM
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');

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

// Находим блок в котором будет использован Template
const cardGrid = document.querySelector('.card-grid');

// Массив объектов для валидации
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active'
};

// Прикрепляем обработчики к кнопкам
editButton.addEventListener('click', function openPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
closeEditButton.addEventListener('click', function closePopupEdit() {
  closePopup(popupEdit);
});
const buttonAddValidator = new FormValidator(config, popupAdd);
addButton.addEventListener('click', function openPopupAdd() {
  buttonAddValidator.disableSubmitButton();
  openPopup(popupAdd);
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

// Создаем карточки из массива
function renderCard(data) {
  const card = new Card(data, '#card-template');
  const cardElement = card.generateCard();

  // Добавляем картоки в DOM
  cardGrid.prepend(cardElement);
};

// Забираем данные из массива
initialCards.forEach((card) => {
  renderCard(card);
});

// Добавляем карточку
function addImgSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы
  evt.preventDefault();
  // Вставляем новые введеные значения в карточку
  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };
  renderCard(data);
  // Закрываем форму
  closePopup(popupAdd);
  // Сбрасываем форму
  formAddElement.reset();
};

// Валидация формы профиля
const formEditValidator = new FormValidator(config, popupEdit);
formEditValidator.enableValidation();

// Валидация формы добавления карточки
const formAddValidator = new FormValidator(config, popupAdd);
formAddValidator.enableValidation();
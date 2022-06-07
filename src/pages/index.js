// Импортируем классы
import Card from '../scripts/components/Сard.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
// Импортируем переменные
import { config } from '../scripts/utils/config.js';
import { initialCards } from '../scripts/utils/initialCards.js';
import {
  formEditElement,
  formAddElement,
  editButton,
  addButton,
  cardGrid,
  nameInput,
  jobInput
} from '../scripts/utils/constants.js';
// импортируем цсс для вебпака
import './index.css';

// Валидация формы профиля
const formEditValidator = new FormValidator(config, formEditElement);
formEditValidator.enableValidation();

// Валидация формы добавления карточки
const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

// Вешаем слушатель на попап с картинкой
const popupImg = new PopupWithImage('.popup-img');
popupImg.setEventListeners();

// Создаем карточки
const renderCard = (data) => {
  const card = new Card({
      data: data,
      handleCardClick: () => {
        popupImg.open(data);
      },
    },
    '#card-template'
  );
  // Отрисовываем карточку
  const cardElement = card.generateCard();
  // Вставляем карточкув разметку 
  cardGrid.append(cardElement);
  // Возвращаем отрисованную карточку
  return cardElement;
};

// Вставляем созданные карточки в дом
const section = new Section({
  items: initialCards,
  renderer: renderCard
},
'.card-grid');
// Отрисовываем карточки
section.renderItems();

// Ручное добавление карточек
const popupAdd = new PopupWithForm('.popup-add', (cardData) => {
  // Заполняем информацию
  const data = {
    name: cardData.title,
    link: cardData.link
  };
  // Создаем карточку
  section.addItem(renderCard(data));
  // Закрываем форму
  popupAdd.close();
});
// Вешаем слушатели на попап добавить
popupAdd.setEventListeners();

// Вешаем слушатели на кнопку добавить
addButton.addEventListener('click', () => {
  // Сбрасываем форму
  formAddElement.reset();
  // Открываем форму
  popupAdd.open();
});

// Информация о пользователе
const profileInfo = new UserInfo({
  // Записываем поля
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});
// редактируем профиль
const popupEdit = new PopupWithForm('.popup-edit', (data) => {
  // Заполняем поля
  profileInfo.setUserInfo(data);
  // Закрываем форму
  popupEdit.close();
});

// Вешаем слушатели на попап
popupEdit.setEventListeners();

// Слушатель на кнопку добавить
editButton.addEventListener('click', () => {
  const getProfileInfo = profileInfo.getUserInfo();
  // Подставляем информацию
  nameInput.value = getProfileInfo.name;
  jobInput.value = getProfileInfo.job;
  // Открываем форму
  popupEdit.open();
});

/* Прикрепляем обработчики к кнопкам
editButton.addEventListener('click', function openPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
closeEditButton.addEventListener('click', function closePopupEdit() {
  closePopup(popupEdit);
});
addButton.addEventListener('click', function openPopupAdd() {
  formAddValidator.disableSubmitButton();
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

// Открываем все попапы
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupOver);
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
}; */
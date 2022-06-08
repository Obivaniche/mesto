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
  // Возвращаем отрисованную карточку
  return cardElement;
};

// Вставляем созданные карточки в дом
const section = new Section({
  items: initialCards,
  renderer: (item) => {section.addItem(renderCard(item));}
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
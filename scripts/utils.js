// Экспортируем переменные для использования в разных файлах
export { popupImgTitle, popupImgLink, popupImg, openPopup};

// Импортируем необходимые функции
import {closePopupEsc, closePopupOver } from '/scripts/index.js';

// Переменные для использования в разных файлах
const popupImgTitle = document.querySelector('.popup__discripton');
const popupImgLink = document.querySelector('.popup__img');
const popupImg = document.querySelector('.popup-img');

// Открываем все попапы
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('mousedown', closePopupOver);
  };
const murmanskImage = new URL('../../images/image-1.jpg', import.meta.url);
const kamchatkaImage = new URL('../../images/image-2.jpg', import.meta.url);
const sakhalinImage = new URL('../../images/image-3.jpg', import.meta.url);
const kurshskayaImage = new URL('../../images/image-4.jpg', import.meta.url);
const baikalImage = new URL('../../images/image-5.jpg', import.meta.url);
const ruskealaImage = new URL('../../images/image-6.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Мурманская область',
    link: murmanskImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Сахалин',
    link: sakhalinImage
  },
  {
    name: 'Куршская коса',
    link: kurshskayaImage
  },
  {
    name: 'Байкал',
    link: baikalImage
  },
  {
    name: 'Рускеала',
    link: ruskealaImage
  }];
const murmanskImage = new URL('../../images/image-1.jpg', import.meta.url);
const kamchatkaImage = new URL('../../images/image-2.jpg', import.meta.url);
const sakhalinImage = new URL('../../images/image-3.jpg', import.meta.url);
const kurshskayaImage = new URL('../../images/image-4.jpg', import.meta.url);
const baikalImage = new URL('../../images/image-5.jpg', import.meta.url);
const ruskealaImage = new URL('../../images/image-6.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Рускеала',
    link: ruskealaImage
  },
  {
    name: 'Байкал',
    link: baikalImage
  },
  {
    name: 'Куршская коса',
    link: kurshskayaImage
  },
  {
    name: 'Сахалин',
    link: sakhalinImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Мурманская область',
    link: murmanskImage
  }];

  
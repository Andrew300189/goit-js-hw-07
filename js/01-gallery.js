// 01-gallery.js
import { galleryItems } from './gallery-items.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// Функция для создания элемента галереи
function createGalleryItem(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

const gallery = document.querySelector('.gallery');

// Рендерим элементы галереи
galleryItems.forEach((item) => {
  const galleryItemElement = document.createElement('li');
  galleryItemElement.innerHTML = createGalleryItem(item);
  gallery.appendChild(galleryItemElement);
});

// Инициализируем переменную для хранения текущего экземпляра модального окна
let currentLightbox;

// Открываем модальное окно при клике на изображении
gallery.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.nodeName === 'IMG') {
    const imageUrl = event.target.dataset.source;

    // Закрываем предыдущий экземпляр модального окна перед созданием нового
    if (currentLightbox) {
      currentLightbox.close();
    }

    // Создаем новый экземпляр модального окна
    const lightbox = basicLightbox.create(`
      <img src="${imageUrl}" alt="Image">
    `, {
      closable: true,
      onShow: (instance) => {
        document.addEventListener('keydown', handleKeyPress);
      },
      onClose: (instance) => {
        document.removeEventListener('keydown', handleKeyPress);
        currentLightbox = null; // Очищаем переменную, чтобы избежать утечки памяти
      },
    });

    // Сохраняем ссылку на текущий экземпляр модального окна
    currentLightbox = lightbox;

    lightbox.show();
  }
});

// Функция для закрытия модального окна по нажатию клавиши Escape
function handleKeyPress(event) {
  if (event.key === 'Escape' && currentLightbox) {
    currentLightbox.close();
  }
}

import { galleryItems } from './gallery-items.js';

// Функция для создания элемента галереи
function createGalleryItem(item) {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = item.original;

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;
  galleryImage.setAttribute('data-source', item.original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
}

const gallery = document.querySelector('.gallery');
let lightbox; // Инициализируем переменную для хранения текущего экземпляра модального окна

// Рендерим элементы галереи
const galleryItemsElements = galleryItems.map((item) => createGalleryItem(item));
gallery.append(...galleryItemsElements);

// Открываем модальное окно при клике на изображении
gallery.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.nodeName === 'IMG') {
    const imageUrl = event.target.dataset.source;

    // Закрываем предыдущий экземпляр модального окна перед созданием нового
    if (lightbox) {
      lightbox.close();
    }

    // Создаем новый экземпляр модального окна
    lightbox = basicLightbox.create(`
      <img src="${imageUrl}" alt="Image">
    `, {
      onShow: (instance) => {
        document.addEventListener('keydown', handleKeyPress);
      },
      onClose: (instance) => {
        document.removeEventListener('keydown', handleKeyPress);
      },
    });

    lightbox.show();
  }
});

// Функция для закрытия модального окна по нажатию клавиши Escape
function handleKeyPress(event) {
  if (event.key === 'Escape') {
    lightbox.close();
  }
}

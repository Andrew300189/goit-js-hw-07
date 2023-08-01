import { galleryItems } from './gallery-items.js';

function createGalleryItem(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

const gallery = document.querySelector('.gallery');

galleryItems.forEach((item) => {
  const galleryItemElement = document.createElement('li');
  galleryItemElement.innerHTML = createGalleryItem(item);
  gallery.appendChild(galleryItemElement);
});

const lightbox = new SimpleLightbox('.gallery__item a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250, // Затримка відображення підпису
});

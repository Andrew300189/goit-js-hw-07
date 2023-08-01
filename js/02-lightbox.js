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

const galleryItemsHTML = galleryItems.map((item) => createGalleryItem(item)).join('');
gallery.insertAdjacentHTML('beforeend', galleryItemsHTML);

const lightbox = new SimpleLightbox('.gallery__item a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

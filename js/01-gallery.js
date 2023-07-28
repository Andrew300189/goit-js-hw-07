import { galleryItems } from './gallery-items.js';
import * as galleryItemModule from './gallery-items.js';
function createGalleryItem(item) {
const galleryItemElement = document.createElement('li'); // Changed variable name to avoid conflicts
galleryItemElement.classList.add('gallery__item');

const link = document.createElement('a');
link.classList.add('gallery__link');
link.href = item.original;

const image = document.createElement('img');
image.classList.add('gallery__image');
image.src = item.preview;
image.alt = item.description;
image.setAttribute('data-source', item.original);

link.appendChild(image);
galleryItemElement.appendChild(link);

return galleryItemElement;
}

const gallery = document.querySelector('.gallery');

galleryItems.forEach((item) => {
const galleryItemElement = createGalleryItem(item);
gallery.appendChild(galleryItemElement);
});

gallery.addEventListener('click', (event) => {
event.preventDefault();

if (event.target.nodeName === 'IMG') {
const imageUrl = event.target.dataset.source;


const modalImage = document.querySelector('.modal__image');
    modalImage.src = imageUrl;

    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

    document.addEventListener('keydown', handleKeyPress);
  }
});


function handleKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  document.removeEventListener('keydown', handleKeyPress);
}


const modal = document.querySelector('.modal');
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
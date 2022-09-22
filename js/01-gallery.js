import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

galleryContainer.addEventListener("click", onGalleryElClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" data-source="${original}" src="${preview}" alt="${description}"></img>
        </a>
        </div>
        `;
    })
    .join("");
}

galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

function onGalleryElClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const originalPicModal = basicLightbox.create(`
    <img src="${event.target.dataset.source}">
`);

  originalPicModal.show();
  window.addEventListener("keydown", onCloseWscModal);
}

function onCloseWscModal(event) {
  const ESC_KEY_CODE = "Escape";

  const modalContainer = document.querySelector(".basicLightbox");

  if (event.code === ESC_KEY_CODE) {
    modalContainer.classList.remove("basicLightbox--visible");
    setTimeout(() => modalContainer.remove(), 300);
    window.removeEventListener("keydown", onCloseWscModal);
  }
}

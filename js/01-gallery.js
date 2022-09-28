import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link"  href="${original}">
    <img loading="lazy" class="gallery__image lazyload" data-source="${original}" data-src="${preview}" alt="${description}"></img>
    </a>
    </div>
    `;
    })
    .join("");
}
galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

galleryContainer.addEventListener("click", onGalleryElClick);

let galleryModal;

function onGalleryElClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  galleryModal = basicLightbox.create(`
    <img src="${event.target.dataset.source}">
`);
  galleryModal.show(onClickCloseModal);
  window.addEventListener("keydown", onEscCloseModal);
}

function onEscCloseModal(event) {
  const ESC_KEY_CODE = "Escape";
  if (event.code !== ESC_KEY_CODE) {
    return;
  }
  galleryModal.close(() =>
    window.removeEventListener("keydown", onEscCloseModal)
  );
  // const modalContainer = document.querySelector(".basicLightbox");
  //   // if (event.code === ESC_KEY_CODE) {
  //   //   modalContainer.classList.remove("basicLightbox--visible");
  //   //   setTimeout(() => modalContainer.remove(), 300);
  //   // }
}

function onClickCloseModal() {
  const galleryModalWindow = document.querySelector(".basicLightbox");

  galleryModalWindow.addEventListener("click", () => {
    galleryModal.close(() =>
      window.removeEventListener("keydown", onEscCloseModal)
    );
  });
}

// ================================================================
const lazyImage = document.querySelectorAll("img[data-src]");

lazyImage.forEach((image) => {
  image.addEventListener("load", onImageLoad, { once: true });
});

function onImageLoad(evt) {
  console.log("Image loaded");
  evt.target.classList.add("appear");
}

if ("loading" in HTMLImageElement.prototype) {
  console.log("Браузер поддерживает lazyload ");
  addLazyImagesSrc();
} else {
  console.log("Браузер не поддерживает lazyload ");
  addLazyLoadingScript();
}

function addLazyImagesSrc() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
}

function addLazyLoadingScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";

  document.body.appendChild(script);
}

// function onCloseWscModal(event) {
//   const ESC_KEY_CODE = "Escape";

//   if (event.code === ESC_KEY_CODE) {
//     galleryModal.close(() => console.log("lightbox not visible anymore"));
//   }
//   // window.removeEventListener("keydown", onCloseWscModal);
//   //

//   // const modalContainer = document.querySelector(".basicLightbox");
//   // if (event.code === ESC_KEY_CODE) {
//   //   modalContainer.classList.remove("basicLightbox--visible");
//   //   setTimeout(() => modalContainer.remove(), 300);
//   // }

//   console.log(event.code);
// }

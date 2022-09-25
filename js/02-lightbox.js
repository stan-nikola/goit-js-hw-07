import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

function createGalleryMarkup() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <a class="gallery__item" href='${original}'>
  <img loading="lazy" class="gallery__image lazyload" data-src='${preview}' alt='${description}' title='${description}' />
</a>
    `;
    })
    .join("");
}
galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  //   disableRightClick: true,
});

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

// Создай фронтенд часть приложения поиска и просмотра изображений по ключевому слову. Добавь оформление элементов интерфейса. 

import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Пошук форми, поля вводу, кнопки
const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};


let page = 1;

// console.log(refs.searchForm);
// console.log(refs.input);
// console.log(refs.button);
// console.log(refs.gallery);
// console.log(refs.loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearchImg);
// refs.loadMoreBtn.addEventListener("click", onLoadMore);

function onSearchImg(event) {
  // відміна перезавантаження сторінки по замовчуванню
  event.preventDefault();

  page = 1;
  // очищення галереї
  refs.gallery.innerHTML = '';

  let form = event.currentTarget;

  // записує в змінну введене значення користувачем (trim прибирає пробіли)
  let name = form.elements.searchQuery.value.trim();
  console.log(name);

  // перевірка, якщо значення не пустий рядок
  if (name !== '') {
    fetchImg(name);
  } else {
    refs.loadMoreBtn.style.display = 'none';
     return Notiflix.Notify.failure(
       `Sorry, there are no images matching your search query. Please try again.`
     );
  }
}
// запрос зображення
async function fetchImg(name, page) {
  const API_URL = 'https://pixabay.com/api';
  const options = {
    params: {
      key: '34361382-9628d27261ff8745ccc230a20',
      q: name,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: 40,
    },
  };
  try {
    const response = await axios.get(API_URL, options);
    insertContent(response.data);
  } catch (error) {
    console.log(error);
  }
}



// Розмітка для 1 шт. фото
const createImg = item =>
  `<a class="photo-link" href="${item.largeImageURL}">
  <div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${item.downloads}
    </p>
  </div>
</div>
</a>`;


// Перебір масива
const generateContent = (array) => array.reduce((acc, item) => {
    return acc + createImg(item);
}, "");

// Додавання в DOM
const insertContent = (array) => {
    const result = generateContent(array);
    refs.gallery.insertAdjacentHTML('beforeend', result);
};
  

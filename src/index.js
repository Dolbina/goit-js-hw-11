// Создай фронтенд часть приложения поиска и просмотра изображений по ключевому слову. Добавь оформление элементов интерфейса. 

import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;


// Пошук форми, поля вводу, кнопки
const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

console.log(refs.searchForm);
console.log(refs.input);
console.log(refs.button);
console.log(refs.gallery);
console.log(refs.loadMore);

refs.searchForm.addEventListener('submit', onSearchImg);

function onSearchImg(event) {
  event.preventDefault();

  let form = event.currentTarget;
  let searchQuery = form.elements.searchQuery.value;
  console.log(searchQuery);

  // перевірка, якщо значення не пустий рядок
  // if (searchQuery !== '') {
    fetchImg(searchQuery)
      .then(insertContent)
      .catch(error => console.log(error));
  

    const fetchImg = name => {
      return fetch(
        `https://pixabay.com/api/?key=34361382-9628d27261ff8745ccc230a20&q=${name}&orientation=horizontal&safesearch=true&image_type=photo`
      )
        .then(response => {
          if (!response.ok) {
            if (response.status === 404) {
              return [];
            }
            throw new Error(response.status);
          }
          return response.json();
        })
        .catch(error => {
          console.error(error);
        });
    };
  }
// }

// Розмітка для 1 шт. фото
const createImg = item =>
  `<div class="photo-card">
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
</div>;`;


// Перебір масива
const generateContent = (array) => array.reduce((acc, item) => {
    return acc + createImg(item);
}, "");

// Додавання в DOM
const insertContent = (array) => {
    const result = generateContent(array);
    refs.gallery.insertAdjacentHTML('beforeend', result);
};
  
// refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// function onSearch(event) {
// // записуємо в змінну введене значення користувачем (trim прибирає пробіли)
//     let inputEl = refs.input.value.trim();

// // очистка списку країн та інформації про країну
  
//     refs.countriesInfo.innerHTML = "";
//     refs.countriesList.innerHTML = "";

// // перевірка, якщо значення не пустий рядок
    
// if(inputEl !== ""){
//     fetchCountries(inputEl).then(foundData => {
//       // якщо масив більше 10 країн, то відображається повідомлення
//       if (foundData.length > 10) {
//         // використання бібліотеки Notiflix для відображення повідомлення
//         Notiflix.Notify.info(
//           `Too many matches found. Please enter a more specific name`
//         );
//       }
//       // якщо масив більше 2 та меньше 10 країн, то виводить розмітку (прапор, країна)
//       if ((foundData.length > 2) & (foundData.length < 10)) {
//         insertContent(foundData);
//       }
//       // якщо масив з 1 країни, то виводить інформацією для однієї країни (прапор, назва, столиця, населення, мови)
//       if (foundData.length === 1) {
//         insertContentInfo(foundData);
//       }
//         // якщо користувач ввів не иснуючу назву країни, то відображає повідомлення
//       if (foundData.length === 0) {
//         Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again`);
//       }
//     })
//   }
//  };
//     // Розмітка для однієї країни
//     const createListCountries =
//       item => `<li class="list list__info"><img src="${item.flags.png}" alt="${item.flags.alt}" width="30" height="20"/>
//   <p class = "text">  ${item.name.official}</p></li>`;
        
   

// // Перебір масива
// const generateContent = (array) => array.reduce((acc, item) => {
//     return acc + createListCountries(item);
// }, "");


// // Додавання в DOM
// const insertContent = (array) => {
//     const result = generateContent(array);
//     refs.countriesList.insertAdjacentHTML('beforeend', result);
// };


// // Розмітка з інформацією для однієї країни (прапор, назва, столиця, населення, мови)
// const createInfoCountries = item =>
//     `<li class="list"><img src="${
//   item.flags.png
// }" alt="${item.flags.alt}" width="60" hight="40"/>
//   <p class="name"><b>${item.name.official}</b></p>
//   <p><b>Capital</b>: ${item.capital}</p>
//    <p><b>Population</b>: ${item.population}</p>
//    <p><b>Languages</b>: ${Object.values(item.languages).join(", ")}</p></li>
//   `;


//   // Перебір масива
// const generateContentInfo = (array) => array.reduce((acc, item) => {
   
//     return acc + createInfoCountries(item);
// }, "");


// // Додавання в DOM
// const insertContentInfo = (array) => {
//     const result = generateContentInfo(array);
//     refs.countriesInfo.insertAdjacentHTML('beforeend', result);
// };




 // Додає слухача та використовує функцію debounce, яка робить HTTP-запит через 300мс після того, як користувач перестав вводити текст

// const refs = {
//   name: document.querySelector('#search-box'),
//   countriesList: document.querySelector('.country-list'),
//   countriesInfo: document.querySelector('.country-info'),
// };

// // Додає слухача та використовує функцію debounce, яка робить HTTP-запит через 300мс після того, як користувач перестав вводити текст



// refs.name.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// function onSearch(event) {
//     // записуємо в змінну введене значення користувачем (trim прибирає пробіли)
//     let inputEl = refs.name.value.trim();

// // очистка списку країн та інформації про країну
//     refs.countriesInfo.innerHTML = "";
//     refs.countriesList.innerHTML = "";

// // перевірка, якщо значення не пустий рядок
    
// if(inputEl !== ""){
//     fetchCountries(inputEl).then(foundData => {
//       // якщо масив більше 10 країн, то відображається повідомлення
//       if (foundData.length > 10) {
//         // використання бібліотеки Notiflix для відображення повідомлення
//         Notiflix.Notify.info(
//           `Too many matches found. Please enter a more specific name`
//         );
//       }
//       // якщо масив більше 2 та меньше 10 країн, то виводить розмітку (прапор, країна)
//       if ((foundData.length > 2) & (foundData.length < 10)) {
//         insertContent(foundData);
//       }
//       // якщо масив з 1 країни, то виводить інформацією для однієї країни (прапор, назва, столиця, населення, мови)
//       if (foundData.length === 1) {
//         insertContentInfo(foundData);
//       }
//         // якщо користувач ввів не иснуючу назву країни, то відображає повідомлення
//       if (foundData.length === 0) {
//         Notiflix.Notify.failure(`Oops, there is no country with that name`);
//       }
//     })
//   }
//  };
//     // Розмітка для однієї країни
//     const createListCountries =
//       item => `<li class="list list__info"><img src="${item.flags.png}" alt="${item.flags.alt}" width="30" height="20"/>
//   <p class = "text">  ${item.name.official}</p></li>`;
        
   

// // Перебір масива
// const generateContent = (array) => array.reduce((acc, item) => {
//     return acc + createListCountries(item);
// }, "");


// // Додавання в DOM
// const insertContent = (array) => {
//     const result = generateContent(array);
//     refs.countriesList.insertAdjacentHTML('beforeend', result);
// };


// // Розмітка з інформацією для однієї країни (прапор, назва, столиця, населення, мови)
// const createInfoCountries = item =>
//     `<li class="list"><img src="${
//   item.flags.png
// }" alt="${item.flags.alt}" width="60" hight="40"/>
//   <p class="name"><b>${item.name.official}</b></p>
//   <p><b>Capital</b>: ${item.capital}</p>
//    <p><b>Population</b>: ${item.population}</p>
//    <p><b>Languages</b>: ${Object.values(item.languages).join(", ")}</p></li>
//   `;


//   // Перебір масива
// const generateContentInfo = (array) => array.reduce((acc, item) => {
   
//     return acc + createInfoCountries(item);
// }, "");


// // Додавання в DOM
// const insertContentInfo = (array) => {
//     const result = generateContentInfo(array);
//     refs.countriesInfo.insertAdjacentHTML('beforeend', result);
// };
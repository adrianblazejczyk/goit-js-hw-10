/*-------------------------------------------------------------------------------------------------------------------------------- */

import * as catApi from './cat-api';
import SlimSelect from 'slim-select';
import '../../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

/*-------------------------------------------------------------------------------------------------------------------------------- */

const api_key =
  'live_IMV701qxgRbJROkJa5hu9qyiI9YNoYQTSLhVb4iBgwRTCUsMZDaYhVlod8fhiM0B';

const checkList = document.querySelector('.breed-select');
const postWraper = document.querySelector('.cat-info');
const loadingWraper = document.querySelector('.loader');
const errorWraper = document.querySelector('.error');

/*-------------------------------------------------------------------------------------------------------------------------------- */

function addOptions(list) {
  const markup = list
    .map(item => {
      return `<option value=${item.reference_image_id}>${item.name} </option>`;
    })
    .join('');
  checkList.innerHTML = markup;
}

function selectCat(eve) {
  loadingWraper.classList.remove('hiden');
  postWraper.classList.add('hiden');
  catApi
    .fetchCatByBreed(eve.currentTarget.value)
    .then(function (response) {
      // handle success
      addPost(response);
      loadingWraper.classList.add('hiden');
      postWraper.classList.remove('hiden');
      errorWraper.classList.add('hiden');
    })
    .catch(function (error) {
      // handle error
      Notiflix.Notify.failure(
        'Upps! Coś poszło nie tak. Odśwież stronę jeszcze raz.'
      );
      errorWraper.classList.remove('hiden');
      loadingWraper.classList.add('hiden');
      console.log(error);
    });
}

function addPost(item) {
  const markup = `
  <img class="post__image" src="${item.url}" alt="">
  <div class="post__wraper">
    <h1 class="post__heder">${item.breeds[0].name}</h1>
    <p class="post__description">${item.breeds[0].description}</p>
    <p class="post__temperament"><span class="post__temperament--bolt">Temperament: </span>${item.breeds[0].temperament}</p>
  </div>
`;
  postWraper.innerHTML = markup;
}
function test1() {
  return 0;
}

/*-------------------------------------------------------------------------------------------------------------------------------- */
checkList.addEventListener('change', selectCat);
checkList.classList.add('hiden');
errorWraper.classList.add('hiden');

catApi.init(api_key);
catApi
  .fetchBreeds()
  .then(function (response) {
    // handle success
    addOptions(response);
    loadingWraper.classList.add('hiden');
    checkList.classList.remove('hiden');
    errorWraper.classList.add('hiden');
    var select = new SlimSelect({
      select: '.breed-select',
    });
    Notiflix.Notify.info(
      'Wybierz rasę z listy, aby wyświetlić więcej informacji.'
    );
  })
  .catch(function (error) {
    // handle error
    Notiflix.Notify.failure(
      'Upps! Coś poszło nie tak. Odśwież stronę jeszcze raz!'
    );
    errorWraper.classList.remove('hiden');
    loadingWraper.classList.add('hiden');
    console.log(error);
  });
/*-------------------------------------------------------------------------------------------------------------------------------- */

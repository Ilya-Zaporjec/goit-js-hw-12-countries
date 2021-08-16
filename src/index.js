import './sass/main.scss';
import fetchCountries from './fetchCountries.js';

import temp from './template.hbs';
import _ from 'lodash';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

const refs = {
  input: document.getElementById('input-id'),
  countriesList: document.getElementById('coutnries_list'),
  outputCountrInfo: document.getElementById('output'),
};

const debouncedHandleInput = _.debounce(handleInput, 500);
refs.input.addEventListener('input', debouncedHandleInput);

function handleInput(query) {
  query.preventDefault();
  const inputCount = query.target.value;

  if (inputCount.length !== 0) {
    fetchCountries(inputCount).then(search => showCountries(search));
  } else {
    removeSearch();
  }
}

function showCountries(items) {
  let countries = items.map(item => item);

  switch (true) {
    case items.length > 10:
      console.log('more');

      alert({
        type: 'error ',
        delay: 500,
        text: 'Too many matches found. Please enter a more specific query!',
      });
      removeListCountries();
      break;

    case items.length > 2 && items.length < 10:
      console.log('2-10');
      createListCountries(countries.splice(0, 10));

      break;

    case items.length === 1:
      console.log('1');
      createCountries(...countries);
      removeListCountries();
      break;
  }
}

function createListCountries(countries) {
  const countriesHtml = countries
    .map(country => `<ol class="name-countr__list">${country.name}</ol>`)
    .join('');
  refs.countriesList.insertAdjacentHTML('afterbegin', countriesHtml);
  removeCountriesInfo();
}

function createCountries(countries) {
  const cardInfo = temp(countries);
  refs.outputCountrInfo.innerHTML = cardInfo;
}
function removeListCountries() {
  refs.countriesList.innerHTML = '';
}
function removeCountriesInfo() {
  refs.outputCountrInfo.innerHTML = '';
}
function removeSearch() {
  refs.input.removeEventListener('input', 'debouncedHandleInput');
  refs.countriesList.innerHTML = '';
  refs.outputCountrInfo.innerHTML = '';
}

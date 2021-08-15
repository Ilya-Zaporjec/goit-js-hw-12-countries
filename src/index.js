import './sass/main.scss';
import fetchCountries from './fetchCountries.js';

import _ from 'lodash';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

const refs = {
  input: document.getElementById('input-id'),
  countriesList: document.getElementById('countries'),
};

const debouncedHandleInput = _.debounce(handleInput, 500);
refs.input.addEventListener('input', handleInput);

function handleInput(query) {
  query.preventDefault();
  const inputCount = query.target.value;

  if (inputCount.length !== 0) {
    fetchCountries(inputCount).then(search => shoCountries(search));
  } else {
    input.removeEventListener('input', handleInput);
  }
}

function shoCountries(items) {
  let countries = items.map(item => item);

  switch (true) {
    case items.length > 10:
      console.log('more');

      alert({
        type: 'notice',
        text: 'Too many matches found. Please enter a more specific query!',
      });
      break;

    case items.length > 2 && items.length < 10:
      console.log('2-10');
      createListCountries(countries.splice(0, 9));
      break;

    case items.length === 1:
      console.log('1');
      createCountries(...countries);
      break;
  }
}

function createListCountries(countries) {
  const countriesHtml = countries.map(country => `<ol>${country.name}</ol>`).join('');
  refs.countriesList.insertAdjacentHTML('afterbegin', countriesHtml);
}

// function createCountries(countries) {}

import '../styles/main.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as PNotify from '@pnotify/core/dist/PNotify.js';
import debounce from 'lodash.debounce'

import fetchCountries from './api/fetchCountries'
import { makeCountryMarkup } from './makeCountryMarkup'
import { REFS } from './constants'


const clearCountryWrapper = () => {
  REFS.COUNTRY_WRAPPER.innerHTML = ''
}

const renderCountries = countryName => {
  fetchCountries(countryName).then(makeCountryMarkup).catch(onFetchCountryError);
}

const onFetchCountryError = () => {
  clearCountryWrapper();

  PNotify.error({
    text: "Opps! Not found, try again"
  });
}

const onInputChange = e => {
  const searchQuery = e.target.value.toLowerCase();

  if (!/^[a-zA-Z]*$/g.test(searchQuery)) {

    e.target.value = ''

    PNotify.error({
      text: "Enter only text, please!"
    });

    return
  }

  if (searchQuery.length === 0) {

    clearCountryWrapper();

    return
  }

  renderCountries(searchQuery)

}

const onCountryListClick = e => {
  const target = e.target;
  if (!target.classList.contains('js-list-group-item')) return

  let searchQuery = REFS.INPUT_SEARCH.value

  searchQuery = target.textContent;

  renderCountries(searchQuery)
}

REFS.INPUT_SEARCH.addEventListener('input', debounce(onInputChange, 500))

REFS.COUNTRY_WRAPPER.addEventListener('click', onCountryListClick)
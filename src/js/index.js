import '../styles/main.css';

import debounce from 'lodash.debounce'

import fetchCountries from './api/fetchCountries'

import { notify } from './notifications'
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

  notify.error("Opps! Not found, try again");

}

const onInputChange = e => {
  const searchQuery = e.target.value.toLowerCase();

  if (!/^[a-zA-Z]*$/g.test(searchQuery)) {

    e.target.value = ''

    notify.error("Enter only text, please!");

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
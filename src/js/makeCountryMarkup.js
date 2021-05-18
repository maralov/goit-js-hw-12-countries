
import { REFS } from './constants';
import countryListTpl from '../templates/country-list.hbs';
import countrCardTpl from '../templates/country-card.hbs';

import { notify } from './notifications'

export const makeCountryMarkup = countries => {

  if (countries.length === 1) {

    REFS.COUNTRY_WRAPPER.innerHTML = countrCardTpl(countries);

    notify.success(`Find ${countries[0].name}`);

    return
  }

  if (countries.length > 10) {

    notify.error("Too many matches found. Please enter a more specific query!");

    clearCountryWrapper();

    return
  }

  REFS.COUNTRY_WRAPPER.innerHTML = countryListTpl(countries);
}


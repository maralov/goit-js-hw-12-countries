import { REFS } from './constants'
import countryListTpl from '../templates/country-list.hbs'
import countrCardTpl from '../templates/country-card.hbs'

export const makeCountryMarkup = countries => {

  if (countries.length === 1) {

    REFS.COUNTRY_WRAPPER.innerHTML = countrCardTpl(countries);

    PNotify.success({
      text: `Find ${countries[0].name}`
    });
    return
  }

  if (countries.length > 10) {
    PNotify.error({
      text: "Too many matches found. Please enter a more specific query!"
    });
    clearCountryWrapper();
    return
  }

  REFS.COUNTRY_WRAPPER.innerHTML = countryListTpl(countries);
}


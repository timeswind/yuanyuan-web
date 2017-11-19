import  {
  CREATE_NEW_CARDTEMPLATE,
  FETCH_CARDTEMPLATES,
  FETCH_CARDTEMPLATES_SUCCESS,
  FETCH_CARDTEMPLATE_SUCCESS
} from '../constants'

import axios from 'axios'

export function fetchCardtemplates() {
  let url = '/api/protect/cardtemplates/mine';
  return function (dispatch) {
    dispatch({
      type: FETCH_CARDTEMPLATES
    })
    return axios.get(url)
    .then(function (response) {
      if (response.data.success) {
        dispatch({
          type: FETCH_CARDTEMPLATES_SUCCESS,
          cardtemplates: response.data.cardtemplates
        })
      }
    })
  }
}

export function fetchCardtemplate(id) {
  let url = `/api/protect/cardtemplate?id=${id}`;
  return function (dispatch) {
    return axios.get(url)
    .then(function (response) {
      if (response.data.success) {
        console.log(response.data)
        dispatch({
          type: FETCH_CARDTEMPLATE_SUCCESS,
          cardtemplate: response.data.cardtemplate,
          cards: response.data.cards
        })
      }
    })
  }
}

export function createNewCardtemplate(data) {
  let url = '/api/protect/cardtemplate';
  return function (dispatch) {
    return axios.post(url, data)
    .then(function (response) {
      if (response.data.success) {
        dispatch({
          type: CREATE_NEW_CARDTEMPLATE,
          newCardtemplate: response.data.newCardtemplate
        })
      }
    })
  }
}

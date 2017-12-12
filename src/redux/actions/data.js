import  {
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAIL,
  CREATE_NEW_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  CREATE_NEW_CARDTEMPLATE,
  UPDATE_CARDTEMPLATE,
  FETCH_CARDTEMPLATES,
  FETCH_CARDTEMPLATES_SUCCESS,
  FETCH_CARDTEMPLATE_SUCCESS
} from '../constants'

import axios from 'axios'

export function deleteArticle(id) {
  let url = '/api/protect/article?id=' + id;
  return function (dispatch) {
    return axios.delete(url)
    .then(function (response) {
      if (response.data.success) {
        dispatch({
          type: DELETE_ARTICLE_SUCCESS,
          id: id
        })
      }
    })
  }
}

export function fetchSelfArticles() {
  return function(dispatch) {
    dispatch({
      type: FETCH_ARTICLES
    })
    return axios.get('/api/protect/articles/mine')
    .then(function (response) {
      if (response.data.success) {
        dispatch({
          type: FETCH_ARTICLES_SUCCESS,
          articles: response.data.articles
        })
      }
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
        type: FETCH_ARTICLES_FAIL
      })
    });
  }
}

export function createNewArticle(data) {
  return function(dispatch) {
    return axios.post('/api/protect/newarticle', data)
    .then(function (response) {
      dispatch({
        type: CREATE_NEW_ARTICLE,
        article: response.data.article
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function updateCardtemplate(data) {
  let url = '/api/protect/cardtemplate';
  return function (dispatch) {
    return axios.put(url, data)
    .then(function (response) {
      if (response.data.success) {
        dispatch({
          type: UPDATE_CARDTEMPLATE,
          updatedCardtemplate: response.data.updatedCardtemplate
        })
      }
    })
  }
}

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

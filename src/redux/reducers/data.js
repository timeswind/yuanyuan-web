import {
  FETCH_CARDTEMPLATES,
  FETCH_CARDTEMPLATES_SUCCESS,
  FETCH_CARDTEMPLATE_SUCCESS
} from '../constants'

const initialState = {
  cardTemplates: {
    byIds: {},
    allIds: [],
    fetching: false
  }
}

export default function update(state = initialState, action) {
  if(action.type === FETCH_CARDTEMPLATES) {
    if (action.cardtemplates) {
      return updateObject(state, {
        cardTemplates: {
          byIds: state.cardTemplates.byIds,
          allIds: state.cardTemplates.allIds,
          fetching: true
        }
      })
    }
  }

  if(action.type === FETCH_CARDTEMPLATES_SUCCESS) {
    if (action.cardtemplates) {
      return fetchCardtemplatesSuccess(action.cardtemplates, state)
    }
  }

  if(action.type === FETCH_CARDTEMPLATE_SUCCESS) {
    if (action.cardtemplate) {
      return fetchCardtemplateSuccess(action.cardtemplate, state)
    }
  }

  return state
}

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

function fetchCardtemplateSuccess(cardtemplate, state) {
  var byIds = state.cardTemplates.byIds
  var allIds = state.cardTemplates.allIds
  if (allIds.indexOf(cardtemplate._id) === -1) {
    byIds[cardtemplate._id] = cardtemplate
    allIds.push(cardtemplate._id)
    return updateObject(state, {
      cardTemplates: {
        byIds,
        allIds,
        fetching: false
      }
    })
  } else {
    return state
  }
}

function fetchCardtemplatesSuccess(cardtemplates, state) {
  var byIds = {}
  var allIds = []
  cardtemplates.forEach(function(cardtemplate) {
    byIds[cardtemplate._id] = cardtemplate
    allIds.push(cardtemplate._id)
  })

  return updateObject(state, {
    cardTemplates: {
      byIds,
      allIds,
      fetching: false
    }
  })
}

import {
  CREATE_NEW_CARDTEMPLATE,
  UPDATE_CARDTEMPLATE,
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
      const data = {
        cardtemplate: action.cardtemplate,
        cards: action.cards || []
      }
      return fetchCardtemplateSuccess(data, state)
    }
  }

  if(action.type === UPDATE_CARDTEMPLATE) {
    if (action.updatedCardtemplate) {
      const data = {
        cardtemplate: action.updatedCardtemplate,
        cards: action.cards || []
      }
      return fetchCardtemplateSuccess(data, state)
    }
  }

  if(action.type === CREATE_NEW_CARDTEMPLATE) {
    return state
  }

  return state
}

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

function fetchCardtemplateSuccess(data, state) {
  var { cardtemplate, cards } = data
  if ('image' in cardtemplate && cardtemplate['image'].indexOf("yuanyuanofficial.s3.amazonaws.com") >= 0) {
    cardtemplate['image'] = cardtemplate['image'].replace("yuanyuanofficial.s3.amazonaws.com", "yuanyuan.imgix.net") + "?w=600"
  }
  cardtemplate['cards'] = cards
  cardtemplate['cards_count'] = cards.length
  var byIds = state.cardTemplates.byIds
  var allIds = state.cardTemplates.allIds
  byIds[cardtemplate._id] = cardtemplate
  if (allIds.indexOf(cardtemplate._id) === -1) {
    allIds.push(cardtemplate._id)
  }
  return updateObject(state, {
    cardTemplates: {
      byIds,
      allIds,
      fetching: false
    }
  })
}

function fetchCardtemplatesSuccess(cardtemplates, state) {
  var byIds = {}
  var allIds = []
  cardtemplates = cardtemplates.map(function(cardtemplate){
    if ('image' in cardtemplate && cardtemplate['image'].indexOf("yuanyuanofficial.s3.amazonaws.com") >= 0) {
      cardtemplate['image'] = cardtemplate['image'].replace("yuanyuanofficial.s3.amazonaws.com", "yuanyuan.imgix.net") + "?w=600"
    }
    return cardtemplate
  })
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

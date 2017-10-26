import {
  SET_VIEW_SNACKBAR_STATUS,
  SET_VIEW_PROGRESSMODAL_STATUS
} from '../constants'

const initialState = {
  snackbarOpen: false,
  snackbarMessage: '',
  progressModal: false
}

export default function update(state = initialState, action) {
  if(action.type === SET_VIEW_SNACKBAR_STATUS) {
    return Object.assign({}, state, {
      snackbarOpen: action.status,
      snackbarMessage: action.message || ''
    })
  }
  if(action.type === SET_VIEW_PROGRESSMODAL_STATUS) {
    return Object.assign({}, state, {
      progressModal: action.status
    })
  }
  return state
}

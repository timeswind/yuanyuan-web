import {
  SET_VIEW_SNACKBAR_STATUS
} from '../constants'

const initialState = {
  snackbarOpen: false,
  snackbarMessage: ''
}

export default function update(state = initialState, action) {
  if(action.type === SET_VIEW_SNACKBAR_STATUS) {
    return Object.assign({}, state, {
      snackbarOpen: action.status,
      snackbarMessage: action.message || ''
    })
  }
  return state
}

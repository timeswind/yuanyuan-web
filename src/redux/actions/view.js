import {
  SET_VIEW_SNACKBAR_STATUS,
} from '../constants'

export function setViewSnackbarStatus(data) {
  return {
    type: SET_VIEW_SNACKBAR_STATUS,
    status: data.status,
    message: data.message
  }
}

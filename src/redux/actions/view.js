import {
  SET_VIEW_SNACKBAR_STATUS,
  SET_VIEW_PROGRESSMODAL_STATUS
} from '../constants'

export function setViewSnackbarStatus(data) {
  return {
    type: SET_VIEW_SNACKBAR_STATUS,
    status: data.status,
    message: data.message
  }
}

export function setViewProgressModalStatus(status) {
  return {
    type: SET_VIEW_PROGRESSMODAL_STATUS,
    status: status
  }
}

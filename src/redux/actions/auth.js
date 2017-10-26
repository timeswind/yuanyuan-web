import {
  SET_TOKEN,
  SET_ID,
  SET_NAME,
  SET_SCHOOL,
  SET_EMAIL,
  SET_ROLE,
  SET_PERMISSIONS,
  SET_LOGIN_STATE,
  SET_AVATAR,
  LOGOUT,
  SET_EMAIL_VERIFIED_STATUS,
} from '../constants'
import axios from 'axios'

export function setId(id) {
  return {
    type: SET_ID,
    id: id
  }
}

export function setSchool(school) {
  return {
    type: SET_SCHOOL,
    school: school
  }
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token: token
  }
}

export function setName(name) {
  return {
    type: SET_NAME,
    name: name
  }
}

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email: email
  }
}

export function setRole(role) {
  return {
    type: SET_ROLE,
    role: role
  }
}

export function setPermissions(permissions) {
  return {
    type: SET_PERMISSIONS,
    permissions: permissions
  }
}

export function setLoginState(isLogin) {
  return {
    type: SET_LOGIN_STATE,
    isLogin: isLogin
  }
}

export function setAvatar(url) {
  return {
    type: SET_AVATAR,
    avatar: url
  }
}

export function setEmailVerifiedStatus(emailVerified) {
  return {
    type: SET_EMAIL_VERIFIED_STATUS,
    emailVerified
  }
}

const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

export function updateAvatar(avatar_url) {
  let url = '/api/protect/profile/avatar';
  return function (dispatch) {
    return axios.post(url, {url: avatar_url})
    .then(function (response) {
      if (response.data.success) {
        dispatch({
          type: SET_AVATAR,
          avatar: avatar_url
        })
      }
    })
  }
}

export const logout = () => {
  return dispatch => {
    return delay().then(() => {
      dispatch({
        type: LOGOUT
      })
    });
  }
}

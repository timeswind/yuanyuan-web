import {
  SET_TOKEN,
  SET_ID,
  SET_NAME,
  SET_SCHOOL,
  SET_EMAIL,
  SET_ROLE,
  SET_PERMISSIONS,
  SET_LOGIN_STATE,
  LOGOUT,
  SET_EMAIL_VERIFIED_STATUS,
} from '../constants'

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


export function setEmailVerifiedStatus(emailVerified) {
  return {
    type: SET_EMAIL_VERIFIED_STATUS,
    emailVerified
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

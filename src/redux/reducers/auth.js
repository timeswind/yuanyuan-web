import {
  SET_TOKEN,
  SET_ID,
  SET_NAME,
  SET_EMAIL,
  SET_ROLE,
  SET_SCHOOL,
  SET_PERMISSIONS,
  SET_LOGIN_STATE,
  LOGOUT,
  SET_EMAIL_VERIFIED_STATUS
} from '../constants'

import localStore from 'store2'

const initialState = {
  isLogin: false,
  school: '',
  token: "",
  id: "",
  name: "",
  email: "",
  role: "", // 1 for normal user, 2 for organization account, 100 for admin
  permissions: [],
  emailVerified: true
}

export default function update(state = initialState, action) {
  if(action.type === SET_TOKEN) {
    return Object.assign({}, state, {
      token: action.token
    })
  }
  else if(action.type === SET_ID) {
    return Object.assign({}, state, {
      id: action.id
    })
  }
  else if(action.type === SET_NAME) {
    return Object.assign({}, state, {
      name: action.name
    })
  }
  else if(action.type === SET_EMAIL) {
    return Object.assign({}, state, {
      email: action.email
    })
  }
  else if(action.type === SET_ROLE) {
    return Object.assign({}, state, {
      role: action.role
    })
  }
  else if(action.type === SET_SCHOOL) {
    return Object.assign({}, state, {
      school: action.school
    })
  }
  else if(action.type === SET_PERMISSIONS) {
    return Object.assign({}, state, {
      permissions: action.permissions
    })
  }
  else if(action.type === SET_LOGIN_STATE) {
    return Object.assign({}, state, {
      isLogin: action.isLogin
    })
  }
  else if(action.type === SET_EMAIL_VERIFIED_STATUS) {
    return Object.assign({}, state, {
      emailVerified: action.emailVerified
    })
  }
  else if(action.type === LOGOUT) {
    localStore.session(false)
    return initialState
  }
  return state
}

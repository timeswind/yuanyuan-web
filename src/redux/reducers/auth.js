import {
  SET_TOKEN,
  SET_ID,
  SET_NAME,
  SET_EMAIL,
  SET_ROLE,
  SET_SCHOOL,
  SET_PERMISSIONS,
  SET_LOGIN_STATE,
  SET_AVATAR,
  LOGOUT,
  SET_EMAIL_VERIFIED_STATUS
} from '../constants'

import localStore from 'store2'

const initialState = {
  isLogin: false,
  avatar: null,
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
    localStore.session("token", action.token);
    return Object.assign({}, state, {
      token: action.token
    })
  }
  else if(action.type === SET_ID) {
    localStore.session("id", action.id);
    return Object.assign({}, state, {
      id: action.id
    })
  }
  else if(action.type === SET_NAME) {
    localStore.session("name", action.name);
    return Object.assign({}, state, {
      name: action.name
    })
  }
  else if(action.type === SET_EMAIL) {
    localStore.session("email", action.email);
    return Object.assign({}, state, {
      email: action.email
    })
  }
  else if(action.type === SET_ROLE) {
    localStore.session("role", action.role);
    return Object.assign({}, state, {
      role: action.role
    })
  }
  else if(action.type === SET_SCHOOL) {
    localStore.session("school", action.school);
    return Object.assign({}, state, {
      school: action.school
    })
  }
  else if(action.type === SET_PERMISSIONS) {
    localStore.session("permissions", action.permissions);
    return Object.assign({}, state, {
      permissions: action.permissions
    })
  }
  else if(action.type === SET_LOGIN_STATE) {
    localStore.session("isLogin", action.isLogin);
    return Object.assign({}, state, {
      isLogin: action.isLogin
    })
  }
  else if(action.type === SET_EMAIL_VERIFIED_STATUS) {
    localStore.session("emailVerified", action.emailVerified);
    return Object.assign({}, state, {
      emailVerified: action.emailVerified
    })
  }
  else if(action.type === SET_AVATAR) {
    localStore.session("avatar", action.avatar);
    return Object.assign({}, state, {
      avatar: action.avatar
    })
  }
  else if(action.type === LOGOUT) {
    localStore.session(false)
    return initialState
  }
  return state
}

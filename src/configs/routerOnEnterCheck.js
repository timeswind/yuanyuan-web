export function onEnterSignUpPage (store) {
  const isLogin = store.getState().auth.isLogin
  const role = store.getState().auth.role
  return function (nextState, replace, done) {
    if (isLogin) {
      if (role === 2) {
        replace({
          pathname: '/organization'
        })
        done()
      } else if (role === 1) {
        replace({
          pathname: '/student'
        })
        done()
      }
    } else {
      done()
    }
  }
}

export function onEnterSignInPage (store) {
  const isLogin = store.getState().auth.isLogin
  const role = store.getState().auth.role
  return function (nextState, replace, done) {
    if (isLogin) {
      if (role === 2) {
        replace({
          pathname: '/organization'
        })
        done()
      } else if (role === 1) {
        replace({
          pathname: '/student'
        })
        done()
      }
    } else {
      done()
    }
  }
}

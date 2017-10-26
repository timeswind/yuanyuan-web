export function onEnterSignUpPage (store) {
  return function (nextState, replace, done) {
    const isLogin = store.getState().auth.isLogin
    const role = store.getState().auth.role
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
  return function (nextState, replace, done) {
    const isLogin = store.getState().auth.isLogin
    const role = store.getState().auth.role
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
      // replace({
      //   pathname: '/'
      // })
      done()
    }
  }
}

export function onEnterOrganizationPage (store) {
  return function (nextState, replace, done) {
    const isLogin = store.getState().auth.isLogin
    const role = store.getState().auth.role
    if (isLogin) {
      if (role === 2) {
        done()
      } else if (role === 1) {
        replace({
          pathname: '/student'
        })
        done()
      }
    } else {
      console.log("not login")
      replace({
        pathname: '/'
      })
      done()
    }
  }
}

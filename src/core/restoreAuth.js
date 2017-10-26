import localStore from 'store2';

export default function (store) {
  if (localStore.session.get("token") && localStore.session.get("email") && localStore.session.get("id")) {
    store.dispatch({
      type: "SET_TOKEN",
      token: localStore.session.get("token")
    })
    store.dispatch({
      type: "SET_ID",
      id: localStore.session.get("id")
    })
    store.dispatch({
      type: "SET_NAME",
      name: localStore.session.get("name")
    })
    store.dispatch({
      type: "SET_SCHOOL",
      school: localStore.session.get("school")
    })
    store.dispatch({
      type: "SET_EMAIL",
      email: localStore.session.get("email")
    })
    store.dispatch({
      type: "SET_ROLE",
      role: localStore.session.get("role")
    })
    store.dispatch({
      type: "SET_AVATAR",
      avatar: localStore.session.get("avatar")
    })
    // if (localStore.session.get("permissions")) {
    //   let permissions = localStore.session.get("permissions")
    //   store.dispatch({
    //     type: "SET_PERMISSIONS",
    //     role: localStore.session.get("permissions")
    //   })
    //   if (permissions.indexOf('agentbook') > -1) {
    //     store.dispatch({ type: 'ENABLE_AGENTBOOK' })
    //   }
    //   if (permissions.indexOf('sharelist') > -1) {
    //     store.dispatch({ type: 'ENABLE_SHARELIST' })
    //   }
    // }
    store.dispatch({
      type: "SET_LOGIN_STATE",
      isLogin: true
    })
    // Raven.setUserContext({
    //   name: localStore.session.get("name"),
    //   email: localStore.session.get("email"),
    //   id: localStore.session.get("id")
    // })
  } else {
    localStore.session(false);
    store.dispatch({
      type: "SET_LOGIN_STATE",
      isLogin: false
    })
  }
}

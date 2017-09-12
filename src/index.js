import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import { useScroll } from 'react-router-scroll';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import IndexRoute from 'react-router/lib/IndexRoute';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
// import { getDashBoardData } from './redux/actions/dashboard';

// import Raven from 'raven-js';

// import { IntlProvider } from 'react-intl';
// global.Intl = require('intl');
import injectTapEventPlugin from 'react-tap-event-plugin';
import localStore from 'store2';

import App from './App';

import { reducer as formReducer } from 'redux-form'
// import internalReducers from './redux/reducers/internal';
// import viewReducers from './redux/reducers/view';
import authReducers from './redux/reducers/auth';
// import searchReducers from './redux/reducers/search';
// import listReducers from './redux/reducers/list';
// import dashboardReducers from './redux/reducers/dashboard';
// import clientbookReducers from './redux/reducers/clientbook';
// import functionsReducer from './redux/reducers/functions';
// import agentbookReducer from './redux/reducers/agentbook';
// import messageReducer from './redux/reducers/message';
// import startChatService, {chatServiceMiddleware} from './core/chatService';
import './index.css';

import axios from 'axios'

// if (process.env.NODE_ENV === 'production') {
//   Raven.config('https://428f8ff22ea44869a1b6410cf83d7905@sentry.io/101570').install();
// }

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
    MuiTab: {
      label: {
        color: 'white',
      }
    }
  },
  palette: {
    primary: {
      ...purple,
      "50": "#FE6B8B",
      "100": "#FE6B8B",
      "200": "#FE6B8B",
      "300": "#FE6B8B",
      "400": "#FE6B8B",
      "500": "#FE6B8B",
      "600": "#FE6B8B",
      "700": "#FE6B8B",
      "800": "#FE6B8B",
      "900": "#FE6B8B",
      "A100": "#FE6B8B",
      "A200": "#FE6B8B",
      "A400": "#FE6B8B",
      "A700": "#FE6B8B",
    }, // Purple and green play nicely together.
    secondary: {
      ...green,
    },
    error: red,
  },
});

const reactRouterMiddleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers({
    form: formReducer,
    routing: routerReducer,
    // internal: internalReducers,
    // view: viewReducers,
    auth: authReducers,
    // search: searchReducers,
    // list: listReducers,
    // dashboard: dashboardReducers,
    // clientbook: clientbookReducers,
    // agentbook: agentbookReducer,
    // functions: functionsReducer,
    // message: messageReducer
  }),
  compose(
    applyMiddleware(thunk),
    // applyMiddleware(chatServiceMiddleware),
    applyMiddleware(reactRouterMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
// startChatService(store);
const history = syncHistoryWithStore(browserHistory, store)

axios.interceptors.request.use(function (config) {
  if (config && config.url) {
    let urlArray = config.url.split('/')
    if (urlArray && urlArray[1] === 'api' && urlArray[2] !== 'public') {
      if (store.getState().auth.token) {
        config.headers["Authorization"] = "Bearer " + store.getState().auth.token
      } else {
        Promise.reject({
          message: "Need Authorization Token"
        })
      }
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

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

function onEnterSignUpPage (nextState, replace, done) {
  const isLogin = store.getState().auth.isLogin
  const role = store.getState().auth.role
  if (isLogin) {
    if (role === 2) {
      replace({
        pathname: '/organization'
      })
      done()
    } else {
      // done()
    }
  } else {
    done()
  }
}
//
// function requirePermissionSHARELIST (nextState, replace, done) {
//   if (store.getState().auth.isLogin && store.getState().functions.sharelist) {
//     done()
//   } else {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//     done()
//   }
// }

// function requireAuthLogin(nextState, replace) {
//   if (!store.getState().auth.isLogin) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }

// function dashboardOnEnter(nextState, replace, done) {
//   if (!store.getState().auth.isLogin || store.getState().auth.role > 3) {
//     if (store.getState().auth.role > 100) {
//       replace({
//         pathname: '/internal',
//         state: { nextPathname: nextState.location.pathname }
//       })
//     } else {
//       replace({
//         pathname: '/login',
//         state: { nextPathname: nextState.location.pathname }
//       })
//     }
//   }
//   done()
// }


// function requireAuthAdvisor(nextState, replace) {
//   if (!store.getState().auth.isLogin || store.getState().auth.role === 1) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }
//
// function requireAuthInternal(nextState, replace) {
//   if (!store.getState().auth.isLogin || store.getState().auth.role !== 101) {
//     replace({
//       pathname: '/login'
//     })
//   }
// }

// function requireHaveNotListed(nextState, replace, callback) {
//   if (store.getState().auth.isLogin) {
//     let advisor_id = store.getState().auth.id
//     fetch('/api/public/list?type=advisor&id=' + advisor_id, {
//       method: "GET",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//     }).then(function(response) {
//       return response.json()
//     }).then(function(json) {
//       console.log(json)
//       if (json.success) {
//         replace({
//           pathname: '/dashboard',
//           state: { nextPathname: nextState.location.pathname }
//         })
//       }
//       callback();
//     }).catch(function(ex) {
//       console.log('failed', ex)
//     })
//   }
//   callback();
// }

const MUI = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute getComponent={function(location, cb){
              require.ensure([], (require) => {
                cb(null, require('./views/LoginView/LoginView').default)
              }, 'auth')
            }}>
          </IndexRoute>
          {/*
            <Route path="/signup" getComponent={function(location, cb){
            require.ensure([], (require) => {
            cb(null, require('./views/SignupView/SignupView').default)
            })
            }}>
            </Route>
            */}
            <Route path="/register">
              <Route path="organization" getComponent={function(location, cb){
                  require.ensure([], (require) => {
                    cb(null, require('./views/Register/OrganizationRegisterView').default)
                  }, 'auth')
                }}
                onEnter={onEnterSignUpPage}>
              </Route>
            </Route>
            <Route path="/organization">
              <IndexRoute getComponent={function(location, cb){
                  require.ensure([], (require) => {
                    cb(null, require('./views/Organization/Dashboard').default)
                  }, 'organization')
                }}>
              </IndexRoute>
              <Route path="article/:id" getComponent={function(location, cb){
                  require.ensure([], (require) => {
                    cb(null, require('./views/Organization/Article').default)
                  }, 'organization')
                }}>
              </Route>
            </Route>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );

  injectTapEventPlugin();
  ReactDOM.render(<MUI />, document.getElementById('root'));
  registerServiceWorker();

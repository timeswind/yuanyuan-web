import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
// import { useScroll } from 'react-router-scroll';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import IndexRoute from 'react-router/lib/IndexRoute';
import { MuiThemeProvider } from 'material-ui/styles';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
// import Raven from 'raven-js';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';

import { reducer as formReducer } from 'redux-form'
import authReducers from './redux/reducers/auth';
import viewReducers from './redux/reducers/view';
// import startChatService, {chatServiceMiddleware} from './core/chatService';
import { onEnterSignUpPage, onEnterSignInPage } from './configs/routerOnEnterCheck'
import restoreAuth from './core/restoreAuth'
import theme from './core/theme'
import './index.css';

import axios from 'axios'

// if (process.env.NODE_ENV === 'production') {
//   Raven.config('https://428f8ff22ea44869a1b6410cf83d7905@sentry.io/101570').install();
// }

const reactRouterMiddleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers({
    form: formReducer,
    routing: routerReducer,
    // internal: internalReducers,
    view: viewReducers,
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

restoreAuth(store)

const MUI = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute getComponent={function(location, cb){
              require.ensure([], (require) => {
                cb(null, require('./views/LoginView/LoginView').default)
              }, 'auth')
            }}
            onEnter={onEnterSignInPage(store)}>
          </IndexRoute>
          <Route path="/register">
            <Route path="organization" getComponent={function(location, cb){
                require.ensure([], (require) => {
                  cb(null, require('./views/Register/OrganizationRegisterView').default)
                }, 'auth')
              }}
              onEnter={onEnterSignUpPage(store)}>
            </Route>
            <Route path="student" getComponent={function(location, cb){
                require.ensure([], (require) => {
                  cb(null, require('./views/Register/StudentRegisterView').default)
                }, 'auth')
              }}
              onEnter={onEnterSignUpPage(store)}>
            </Route>
          </Route>
          <Route path="/student">
            <IndexRoute getComponent={function(location, cb){
                require.ensure([], (require) => {
                  cb(null, require('./views/Student/Dashboard').default)
                }, 'student')
              }}>
            </IndexRoute>
          </Route>
          <Route path="/organization">
            <IndexRoute getComponent={function(location, cb){
                require.ensure([], (require) => {
                  cb(null, require('./views/Organization/Dashboard').default)
                }, 'organization')
              }}>
            </IndexRoute>
            <Route path="article/:id/edit" getComponent={function(location, cb){
                require.ensure([], (require) => {
                  cb(null, require('./views/Organization/EditArticle').default)
                }, 'organization')
              }}>
            </Route>
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

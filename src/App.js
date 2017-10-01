import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar'
import Snackbar from 'material-ui/Snackbar';
import * as ViewActions from './redux/actions/view'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import './App.css';

class App extends Component {

  handleRequestClose = (event, reason) => {
    this.props.actions.setViewSnackbarStatus({status: false, message: ''})
  };

  render() {
    const { children, view } = this.props
    return (
      <div>
        <Navbar />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={view.snackbarOpen}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{view.snackbarMessage}</span>}
          />
        {children}
      </div>
    );
  }
}

const mapStatesToProps = (states) => {
  return {
    view: states.view
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, ViewActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(App);

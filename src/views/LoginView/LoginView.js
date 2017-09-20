import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import MainFooter from '../../components/MainFooter/MainFooter'
import axios from 'axios';
import localStore from 'store2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../redux/actions/auth.js';
import { push } from 'react-router-redux'

const styles = {
  registerOrganzationButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginBottom: 32,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  loginButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    marginTop: 16,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
    width: "256px"
  }
};

class LoginView extends Component {
  state = {
    email: "",
    password: "",
    errorText: {
      email: "",
      result: ""
    }
  };

  handleEmailEnter = (event) => {
    let input = event.target.value
    var newState = this.state
    if (!this.validateEmail(input)) {
      newState.errorText.email = "invalid email address"
    } else {
      newState.errorText.email = ""
    }
    newState.email = event.target.value
    this.setState(newState);
  }

  handlePasswordEnter = (event) => {
    this.setState({password: event.target.value});
  }

  validateEmail(email) {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  login() {
    const { actions, dispatch } = this.props;
    let self = this
    var newState = this.state
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/api/public/login', data)
    .then(function(response) {
      console.log(response)
      var json = response.data
      if (json.success === true) {
        newState.errorText.result = "";
        actions.setToken(json.token);
        actions.setId(json.id);
        actions.setName(json.name);
        actions.setEmail(json.email);
        actions.setRole(json.role);
        actions.setLoginState(true);

        localStore.session("token", json.token);
        localStore.session("id", json.id);
        localStore.session("name", json.name);
        localStore.session("email", json.email);
        localStore.session("role", json.role);
        if (json.role === 2) {
          dispatch(push('/organization'))
        }
      }
    })
    .catch(function(error) {
      newState.errorText.result = error.response.data.error;
      self.setState(newState)
    })
  }


  render() {
    return (
      <div className="view-body">
        <div className="g-background" style={{padding:"36px 8px 64px 8px"}}>
          <div style={{maxWidth: "500px", margin: 'auto', display: 'flex', flexDirection: 'column'}}>
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button color="primary"
                style={styles.registerOrganzationButton}
                onClick={()=> {this.props.dispatch(push('/register/organization'))}}>
                注册组织账号 ->
              </Button>
            </div>
            <Card>
              <div className="flex-column flex-center" style={{padding: "32px 16px"}}>
                <TextField
                  placeholder="Email"
                  label="邮箱账号"
                  value={this.state.email}
                  margin="normal"
                  onChange={this.handleEmailEnter}
                  type="email"
                  style={{width: "256px"}}
                  />
                <TextField
                  value={this.state.password}
                  margin="normal"
                  placeholder="********"
                  label="密码"
                  onChange={this.handlePasswordEnter}
                  type="password"
                  style={{width: "256px"}}
                  />
                <div><span style={{color: "#F44336"}}>{this.state.errorText.result}</span></div>
                <Button
                  raised color="primary"
                  onClick={() => {
                    this.login()
                  }}
                  style={styles.loginButton}>
                  登入
                </Button>
              </div>
            </Card>
          </div>

        </div>
        <MainFooter></MainFooter>

      </div>
    );
  }
}

// function select(state) {
//   return {
//     path: state.routing.locationBeforeTransitions.pathname
//   };
// }
//
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, AuthActions), dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LoginView);

import React from 'react'
import StudentRegisterForm from './StudentRegisterForm'
import { SubmissionError } from 'redux-form';  // ES6
import axios from 'axios';
import localStore from 'store2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../redux/actions/auth';
import * as ViewActions from '../../redux/actions/view';
import { push } from 'react-router-redux'

class StudentRegisterView extends React.Component {
  handleSubmit (form) {
    console.log(form)
    const self = this
    const {actions, dispatch} = this.props
    form['name'] = form.name
    if ('name' in form) {
      if (form.name === '') {
        throw new SubmissionError({'name': 'empty'})
      }
    } else {
      throw new SubmissionError({'name': 'empty'})
    }

    axios.post('/api/public/student_register', form)
    .then(function(response) {
      console.log(response)
      var json = response.data
      if (json.success === true) {
        actions.setToken(json.token);
        actions.setId(json.id);
        actions.setName(json.name);
        actions.setEmail(json.email);
        actions.setSchool(json.school);
        actions.setRole(json.role);
        actions.setLoginState(true);

        localStore.session("token", json.token);
        localStore.session("id", json.id);
        localStore.session("name", json.name);
        localStore.session("email", json.email);
        localStore.session("role", json.role);
        localStore.session("school", json.school);

        dispatch(push('/student'))
      }
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data && error.response.data.error) {
          self.setState({errorText: {
            result: error.response.data.error
          }})
          if (error.response.data.error) {
            self.props.actions.setViewSnackbarStatus({status: true, message: '邮箱已被使用'})
          } else {
            self.props.actions.setViewSnackbarStatus({status: true, message: error.response.data.error})
          }
        }
      } else {
        console.log('Error', error.message);
      }
    });

  }

  render() {
    return (
      <div>
        <StudentRegisterForm style={{maxWidth: 800, margin: 'auto', paddingTop: 128}} onSubmit={(form) => this.handleSubmit(form)}/>
    </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, ViewActions, AuthActions), dispatch)
  };
}

export default connect(null, mapDispatchToProps)(StudentRegisterView);

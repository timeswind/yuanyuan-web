import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography';
import Button from '../../components/colorfullButton/student';

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "填写姓名"
  } else if (!values.schoolemail) {
    errors.schoolemail = '填写学校邮箱'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.schoolemail)) {
    errors.schoolemail = '邮箱格式错误, 请以@psu.edu结尾'
  } else if (!values.schoolemail.endsWith('@psu.edu')) {
    errors.schoolemail = '请以@psu.edu结尾'
  }

  // if (!values.username) {
  //   errors.username = 'Required'
  // } else if (values.username.length > 15) {
  //   errors.username = 'Must be 15 characters or less'
  // }
  // if (!values.email) {
  //   errors.email = 'Required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  // if (!values.age) {
  //   errors.age = 'Required'
  // } else if (isNaN(Number(values.age))) {
  //   errors.age = 'Must be a number'
  // } else if (Number(values.age) < 18) {
  //   errors.age = 'Sorry, you must be at least 18 years old'
  // }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
}) =>
<div>
  <div>
    <TextField {...input} label={label} type={type} {...custom}/>
    {touched &&
      ((error &&
        <span style={{marginLeft: 16, color: 'red'}}>
          {error}
        </span>) ||
        (warning &&
          <span>
            {warning}
          </span>))}
        </div>
      </div>

      class StudentRegisterForm extends React.Component {
        render () {
          const { handleSubmit, pristine, submitting, style, selectedSchool } = this.props
          return (
            <form onSubmit={handleSubmit} style={style}>
              <Card style={{padding: '16px 32px'}}>
                <Typography type="display2" gutterBottom>
                  学生账号注册
                </Typography>
                <div>
                  <label>学校</label>
                  <div>
                    <Field name="school" component="select">
                      <option />
                      <option value="psu">Penn State University</option>
                    </Field>
                  </div>
                </div>
                { !!selectedSchool && (
                  <div>
                    <Field
                      name="name"
                      type="text"
                      component={renderField}
                      label="姓名"
                      style={{marginBottom: 16, marginTop: 16}}
                      />
                    <Field name="schoolemail" type="email" component={renderField} label="学校邮箱" style={{marginBottom: 16}}/>
                    <Field name="password" type="password" component={renderField} label="密码" style={{marginBottom: 16}}/>
                    <div style={{marginTop: 32}}>
                      <Button raised color="primary" type="submit" disabled={pristine || submitting}>
                        注册
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </form>
          )
        }
      }


      StudentRegisterForm = reduxForm({
        form: 'StudentRegister',
        validate
      })(StudentRegisterForm)

      // Decorate with connect to read form values
      const selector = formValueSelector('StudentRegister') // <-- same as form name
      StudentRegisterForm = connect(state => {
        const selectedSchool = selector(state, 'school')

        return {
          selectedSchool
        }
      })(StudentRegisterForm)

      export default StudentRegisterForm

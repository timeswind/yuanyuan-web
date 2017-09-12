import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const renderTextField = ({
  input,
  label,
  submitError,
  meta: { touched, error },
  ...custom
}) =>
<TextField
  label={label}
  error={touched && !!error}
  {...input}
  {...custom}
  />

class OrganizationRegisterForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting, style } = this.props
    return (
      <form onSubmit={handleSubmit} style={style}>
        <Typography type="display2" gutterBottom>
          社团/机构账号注册
        </Typography>
        <Card style={{padding: '16px 32px'}}>
          <div>
            <label>学校</label>
            <div>
              <Field name="school" component="select">
                <option />
                <option value="psu">Penn State University</option>
              </Field>
            </div>
          </div>
          <div>
            <div>
              <Field
                name="organizationName"
                label="社团/机构名字"
                component={renderTextField}
                type="text"
                style={{width: 256}}
                margin="normal"
                />
            </div>
          </div>
          <div>
            <div>
              <Field
                name="email"
                label="邮箱"
                component={renderTextField}
                style={{width: 256}}
                type="email"
                margin="normal"
                />
            </div>
          </div>
          <div>
            <div>
              <Field
                name="password"
                label="密码"
                component={renderTextField}
                style={{width: 256}}
                type="password"
                margin="normal"
                />
            </div>
          </div>
          <div style={{marginTop: 32}}>
            <Button raised color="primary" type="submit" disabled={pristine || submitting}>
              注册
            </Button>
          </div>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'OrganizationRegister' // a unique identifier for this form
})(OrganizationRegisterForm)

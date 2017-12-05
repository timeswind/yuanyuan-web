import React from 'react'
import Card, { CardContent } from 'material-ui/Card';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from '../../../components/colorfullButton';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

const styles = {
  wrapper: {
    maxWidth: 800,
    margin: "32px auto"
  }
}
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

class ManageStore extends React.Component {
  state = {
    addStoreCardShow: false
  }

  showAddStoreCard() {
    this.setState({addStoreCardShow: true})
  }

  render () {
    return (
      <div style={styles.wrapper}>
        <Button onClick={() => this.showAddStoreCard()}>+ 添加店铺</Button>
        <AddStoreCard></AddStoreCard>
        <StoreCard></StoreCard>
      </div>
    )
  }
}

class StoreCard extends React.Component {
  render () {
    return (
      <Card style={{marginTop: 16}}>
        <Grid container direction="column" style={{padding: '16px 0'}}>
          <Grid item>
            店铺名称
          </Grid>
          <Grid item>
            店铺地址
          </Grid>
        </Grid>
      </Card>
    )
  }
}

class AddStoreCard extends React.Component {

  render () {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          label="店铺名称"
          component={renderTextField}
          type="text"
          style={{width: 256}}
          margin="normal"
          />
      </form>
    )
  }
}

export default ManageStore

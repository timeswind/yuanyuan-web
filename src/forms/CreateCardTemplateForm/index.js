import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Button from '../../components/colorfullButton'
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux'
import CardPreview from '../../components/CardPreview';

const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    opacity: '0'
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

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }

  return errors
}

class CardTemplateForm extends React.Component {
  state = {
    cardBackgroundImageFile: null,
    cardBackgroundImage: "https://www.webpagefx.com/blog/images/assets/images.sixrevisions.com/2009/12/06-11_slick_businesscard_duplicated_finished.jpg"
  }


  uploadCardBackgroundImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        cardBackgroundImageFile: file,
        cardBackgroundImage: reader.result
      });
    }
    if (file) {
      reader.readAsDataURL(file)
    }
    // const self = this
    // self.props.actions.setViewProgressModalStatus(true)
    // uploadAvatarImage(file).then(function(response){
    //   console.log(response.data.link)
    //   self.props.actions.updateAvatar(response.data.link)
    //   self.props.actions.setViewProgressModalStatus(false)
    // })
  }

  save = (data) => {
    const { cardBackgroundImageFile, cardBackgroundImage } = this.state
    if (cardBackgroundImageFile === null) {
      data["image"] = cardBackgroundImage
    } else {
      data["file"] = cardBackgroundImageFile
    }
    this.props.onSubmit(data)
  }

  render() {
    const { cardBackgroundImage } = this.state
    const { handleSubmit, pristine, submitting, style, cardName, cardDescription, organizationInfo, invalid } = this.props
    return (
      <form onSubmit={handleSubmit(this.save.bind(this))} style={style}>
        <Typography type="display2" gutterBottom>
          发卡
        </Typography>
        <Card style={{padding: '16px 32px'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
              <div>
                <Field
                  name="name"
                  label="卡片名称"
                  component={renderTextField}
                  type="text"
                  style={{width: 256}}
                  margin="normal"
                  />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button raised color="primary" style={{color: '#fff'}}>
                  上传卡片图案
                  <input id="imageButton"
                    style={styles.exampleImageInput}
                    type="file"
                    onChange={(e) => {this.uploadCardBackgroundImage(e)}}></input>
                </Button>
                <img src={cardBackgroundImage} alt="" style={{width: 200, alignSelf: 'center', marginTop: 16}}/>
              </div>
              <div>
                <Field
                  name="description"
                  label="卡片描述"
                  multiline
                  rows="4"
                  component={renderTextField}
                  style={{width: 256}}
                  margin="normal"
                  />
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%"}}>
              <CardPreview cardName={cardName} organizationInfo={organizationInfo} cardBackgroundImage={cardBackgroundImage}/>
            </div>
          </div>
          <div style={{marginTop: 32}}>
            <Button style={{color: "#fff"}} raised color="primary" type="submit" disabled={invalid || pristine || submitting}>
              完成
            </Button>
          </div>
        </Card>
      </form>
    )
  }
}


CardTemplateForm = reduxForm({
  form: 'CardTemplateForm',
  validate
})(CardTemplateForm)

// Decorate with connect to read form values
const selector = formValueSelector('CardTemplateForm') // <-- same as form name
CardTemplateForm = connect(state => {
  const name = selector(state, 'name')
  const description = selector(state, 'description')

  return {
    cardName: name,
    cardDescription: description
  }
})(CardTemplateForm)

export default CardTemplateForm

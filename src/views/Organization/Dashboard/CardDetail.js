import React from 'react';
import {connect} from 'react-redux';
import * as DataActions from '../../../redux/actions/data';
import * as ViewActions from '../../../redux/actions/view';
import CardPreview from '../../../components/CardPreview';
import {bindActionCreators} from 'redux';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from '../../../components/colorfullButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { uploadImageWithFolder } from '../../../core/upload';
import { cardTypes } from '../../../core/dictionary';
const styles = {
  cardWrapper: {
    maxWidth: 640,
    margin: '0 auto'
  },
  exampleImageInput:{
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    opacity: '0'
  }
};

class CardTemplateDetail extends React.Component {
  state = {
    cardTemplateData: null,
    editMode: false,
    updateCard: {
      name: '',
      description: '',
      image: '',
      imageFile: null
    }
  }

  componentDidMount() {
    const self = this
    if (this.props.params.id) {
      const id = this.props.params.id
      if (this.props.cardTemplates.allIds.indexOf(id) >= 0) {
        console.log(this.props.cardTemplates.byIds[id])
        this.setState({cardTemplateData: this.props.cardTemplates.byIds[id]})
      }
      this.props.actions.fetchCardtemplate(id).then(function() {
        self.retriveData()
      })
    }
  }

  renderFromNowTime(date) {
    return (<p style={{margin: 0}}>{moment(date).locale('zh-cn').format('L')}</p>)
  }

  retriveData() {
    const id = this.props.params.id
    if (this.props.cardTemplates.allIds.indexOf(id) >= 0) {
      const cardTemplateData = this.props.cardTemplates.byIds[id]
      this.setState({
        cardTemplateData,
        editMode: false,
        updateCard: {
          id: cardTemplateData._id,
          name: cardTemplateData.name,
          description: cardTemplateData.description,
          image: cardTemplateData.image
        }
      })
    }
  }

  toggleMode () {
    const id = this.props.params.id
    const {editMode} = this.state
    const self = this
    if (editMode === true) {
      this.props.actions.fetchCardtemplate(id).then(function() {
        self.retriveData()
      })
    }
    this.setState({editMode: !this.state.editMode})
  }

  uploadCardBackgroundImage(e) {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    var updateCard = this.state.updateCard
    reader.onloadend = () => {
      updateCard['image'] = reader.result
      updateCard['imageFile'] = file
      this.setState({updateCard})
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  handleCardInfoUpdate = name => event => {
    var updateCard = this.state.updateCard
    updateCard[name] = event.target.value
    this.setState({updateCard: updateCard})
  };

  handleSubmitUpdatedCard () {
    var data = this.state.updateCard
    const self = this
    self.props.actions.setViewProgressModalStatus(true)
    if ("imageFile" in data) {
      console.log(data)
      uploadImageWithFolder(data.imageFile, 'card_image').then(function(response){
        data["image"] = response.data.link
        self.props.actions.updateCardtemplate(data).then(function(response) {
          self.retriveData()
          self.props.actions.setViewProgressModalStatus(false)
        })
      })
    } else {
      console.log(data)
      self.props.actions.updateCardtemplate(data).then(function(response) {
        self.retriveData()
        self.props.actions.setViewProgressModalStatus(false)
      })
    }
  }

  render() {
    const {cardTemplateData, editMode, updateCard} = this.state
    const {auth} = this.props
    return (<div>
      {
        cardTemplateData !== null && (
          <Grid container direction="column" style={{maxWidth: 640, margin: '0 auto'}}>
            <Grid container direction="row" style={{margin: '24px auto'}}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <CardPreview
                      organizationInfo={{avatar: auth.avatar,name: auth.name}}
                      cardBackgroundImage={editMode ? updateCard.image :cardTemplateData['image']}
                      cardName={editMode ? updateCard.name : cardTemplateData['name']}/>
                  </Grid>
                  <Grid item>
                    {editMode && (
                      <Button raised color="primary" style={{color: '#fff', width:'100%'}}>
                        上传卡片图案
                        <input id="imageButton"
                          style={styles.exampleImageInput}
                          type="file"
                          onChange={(e) => {this.uploadCardBackgroundImage(e)}}></input>
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    {editMode && (<Button style={{marginRight: 16}} onClick={() =>  this.handleSubmitUpdatedCard() }>更新</Button>)}
                    <Button onClick={() =>  this.toggleMode() } flat={editMode}>{editMode ? '取消' : '编辑'}</Button>
                  </Grid>
                  <Grid item style={{marginTop: 0}}>
                    <a style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>发行日期</a>
                    {this.renderFromNowTime(cardTemplateData["created_at"])}
                  </Grid>
                  <Grid item style={{marginTop: 0}}>
                    <a style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>卡片类型</a>
                    <p style={{margin: 0 }}>{Object.keys(cardTypes).indexOf(cardTemplateData["type"]) >= 0 && cardTypes[cardTemplateData["type"]]}</p>
                  </Grid>
                  <Grid item style={{marginTop: 0}}>
                    <a style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>持卡人数</a>
                    <p style={{margin: 0 }}>{cardTemplateData["cards_count"]}</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Card style={styles.cardWrapper}>
                {editMode ? (
                  <Grid container direction="column">
                    <Grid item>
                      <TextField
                        id="name"
                        label="卡片名称"
                        margin="normal"
                        value={this.state.updateCard.name}
                        onChange={this.handleCardInfoUpdate('name')}/>
                    </Grid>
                    <Grid item style={{marginBottom: 32}}>
                      <TextField
                        id="name"
                        label="卡片描述"
                        margin="normal"
                        multiline
                        value={this.state.updateCard.description}
                        onChange={this.handleCardInfoUpdate('description')}/>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container direction="column">
                    <Grid item style={{marginTop: 16}}>
                      <a style={{fontSize: '18px',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>卡片名称</a>
                      <p style={{marginTop: 8 }}>{cardTemplateData["name"]}</p>
                    </Grid>
                    <Grid item>
                      <a style={{fontSize: 'marginTop',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>卡片描述</a>
                      <p style={{marginTop: 8 }}>{cardTemplateData["description"]}</p>
                    </Grid>
                  </Grid>
                )}
              </Card>
            </Grid>
          </Grid>
        )
      }
    </div>)
  }
}

const mapStatesToProps = (states) => {
  return {
    auth: states.auth,
    cardTemplates: states.data.cardTemplates
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, ViewActions, DataActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(CardTemplateDetail);

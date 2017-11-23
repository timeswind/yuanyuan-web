import React from 'react';
import {connect} from 'react-redux';
import * as DataActions from '../../../redux/actions/data';
import CardPreview from '../../../components/CardPreview';
import {bindActionCreators} from 'redux';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from '../../../components/colorfullButton';
import TextField from 'material-ui/TextField';

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
    editMode: false
  }

  componentDidMount() {
    const self = this
    if (this.props.params.id) {
      const id = this.props.params.id
      if (this.props.cardTemplates.allIds.indexOf(id) >= 0) {
        console.log(this.props.cardTemplates.byIds[id])
        this.setState({cardTemplateData: this.props.cardTemplates.byIds[id]})
      } else {
        this.props.actions.fetchCardtemplate(id).then(function() {
          self.retriveData()
        })
      }
    }
  }

  retriveData() {
    const id = this.props.params.id
    if (this.props.cardTemplates.allIds.indexOf(id) >= 0) {
      console.log(this.props.cardTemplates.byIds[id])
      this.setState({cardTemplateData: this.props.cardTemplates.byIds[id]})
    }
  }

  toggleMode () {
    this.setState({editMode: !this.state.editMode})
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
  }

  render() {
    const {cardTemplateData, editMode} = this.state
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
                      cardBackgroundImage={cardTemplateData['image']}
                      cardName={cardTemplateData['name']}/>
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
                    {editMode && (<Button style={{marginRight: 16}}>更新</Button>)}
                    <Button onClick={() =>  this.toggleMode() } flat={editMode}>{editMode ? '取消' : '编辑'}</Button>
                  </Grid>
                  <Grid item style={{marginTop: 0}}>
                    <a style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>发行日期</a>
                    <p style={{margin: 0 }}>{cardTemplateData["created_at"]}</p>
                  </Grid>
                  <Grid item style={{marginTop: 0}}>
                    <a style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>卡片类型</a>
                    <p style={{margin: 0 }}>{cardTemplateData["type"]}</p>
                  </Grid>
                  <Grid item style={{marginTop: 0}}>
                    <a style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.87)',fontWeight: 'bold'}}>持卡人数</a>
                    <p style={{margin: 0 }}>{cardTemplateData["created_at"]}</p>
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
                        margin="normal"/>
                    </Grid>
                    <Grid item style={{marginBottom: 32}}>
                      <TextField
                        id="name"
                        label="卡片描述"
                        margin="normal"
                        multiline />
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
  return {auth: states.auth, cardTemplates: states.data.cardTemplates};
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, DataActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(CardTemplateDetail);

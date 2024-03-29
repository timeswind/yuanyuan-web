import React from 'react';
import List, { ListItem } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import CreateCardTemplateForm from '../../../forms/CreateCardTemplateForm'
import { uploadImageWithFolder } from '../../../core/upload';
import * as ViewActions from '../../../redux/actions/view';
import * as DataActions from '../../../redux/actions/data';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from '../../../components/colorfullButton';
import CardPreview from '../../../components/CardPreview';

function TabContainer (props) {
  return <div>{props.children}</div>
}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  submitColorfullButton: {
    position: 'fixed',
    color: '#fff',
    bottom: 32,
    right: 32,
    zIndex: 999
  },
  CreateCardTemplateForm: {
    maxWidth: 800,
    margin: '0 auto',
    marginTop: '32px'
  },
  fettingCircularProgressWrapperShow: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 32
  },
  fettingCircularProgressWrapperHide: {
    display: 'none'
  },
  cardListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

class ManageCardDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };
  }

  goToCardDetail = (id) => {
    var path = '/organization/card/' + id
    this.props.dispatch(push(path))
  }

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
    if (value === 1) {
      this.props.actions.fetchCardtemplates()
    }
  };


  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  handleSubmitCard (form) {
    const self = this
    self.props.actions.setViewProgressModalStatus(true)
    if ("file" in form) {
      uploadImageWithFolder(form.file, 'card_image').then(function(response){
        form["image"] = response.data.link
        self.props.actions.createNewCardtemplate(form).then(function(response) {
          self.props.actions.setViewProgressModalStatus(false)
          self.props.actions.fetchCardtemplates()
          self.setState({ tab: 1 });
        })
      })
    }
  }

  render() {
    const { auth, cardTemplates } = this.props;
    const { tab } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={tab} onChange={this.handleTabChange}>
            <Tab label="发卡" />
            <Tab label="管理卡片" />
          </Tabs>
        </AppBar>
        {tab === 0 &&
          <TabContainer>
            <div>
              <CreateCardTemplateForm style={styles.CreateCardTemplateForm}
                organizationInfo={{avatar: auth.avatar, name: auth.name}}
                onSubmit={(form) => this.handleSubmitCard(form)} />
            </div>
          </TabContainer>}
          {tab === 1 &&
            <TabContainer>
              <div style={cardTemplates.fetching ? styles.fettingCircularProgressWrapperShow : styles.fettingCircularProgressWrapperHide}>
                <CircularProgress style={{margin: '0 auto', width: 50}} size={50} />
              </div>
              <div style={styles.cardListWrapper}>
                <List>
                  {cardTemplates.allIds.map((id) => (
                    <SelfIssuesCard
                      key={id}
                      goToDetial={this.goToCardDetail}
                      cardTemplateData={cardTemplates.byIds[id]}
                      organizationInfo={{avatar: auth.avatar, name: auth.name}}/>
                  ))}
                </List>
              </div>
            </TabContainer>
          }
        </div>
      );
    }
  }

  class SelfIssuesCard extends React.PureComponent {

    handleManageButtonOnClick() {
      this.props.goToDetial(this.props.cardTemplateData["_id"])
    }

    render() {
      const { cardTemplateData, organizationInfo } = this.props
      return (
        <ListItem>
          <Card style={{width: '100%'}}>
            <CardContent style={{padding: 16}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{marginBottom: 16}}>
                  <CardPreview
                    style={{border: '1px solid #ddd'}}
                    organizationInfo={organizationInfo}
                    cardBackgroundImage={cardTemplateData['image']}
                    cardName={cardTemplateData['name']}/>
                </div>
                <div>
                  <p style={{fontWeight: 'bold', marginTop: 0, marginBottom: 8}}>名称</p>
                  <Typography type="headline" component="h2" style={{marginBottom: 16}}>
                    {cardTemplateData['name']}
                  </Typography>
                  <p style={{fontWeight: 'bold', marginBottom: 8}}>卡片描述</p>
                  <Typography component="p" style={{maxWidth: "300px"}}>
                    {cardTemplateData['description']}
                  </Typography>
                </div>
              </div>
            </CardContent>
            <Grid container direction={'row'} justify={'flex-end'} style={{padding: 16}}>
              <Grid item>
                <Button color="primary" style={{color: '#fff'}} onClick={()=>{this.handleManageButtonOnClick()}}>
                  管理
                </Button>
              </Grid>
            </Grid>
          </Card>
        </ListItem>
      )
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

  export default connect(mapStatesToProps, mapDispatchToProps)(ManageCardDashboard);

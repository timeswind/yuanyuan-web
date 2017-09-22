import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import {EditorState, convertToRaw} from 'draft-js';
// import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Dashboard.css'
import ColorfullButton from '../../components/colorfullButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { uploadArticleImage } from '../../core/upload';


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
  }
};

class OrganizationDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      title: '',
      tab: 0,
      value: 0,
      editorState: EditorState.createEmpty(),
      submitStatus: 'unsubmited',
      snackbarStatus: false
    };
    this.localmoment = moment()
    this.localmoment.locale('fr')
    this.localmoment.format('LLLL')
    this.onChange = (editorState) => this.setState({editorState});
  }

  renderFromNowTime(date) {
    return (<div>{moment(date).locale('zh-cn').fromNow()}</div>)
  }

  componentDidMount() {
    this.getMyArticles()
  }

  goToArticleDetail = (id) => {
    var path = '/organization/article/' + id
    this.props.dispatch(push(path))
  }

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };


  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  getMyArticles() {
    var self = this
    axios.get('/api/protect/articles/mine')
    .then(function (response) {
      if (response.data.success) {
        self.setState({articles: response.data.articles})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submit = () => {
    const self = this
    this.setState({submitStatus: 'submitting', snackbarStatus: true})
    axios.post('/api/protect/newarticle', {
      title: this.state.title,
      content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    })
    .then(function (response) {
      self.setState({submitStatus: 'success', tab: 0})
      self.getMyArticles()
    })
    .catch(function (error) {
      console.log(error);
      self.setState({submitStatus: 'failed'})
    });
  }

  handleRequestCloseSnackbar = () => {
    this.setState({
      snackbarStatus: false
    });
  };

  render() {
    const { tab } = this.state;
    return (
      <div className="view-body">
        <AppBar position="static">
          <Tabs value={tab} onChange={this.handleTabChange}>
            <Tab label="我的文章" />
            <Tab label="撰写" />
          </Tabs>
        </AppBar>
        {tab === 0 &&
          <TabContainer>
            <List>
              {this.state.articles.map((article) =>
                <ListItem
                  button
                  key={article._id}
                  style={{borderBottom: '1px solid #ddd'}}
                  onClick={()=>{this.goToArticleDetail(article._id)}}
                  >
                  <ListItemText primary={article.title} secondary={this.renderFromNowTime(article.created_at)} />
                </ListItem>
              )}
            </List>
          </TabContainer>}
          {tab === 1 &&
            <TabContainer>
              <div style={{height: "100%", background: "#fff"}}>
                <div>
                  <TextField
                    style={{fontSize: 24, margin: 16, width: "calc(100% - 32px)"}}
                    label="标题"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    />
                </div>
                <Editor
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="editorWrapper"
                  editorClassName="editor"
                  onEditorStateChange={this.onChange}
                  toolbar={{
                    image: { urlEnabled: true, uploadEnabled: true, uploadCallback: uploadArticleImage, defaultSize: { width: "100%", height: "auto" }}
                  }}
                  />
                {this.state.tab === 1 && (<ColorfullButton raised style={styles.submitColorfullButton} onClick={this.submit}>发布</ColorfullButton>)}
              </div>
            </TabContainer>
          }
        </div>
      );
    }
  }
  // const mapStatesToProps = (states) => {
  //   return {
  //     search: states.search
  //   };
  // }

  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch
    };
  }

  export default connect(null, mapDispatchToProps)(OrganizationDashboard);

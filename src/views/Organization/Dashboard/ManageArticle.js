import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import {EditorState, convertToRaw} from 'draft-js';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ManageArticle.css'
import ColorfullButton from '../../../components/colorfullButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { uploadArticleImage } from '../../../core/upload';
import { handlePastedText } from '../../../utils/handlePaste';

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
      author: '',
      editorState: EditorState.createEmpty(),
      tab: 0,
      value: 0,
      submitStatus: 'unsubmited',
      snackbarStatus: false
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  renderFromNowTime(date) {
    return (<a>{moment(date).locale('zh-cn').fromNow()}</a>)
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

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }

  handlePastedText = (text, html) => {
    const { editorState } = this.state;
    return handlePastedText(text, html, editorState, this.onChange);
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

  getCoverUrl(entityMap) {
    var coverUrl = ''
    if (Object.keys(entityMap).length > 0) {
      for (let [k, entity] of Object.entries(entityMap)) {
        if (entity.type === 'IMAGE') {
          coverUrl = entity[0].data.src
          break
        }
      }
    }
    if (coverUrl !== '') {
      return coverUrl
    } else {
      return ''
    }
  }

  submit = () => {
    const self = this
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent())
    this.setState({submitStatus: 'submitting', snackbarStatus: true})
    axios.post('/api/protect/newarticle', {
      title: this.state.title,
      author: this.state.author,
      content: JSON.stringify(rawContent),
      cover: self.getCoverUrl(rawContent)
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
      <div>
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
                  <TextField
                    style={{margin: 16, width: "160px"}}
                    label="作者"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                    />
                </div>
                <Editor
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="editorWrapper"
                  editorClassName="editor"
                  onEditorStateChange={this.onChange}
                  handlePastedText={this.handlePastedText}
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

import React from 'react';
import axios from 'axios';
import {push} from 'react-router-redux';
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {connect} from 'react-redux';
import ColorfullButton from '../../components/colorfullButton';
import TextField from 'material-ui/TextField';
import { uploadArticleImage } from '../../core/upload';
import { handlePastedText } from '../../utils/handlePaste';
import * as DataActions from '../../redux/actions/data';
import {bindActionCreators} from 'redux';

const styles = {
  headline: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 400,
  },
  submitButton: {
    position: 'fixed',
    color: '#fff',
    bottom: 32,
    right: 32,
    zIndex: 999
  },
  articleWrapper: {
    padding: "16px 16px 0 16px",
    margin: "90px 32px 0 32px",
    border: "1px solid #ddd",
    background: "#fff"
  }
};

class EditArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      isAuthor: false,
      submitStatus: 'unsubmited',
      editorState: EditorState.createEmpty()
    };
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

  componentWillMount() {
    const { auth, routeParams } = this.props
    const self = this
    axios.get('/api/public/article?id=' + routeParams.id)
    .then(function (response) {
      if (response.data.success) {
        console.log(JSON.parse(response.data.article.content))
        self.setState({
          id: response.data.article._id,
          title: response.data.article.title,
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.article.content)))
        })
        if (auth.id === response.data.article.user) {
          self.setState({isAuthor: true})
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  onEditorChange = (editorState) => this.setState({editorState})

  handleTitleChange = (event) => this.setState({ title: event.target.value })

  submit = () => {
    const self = this
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent())
    this.setState({submitStatus: 'submitting', snackbarStatus: true})
    axios.put('/api/protect/article', {
      _id: this.state.id,
      title: this.state.title,
      content: JSON.stringify(rawContent),
      cover: self.getCoverUrl(rawContent)
    })
    .then(function (response) {
      if (response.data.success) {
        self.setState({submitStatus: 'success'})
        self.props.dispatch(push(`/organization/article/${self.state.id}`))
      }
    })
    .catch(function (error) {
      console.log(error);
      self.setState({submitStatus: 'failed'})
    });
  }

  handlePastedText = (text, html) => {
    const { editorState } = this.state;
    return handlePastedText(text, html, editorState, this.onEditorChange);
  }

  render() {
    return (
      <div style={{margin: "auto", maxWidth: 800}}>
        <div style={styles.articleWrapper}>
          <TextField
            style={{fontSize: 24, margin: 16, width: "calc(100% - 32px)"}}
            label="标题"
            value={this.state.title}
            onChange={this.handleTitleChange}
            />
          <Editor
            editorState={this.state.editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="editorWrapp`er"
            editorClassName="editor"
            handlePastedText={this.handlePastedText}
            onEditorStateChange={this.onEditorChange}
            toolbar={{
              image: { urlEnabled: true, uploadEnabled: true, uploadCallback: uploadArticleImage, defaultSize: { width: "100%", height: "auto" }}
            }}
            />
          <ColorfullButton raised style={styles.submitButton} onClick={this.submit}>更新并发布</ColorfullButton>
        </div>
      </div>
    )
  }
}


const mapStatesToProps = (states) => {
  return {
    auth: states.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, DataActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(EditArticleView);

import React from 'react';
import axios from 'axios';
import {push} from 'react-router-redux';
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { uploadArticleImage } from '../../core/upload';

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

  componentWillMount() {
    const self = this
    axios.get('/api/public/article?id=' + this.props.routeParams.id)
    .then(function (response) {
      if (response.data.success) {
        console.log(response.data)
        self.setState({
          id: response.data.article._id,
          title: response.data.article.title,
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.article.content)))
        })
        if (self.props.auth.id === response.data.article.user) {
          self.setState({isAuthor: true})
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onEditorChange = (editorState) => this.setState({editorState})

  handleTitleChange = (event) => this.setState({ title: event.target.value })

  submit = () => {
    const self = this
    this.setState({submitStatus: 'submitting', snackbarStatus: true})
    axios.put('/api/protect/article', {
      _id: this.state.id,
      title: this.state.title,
      content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
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
            onEditorStateChange={this.onEditorChange}
            toolbar={{
              image: { urlEnabled: true, uploadEnabled: true, uploadCallback: uploadArticleImage, defaultSize: { width: "100%", height: "auto" }}
            }}
            />
          <Button raised style={styles.submitButton} onClick={this.submit}>更新并发布</Button>
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
    dispatch
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(EditArticleView);

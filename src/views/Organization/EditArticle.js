import React from 'react';
import axios from 'axios';
import {push} from 'react-router-redux';
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import 'moment/locale/zh-cn';

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

  uploadImage(image) {
    var today = new Date();
    const bucket = "yuanyuanofficial" // yuanyuanofficial
    const region = "us-east-1" // us-east-1
    const folder = "article_images/" // 'article_images/'
    const expiration = new Date(today.getTime() + 10*60000).toISOString() //"2017-09-14T12:00:00.000Z"
    const date = moment().format('YYYYMMDD')

    return new Promise(function (resolve, reject) {
      axios.get(`/api/protect/upload-pic-token?bucket=${bucket}&region=${region}&folder=${folder}&expiration=${expiration}&date=${date}&filename=${image.name}`)
      .then(function (response) {
        if (response.data.success) {
          const Policy = response.data.Policy
          const XAmzSignature = response.data["X-Amz-Signature"]
          var formData = new FormData();
          formData.append("key", `${folder}${image.name}`);
          formData.append("acl", "public-read")
          formData.append("Content-Type", `${image.type}`)
          formData.append("x-amz-meta-uuid", "14365123651274")
          formData.append("X-Amz-Credential", `AKIAJEIJLWEBQFRI2M7Q/${date}/${region}/s3/aws4_request`)
          formData.append("x-amz-meta-tag", "")
          formData.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256")
          formData.append("X-Amz-Date", `${date}T000000Z`)
          formData.append("Policy", Policy)
          formData.append("X-Amz-Signature", XAmzSignature)
          formData.append("file", image)
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://yuanyuanofficial.s3.amazonaws.com/");
          xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              resolve({ data: { link: `http://yuanyuanofficial.s3.amazonaws.com/${folder}${image.name}` } });
            } else {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            }
          };
          xhr.send(formData);
        }
      })
    });
  }

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
              image: { urlEnabled: true, uploadEnabled: true, uploadCallback: this.uploadImage, defaultSize: { width: "100%", height: "auto" }}
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

import React from 'react';
import axios from 'axios';
import {Editor, convertFromRaw, EditorState} from 'draft-js';

const styles = {
  articleWrapper: {
    maxWidth: '740px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20
  },
  title: {
    paddingBottom: 10,
    marginBottom: 14,
    borderBottom: "1px solid #e7e7eb"
  }
}

class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(), title: ''};
    // this.onChange = (editorState) => this.setState({editorState});
  }

  componentWillMount() {
    const self = this
    axios.get('/api/public/article?id=' + this.props.routeParams.id)
    .then(function (response) {
      if (response.data.success) {
        console.log(response.data)
        self.setState({title: response.data.article.title, editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.article.content)))})
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div style={styles.articleWrapper}>
        <h1 style={styles.title}>{this.state.title}</h1>
        <Editor readOnly={true} editorState={this.state.editorState}></Editor>
      </div>
    )
  }
}

export default ArticleView

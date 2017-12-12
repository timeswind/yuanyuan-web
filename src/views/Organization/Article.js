import React from 'react';
import axios from 'axios';
import {push} from 'react-router-redux';
import {convertFromRaw, EditorState} from 'draft-js';
import {Editor} from 'draft-js';
import LazyLoad from 'react-lazyload';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import ColorfullButton from '../../components/colorfullButton';
import * as DataActions from '../../redux/actions/data';
import {bindActionCreators} from 'redux';

const styles = {
  articleWrapper: {
    maxWidth: '740px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '16px 32px',
    marginTop: 32,
    border: '1px solid #ddd',
    backgroundColor: "#fff"
  },
  title: {
    paddingBottom: 10,
    marginBottom: 14,
    borderBottom: "1px solid #e7e7eb"
  }
}

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return {
      component: MediaComponent,
      editable: false
    };
  }
}

class MediaComponent extends React.Component {
  render() {
    const {block, contentState} = this.props;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    const source = data.src
    return (
      <LazyLoad throttle={0} height={300}>
        <img alt="" src={source} style={{width: "100%"}}/>
      </LazyLoad>
    )
    // Return a <figure> or some other content using this data.
  }
}

class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      editorState: EditorState.createEmpty(),
      title: '',
      isAuthor: false
    };
  }

  edit = () => {
    console.log('edit')
    this.props.dispatch(push(`/organization/article/${this.state.id}/edit`))
  }

  delete = () => {
    const {id} = this.state
    const {actions, dispatch} = this.props
    actions.deleteArticle(id).then(function(response) {
      dispatch(push(`/organization/article`))
    })
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
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.article.content)))})
        if (self.props.auth.id === response.data.article.user) {
          self.setState({isAuthor: true})
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div style={styles.articleWrapper}>
        {this.state.isAuthor && (
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 32}}>
            <ColorfullButton color="primary" raised style={{color: '#fff'}} onClick={this.edit}>编辑</ColorfullButton>
            <Button style={{color: 'red'}} onClick={this.delete}>删除</Button>
          </div>
        )}
        <h1 style={styles.title}>{this.state.title}</h1>
        <Editor readOnly={true} editorState={this.state.editorState} blockRendererFn={myBlockRenderer}/>
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

export default connect(mapStatesToProps, mapDispatchToProps)(ArticleView);

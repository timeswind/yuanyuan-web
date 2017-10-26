import React from 'react';
import {connect} from 'react-redux';
import * as DataActions from '../../../redux/actions/data';
import CardPreview from '../../../components/CardPreview';
import { bindActionCreators } from 'redux';

class CardTemplateDetail extends React.Component {
  state = {
    cardTemplateData: null
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

  render() {
    const { cardTemplateData } = this.state
    const { auth } = this.props
    return (
      <div>
        {cardTemplateData !== null && (
          <CardPreview organizationInfo={{avatar: auth.avatar, name: auth.name}}
            cardBackgroundImage={cardTemplateData['image']}
            cardName={cardTemplateData['name']}/>
        )}
      </div>
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
    actions: bindActionCreators(Object.assign({}, DataActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(CardTemplateDetail);

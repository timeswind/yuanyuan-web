import React from 'react';
import {connect} from 'react-redux';
import * as DataActions from '../../../redux/actions/data';
import CardPreview from '../../../components/CardPreview';
import {bindActionCreators} from 'redux';
import Card from 'material-ui/Card';

const styles = {
  cardWrapper: {
    maxWidth: 800,
    margin: "32px auto",
    display: 'flex',
    flexDirection: 'column'
  }
};

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
    const {cardTemplateData} = this.state
    const {auth} = this.props
    return (<div>
      {
        cardTemplateData !== null && (
          <div>
            <CardPreview style={{margin: '0 auto'}}
              organizationInfo={{
                avatar: auth.avatar,
                name: auth.name
              }} cardBackgroundImage={cardTemplateData['image']} cardName={cardTemplateData['name']}/>
            <Card style={styles.cardWrapper}>
              <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px'
                }}>
                <div>
                    <div style={{
                        marginTop: 16
                      }}>
                      <a style={{
                          fontSize: '1.5rem',
                          color: 'rgba(0, 0, 0, 0.87)',
                          fontWeight: 'bold'
                        }}>卡片描述</a>
                        <p style={{
                            marginTop: 0
                          }}>{cardTemplateData["description"]}</p>
                        </div>
                      </div>

                    </div>
                  </Card>

                </div>
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

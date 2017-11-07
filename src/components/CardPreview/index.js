import React from 'react'
const styles = {

  cardPreview: {
    borderRadius: 12,
    width: 300,
    height: 180,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column"
  },
  cardOrganizationIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #fff",
    boxShadow: "#aaa 0px 1px 2px",
    backgroundColor: "#fff",
    marginTop: "16px",
    marginLeft: "16px",
    padding: "4px",
    marginRight: "8px"
  },
  cardOrganizationName: {
    marginTop: 16,
    marginBottom: 0,
    color: "#fff",
    textShadow: "#666 1px 1px 1px"
  },
  cardName: {
    marginTop: 0,
    marginBottom: 0,
    color: "#fff",
    textShadow: "#666 1px 1px 1px"
  },
  cardNumber: {
    marginTop: 'auto',
    marginRight: 16,
    marginBottom: 16,
    color: "#fff",
    textShadow: "#666 1px 1px 1px",
    letterSpacing: '1px',
    textAlign: 'right'
  }
}

class CardPreview extends React.Component {
  render() {
    const { cardName, organizationInfo, cardBackgroundImage } = this.props
    return (
      <div style={{...styles.cardPreview, ...{backgroundImage: `url(${cardBackgroundImage})`}}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <img style={styles.cardOrganizationIcon} src={organizationInfo.avatar} alt=""/>
            <div style={{display: 'flex', flexDirection: "column"}}>
              <p style={styles.cardOrganizationName}>{organizationInfo.name}</p>
              <p style={styles.cardName}>{cardName}</p>
            </div>
          </div>
          <div style={styles.cardNumber}>
            000000001
          </div>
        </div>
      </div>
    )
  }
}

export default CardPreview

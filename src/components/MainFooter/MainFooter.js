import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';

const MainFooterStyle = {
  padding: "72px 24px",
  boxSizing: "border-box",
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  textAlign: "center",
  color: "#fff"
}

class MainFooter extends Component {
  render() {
    return (
      <div className="main-footer" style={MainFooterStyle}>
        <p style={{fontSize: "13px"}}>Yuanyuan © 2017. All Rights Reserved.</p>
      </div>
    );
  }
}

export default MainFooter;

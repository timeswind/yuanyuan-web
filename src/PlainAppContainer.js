import React from 'react';
import Navbar from './components/Navbar/Navbar'

class PlainAppContainer extends React.Component {
  render () {
    const {children} = this.props
    return (
      <div>
        <div  style={{paddingLeft: 32, backgroundColor: '#fff'}}>
          <Navbar/>
        </div>
        {children}
      </div>
    )
  }
}

export default PlainAppContainer

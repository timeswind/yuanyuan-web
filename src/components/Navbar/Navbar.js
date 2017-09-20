import React, { Component } from 'react';
import * as AuthActions from '../../redux/actions/auth.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMenuOpen: false,
      anchorEl: {}
    };
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      userMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClick = event => {
    this.setState({ userMenuOpen: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({
      userMenuOpen: false,
    });
  };

  logout() {
    const { actions } = this.props;
    actions.logout()
    this.routerPush('/')
  }

  routerPush (path) {
    this.props.dispatch(push(path))
  }

  render() {
    const { auth } = this.props
    return (
      <div className="navbar-wrapper">
        <div className="navbar flex-row flex-center">
          <a className="nav-brand-text"
            onClick={() => {
              this.routerPush('/')
            }}>
            YUANYUAN
          </a>
          {auth.isLogin && (

            <div style={{marginLeft: 'auto'}}>
              <IconButton
                aria-label="More"
                aria-owns={this.state.open ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.userMenuOpen}
                onRequestClose={this.handleRequestClose}
                PaperProps={{
                  style: {
                    width: 200,
                  },
                }}
                >
                <MenuItem onClick={() => this.logout()}>
                  登出
                </MenuItem>
              </Menu>
            </div>
          )}

        </div>
      </div>
    );
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
    actions: bindActionCreators(Object.assign({}, AuthActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Navbar);

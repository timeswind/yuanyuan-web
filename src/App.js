import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar'
import Snackbar from 'material-ui/Snackbar';
import * as ViewActions from './redux/actions/view'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import './App.css';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import {SideMenu} from './sideMenu';
import PlainAppContainer from './PlainAppContainer';
import ProgressModal from './components/ProgressModal';

const drawerWidth = 240;


class App extends Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleRequestClose = (event, reason) => {
    this.props.actions.setViewSnackbarStatus({status: false, message: ''})
  };

  render() {
    const { children, view, classes, theme, location } = this.props
    return (
      <div>
        <ProgressModal show={view.progressModal}/>
        {location.pathname === '/' ? (
          <PlainAppContainer>{children}</PlainAppContainer>
        ) : (
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                <Toolbar disableGutters={!this.state.open}>
                  <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, this.state.open && classes.hide)}
                    >
                    <MenuIcon />
                  </IconButton>
                  <Navbar />
                </Toolbar>
              </AppBar>
              <Drawer
                type="permanent"
                classes={{
                  paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                }}
                open={this.state.open}
                >
                <div className={classes.drawerInner}>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                  </div>
                  <Divider />
                  <List className={classes.list}>
                    <SideMenu />
                  </List>
                </div>
              </Drawer>
              <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
                <div>
                  {children}
                </div>
              </main>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={view.snackbarOpen}
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{view.snackbarMessage}</span>}
              />
          </div>
        )}
      </div>
    )
  }
}

const mapStatesToProps = (states) => {
  return {
    view: states.view
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, ViewActions), dispatch)
  };
}

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    background: "#fff"
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    background: "#fff"
  },
  appBar: {
    position: 'fixed',
    backgroundColor: "#fff",
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px 8px',
    color: "#fff",
    ...theme.mixins.toolbar,
  },
  content: {
    marginLeft: 61,
    width: `calc(100% - 61px)`,
    flexGrow: 1,
    backgroundColor: "#fff",
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  contentShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  }
});

App = withStyles(styles, { withTheme: true })(App)

export default connect(mapStatesToProps, mapDispatchToProps)(App);

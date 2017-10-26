import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import WifiIcon from 'material-ui-icons/Wifi';
import BluetoothIcon from 'material-ui-icons/Bluetooth';
import { uploadAvatarImage } from '../../../core/upload';
import {connect} from 'react-redux';
import * as AuthActions from '../../../redux/actions/auth';
import * as ViewActions from '../../../redux/actions/view';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    margin: '32px auto',
    background: theme.palette.background.paper,
  },
});

class OrganizationSettings extends React.Component {
  state = {
    checked: ['wifi'],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  uploadAvatar(e) {
    let file = e.target.files[0];
    console.log(file)
    const self = this
    self.props.actions.setViewProgressModalStatus(true)
    uploadAvatarImage(file).then(function(response){
      console.log(response.data.link)
      self.props.actions.updateAvatar(response.data.link)
      self.props.actions.setViewProgressModalStatus(false)
    })
  }

  render() {
    const { classes, auth } = this.props;

    return (
      <div className={classes.root}>
        <List subheader={<ListSubheader>设置</ListSubheader>}>
          <ListItem button onClick={() => {this.inputElement.click()}}>
            <ListItemText primary="显示图标/头像" secondary="更换图片" />
            <input ref={input => this.inputElement = input} type="file" onChange={(e) => {this.uploadAvatar(e)}} style={{display: 'none'}}/>
            <img alt="" style={{width: 50, height: 50}} src={auth.avatar !== null ? auth.avatar :  "https://via.placeholder.com/50x50"} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Wi-Fi" />
            <ListItemSecondaryAction>
              <Switch
                onClick={this.handleToggle('wifi')}
                checked={this.state.checked.indexOf('wifi') !== -1}
                />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BluetoothIcon />
            </ListItemIcon>
            <ListItemText primary="Bluetooth" />
            <ListItemSecondaryAction>
              <Switch
                onClick={this.handleToggle('bluetooth')}
                checked={this.state.checked.indexOf('bluetooth') !== -1}
                />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}

OrganizationSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

OrganizationSettings = withStyles(styles)(OrganizationSettings)

const mapStatesToProps = (states) => {
  return {
    auth: states.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(Object.assign({}, AuthActions, ViewActions), dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(OrganizationSettings);

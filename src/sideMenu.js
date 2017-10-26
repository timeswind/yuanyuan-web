import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CreateIcon from 'material-ui-icons/Create';
import CardMembershipIcon from 'material-ui-icons/CardMembership';
// import StarIcon from 'material-ui-icons/Star';
// import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import SettingIcon from 'material-ui-icons/Settings';
import {push} from 'react-router-redux';
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider';

class SideMenuClass extends React.Component {

  navigate(destination) {
    this.props.dispatch(push(destination))
  }

  render() {
    return (
      <div>
        <ListItem button onClick={() => this.navigate('/organization/article')}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="文章" />
        </ListItem>
        <ListItem button onClick={() => this.navigate('/organization/card')}>
          <ListItemIcon>
            <CardMembershipIcon />
          </ListItemIcon>
          <ListItemText primary="卡片" />
        </ListItem>
        <Divider></Divider>
        <ListItem button onClick={() => this.navigate('/organization/setting')}>
          <ListItemIcon>
            <SettingIcon />
          </ListItemIcon>
          <ListItemText primary="设置" />
        </ListItem>
      </div>
    )
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

export const SideMenu = connect(null, mapDispatchToProps)(SideMenuClass);

// export const mailFolderListItems = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <CreateIcon />
//       </ListItemIcon>
//       <ListItemText primary="文章" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <CardMembershipIcon />
//       </ListItemIcon>
//       <ListItemText primary="卡片" />
//     </ListItem>
//   </div>
// );

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);

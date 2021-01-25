import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import logo from '../logo.png';
 

class ChatListComponent extends React.Component {

  render() {

    const { classes } = this.props;

    if(this.props.chats.length > 0) {
      return(
        <main className={classes.root}>
            <List>
              {
                this.props.chats.map((_chat, _index) => {
                  return (
                    <div key={_index}>
                      <ListItem onClick={() => this.selectChat(_index)} 
                        className={classes.listItem} 
                        selected={this.props.selectedChatIndex === _index} 
                        alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp">{_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                  {_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}
                              </Typography>
                            </React.Fragment>
                          }/>
                          {
                            _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
                            <ListItemIcon><NotificationImportant className={classes.unreadMessage}/></ListItemIcon> :
                            null
                          }
                      </ListItem>
                      <Divider/>
                    </div>
                  )
                })
              }
            </List>
        </main>
      );
    } else {
      return(
        <div>
          <List component='h1' variant='h1'>
          <li><Link style={{textDecoration: 'none', color:'#58d0e1', display: 'flex',  justifyContent:'center', alignItems:'center'}} to='/dashboard'>Depression</Link></li>
          <li><Link style={{textDecoration: 'none', color:'#58d0e1', display: 'flex',  justifyContent:'center', alignItems:'center'}} to='/dashboard'>Anxiety</Link></li>
          <li><Link style={{textDecoration: 'none', color:'#58d0e1', display: 'flex',  justifyContent:'center', alignItems:'center'}} to='/dashboard'>OCD</Link></li>
          <li><Link style={{textDecoration: 'none', color:'#58d0e1', display: 'flex',  justifyContent:'center', alignItems:'center'}} to='/dashboard'>PTSD</Link></li>
          <li><Link style={{textDecoration: 'none', color:'#58d0e1', display: 'flex',  justifyContent:'center', alignItems:'center'}}>More coming soon!</Link></li>
          </List>
        </div>
      );
    }
  }
  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  selectChat = (index) => {
      this.props.selectChatFn(index);}
}

export default withStyles(styles)(ChatListComponent);
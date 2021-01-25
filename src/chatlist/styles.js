const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#fff5c7',
      boxShadow: '0px 0px 2px black'
    },
    listItem: {
      cursor: 'pointer'
    },
    Link: {
      width: '100vw'

    },
    newChatBtn: {
      borderRadius: '0px'
    },
    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    mainScreen: {
      width: '10vh',
      height: '10vh',
      marginLeft: '50%'
    },
  });
  
  export default styles;
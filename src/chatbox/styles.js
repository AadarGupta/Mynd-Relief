const styles = theme => ({

    sendBtn: {
      color: 'blue',
      cursor: 'pointer',
      '&:hover': {
        color: 'gray'
      }
    },
  
    chatTextBoxContainer: {
      position: 'absolute',
      bottom: '15px',
      paddingLeft: '35vw',
      boxSizing: 'border-box',
      overflow: 'auto',
      width: '100vw'
    },
  
    chatTextBox: {
      width: '100%'
    }
  
  });
  
  export default styles;
import React from 'react';
import ChatListComponent from '../chatlist/chatList';

class Mainpage extends React.Component {

    constructor(){
        super();
        this.state={
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats:[]
        };
    }

    render() {

        return(
            <ChatListComponent 
            history={this.props.history} 
            newChatBtnFn={this.newChatBtnClicked}
            selectChatFn={this.selectChat}
            chats={this.state.chats}
            userEmail={this.state.email}
            selectedChatIndex={this.state.selectedChat}/>
            );
    }
}

export default Mainpage;
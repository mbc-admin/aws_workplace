import React from 'react';

import './chatItem.css';
import {ImageAssets} from '../../utils/ImageAssets';

import DotQuantity from "../dotQuantity/dotQuantity.component";

const ChatItem = ({fullName, lastMessage, size, unreadMessages, press}) => {
    const text = 'Me gustaría que hablemos por videollamada para conocernos. Te...'

    return (
        <div className={'containerChatItem'} onClick={press}>
            <img className={'imageChatItem'} src={ImageAssets.userTest}/>

            <div className={'containerTextChatItem'}>
                <p className={'nameChatItem'}>{fullName}</p>
                <p className={'companyChatItem'}>Empresa XXX</p>
                <p className={'lastMessageChatItem'} >{lastMessage}</p>
            </div>

            <div className={'containerDetailsChatItem'}>
                <p className={'timeChatItem'}>10:05</p>
                <DotQuantity
                    size={'big'}
                    focus={false}
                    quantity={unreadMessages}
                />
            </div>
        </div>
    )
}

export default ChatItem;

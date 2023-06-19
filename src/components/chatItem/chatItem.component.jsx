import React from 'react';

import './chatItem.css';
import {ImageAssets} from '../../utils/ImageAssets';

import DotQuantity from "../dotQuantity/dotQuantity.component";

import moment from 'moment';

const ChatItem = ({image, fullName, lastMessage, size, unreadMessages, organization, timeLastMessage, press}) => {

    return (
        <div className={'containerChatItem'} onClick={press}>
            <div className={'containerImageChatItem'}>
                <img className={'imageChatItem'} src={image === null ? ImageAssets.userTest : `https://node.innobing.net/${image}`}/>
            </div>

            <div className={'containerTextChatItem'}>
                <p className={'nameChatItem'}>{fullName}</p>
                <p className={'companyChatItem'}>Empresa {organization}</p>
                <p className={'lastMessageChatItem'} >{lastMessage === 'videocall_started' ? 'Iniciar videollamada' : lastMessage}</p>
            </div>

            <div className={'containerDetailsChatItem'}>
                <p className={'timeChatItem'}>{timeLastMessage === '' ? '' : moment(timeLastMessage).format('HH:mm')}</p>
                <DotQuantity
                    size={'big'}
                    focus={false}
                    quantity={(unreadMessages && unreadMessages.hasOwnProperty('messages')) ? unreadMessages.messages : unreadMessages}
                />
            </div>
        </div>
    )
}

export default ChatItem;

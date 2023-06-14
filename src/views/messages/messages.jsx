import React, {useEffect, useState} from 'react';

import './messages.css';

import {useNavigate} from 'react-router-dom';

import Searcher from '../../components/searcher/searcher.component';
import ChatItem from '../../components/chatItem/chatItem.component';

import {getConversations} from '../../services/chat.service';

const Messages = () => {
    const [allChats, setAllChats] = useState(null)
    const [chats, setChats] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getConversations(1).then(conversations => {
            console.log('Conversaciones recogidas con exito', conversations.data)
            setAllChats(conversations.data);
            setChats(conversations.data);
        }).catch(err => {
            console.log('ERROR al recoger las conversaciones', err);
        })
    }, []);

    return (
        chats !== null &&
        <div className='containerMessages'>
            <p className='titleMessages'>Mensajes</p>

            <Searcher/>

            <div className={'containerChatsMessages'}>
                {chats.map(chat => {
                    console.log('THIS IS A CHAT', chat)
                    return (
                        <ChatItem
                            fullName={`${chat.channelUsers.user.name} ${chat.channelUsers.user.lastname}`}
                            lastMessage={chat.Messages.length > 0 && chat.Messages[0].content}
                            press={() => navigate(`/chat`, {state: {channelId: chat.id, idSession: chat.videocall_uuid}})}
                            unreadMessages={chat.unreadMessages.length}
                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Messages;

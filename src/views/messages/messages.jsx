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

    const searchChats = (value) => {
        if (value !== '') {
            let newChats = chats.filter(chat => {
                if (chat.channelUsers.user.name.toLowerCase().includes(value.toLowerCase())) return chat;
            })
            setChats(newChats);
        }
        else {
            setChats(allChats);
        }
    }

    return (
        chats !== null &&
        <div className='containerMessages'>
            <p className='titleMessages'>Mensajes</p>

            <Searcher changeValue={value => searchChats(value)}/>

            <div className={'containerChatsMessages'}>
                {chats.map(chat => {
                    return (
                        <ChatItem
                            image={chat.channelUsers.user.image}
                            fullName={`${chat.channelUsers.user.name} ${chat.channelUsers.user.lastname}`}
                            lastMessage={chat.Messages.length > 0 && chat.Messages[0].content}
                            press={() => navigate(`/chat`, {state: {channelId: chat.id, idSession: chat.videocall_uuid}})}
                            organization={chat.channelUsers.user.Organization !== null && chat.channelUsers.user.Organization.name}
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

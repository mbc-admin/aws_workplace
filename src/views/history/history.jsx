import React, {useEffect, useState} from 'react';

import './history.css';

import {useNavigate} from 'react-router-dom';

import Searcher from '../../components/searcher/searcher.component';
import HistoryItem from '../../components/historyItem/historyItem.component';

import {getFinishedChats} from '../../services/chat.service';

const History = () => {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFinishedChats().then(res => {
            console.log('Chats finalizados recogidos con exito', res.data);
            setChats(res.data);
        }).catch(err => {
            console.log('ERROR al recoger los chats finalizados', err);
        })
    }, [])

    return (
        <div className={'containerHistory'}>
            <p className='titleHistory'>Historial de mensajes</p>

            <Searcher/>

            <div className={'containerItemsHistory'}>
                {chats.map(chat => {
                    return (
                        <HistoryItem
                            image={chat.UserChannels[0].User.image}
                            name={chat.UserChannels[0].User.name + ' ' + chat.UserChannels[0].User.lastname}
                            company={chat.User.Organization.name}
                            date={chat.ended_at}
                            press={() => navigate(`/chatHistory`, {state: {channelId: chat.id}})}
                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default History;

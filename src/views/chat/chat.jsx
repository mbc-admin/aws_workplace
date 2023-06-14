import React, {useState, useRef, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import * as moment from 'moment';
import io from 'socket.io-client';
import {animateScroll, Events} from "react-scroll";

import './chat.css';
import {IconAssets, ImageAssets} from '../../utils/ImageAssets';

import ChatItem from '../../components/chatItem/chatItem.component';
import Writer from '../../components/writer/writer.component';
import Message from '../../components/message/message.component';
import InfoUserCard from '../../components/infoUserCard/infoUserCard.component';
import MenuChat from '../../components/menuChat/menuChat.component';
import {getConversations} from "../../services/chat.service";

import {sendMessage, getChannelMessages} from '../../services/chat.service';

const Chat = () => {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [showUserCard, setShowUserCard] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [chats, setChats] = useState(null);
    const [message, setMessage] = useState('');
    const [lastMessage, setLastMessage] = useState(null);
    const [idChat, setIdChat] = useState(null);
    const [idSession, setIdSession] = useState(location.state.idSession);

    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [actualConversation, setActualConversation] = useState();

    const [conversationsOpened, setConversationsOpened] = useState([]);

    const [channelPrevId, setChannelPrevId] = useState(null);
    const [channelNextId, setChannelNextId] = useState(location.state.channelId);


    const inputRef = useRef(null);
    const socketRef = useRef(null);
    const scrollRef = useRef(null);
    let formData = new FormData();

    useEffect(() => {
        setIdChat(location.state.channelId);
        console.log('LOCATIOOON', location);

        //RECOGE LAS CONVERSACIONES ABIERTAS
        getConversations(1).then(conversations => {
            console.log('Conversaciones recogidas con exito', conversations.data)
            setChannelNextId(location.state.channelId);
            setConversationsOpened(opened => [...opened, location.state.channelId]);
            let conversat = conversations.data.filter(conver => conver.id === Number(location.state.channelId));
            setActualConversation(conversat[0]);
            setMessages(conversat[0].Messages);
            /*conversations.data.map(res => {
                res.Messages.reverse();
            })*/
            setChats(conversations.data);

            //CONECTA EL SOCKET
            let token =localStorage.getItem('token');
            console.log('ENTER IN SOCKET CONNECT', token)
            socketRef.current = io('https://node.mybeatcoach.com/nsp-io-chat', {query: `token=${token}`});

            //OBTIENE LOS EVENTOS DEL SOCKET
            socketEvents(conversat[0]);
        }).catch(err => {
            console.log('ERROR al recoger las conversaciones', err);
        })
    }, []);

    const socketEvents = (conversation) => {
        //ENVIAMOS EL CHANNELID A NULL PARA HACER EL JOIN SOBRE TODAS LAS CONVERSACIONES NO SOBRE UNA CONCRETA
        socketRef.current.emit('join', {
            channelId: null,
            userId: conversation.channelUsers.coach.id,
            email: 'rmorenor97@gmail.com',
            socketId: socketRef.current.id,
            platform: 'web',
            appVersion: 'web'
        });

        socketRef?.current?.on('connect', () => {
            console.log('CONECT TO SOCKET', socketRef.current.id);
        });

        socketRef?.current?.on('welcome', () => {
            console.log('WELCOME TO SOCKET');
        });

        socketRef.current?.emit('coach-last-channel', {
            channel_prev_id: null,
            channel_next_id: location.state.channelId
        })

        socketRef?.current?.on('message-published', (e) => {
            console.log('message SOCKET NEW', e);
            console.log('idCHat SOCKET NEW', location.state.channelId);
            if (e.channel_id === location.state.channelId) {
                console.log('EQUALS CHAT')
                setMessages(messages => [e, ...messages]);
            } else {
                console.log('NOT EQUALS CHAT')
                getConversations(1).then(conversations => {
                    console.log('Conversaciones en el socket recogidas con exito', conversations.data)
                    let conversat = conversations.data.filter(conver => conver.id === location.state.channelId);
                    setMessages(conversat[0].Messages);
                    setChats(conversations.data);
                }).catch(err => {
                    console.log('ERROR al recoger las conversaciones en el socket', err)
                })
            }
        });

        socketRef?.current?.on('videocall-started', (e) => {
            console.log('videocall started',e);
        });

        socketRef?.current?.on('error', () => {
            console.log('CONECT SOCKET ERROR');
        });

        socketRef?.current?.on('disconnect', () => {
            console.log('CONECT SOCKET DISCONNECT');
            //removePushNotifications();
        });
    }

    //Recoge los mensajes de una conversacion al entrar
    const getMessagesChannel = (id) => {
        getChannelMessages(id).then(res => {
            console.log('Mensajes recogidos con exito', res.data);
            setMessages(res.data.Messages.reverse());
            let conversations = [];
            chats.map(chat => {
                if (chat.id !== id) {
                    conversations.push(chat);
                } else {
                    conversations.push(res.data);
                }
            })
            setChats(conversations);
        }).catch(err => {
            console.log('ERROR al recoger los mensajes', err);
        });
    }

    const sendNewMessage = () => {
        console.log('ID CHAT', idChat)
        sendMessage(idChat, actualConversation.channelUsers.coach.id, message).then(res => {
            setMessage('');
            console.log('Mensaje enviado con exito', res);
        }).catch(err => {
            console.log('ERROR al enviar el mensaje', err);
        })
    }

    const initVideochat = () => {
        socketRef?.current?.emit('initVideochat', {videocall_uuid: idSession});
        /*sendMessage(idChat, actualConversation.channelUsers.coach.id, '5876321976543').then(res => {
            let token = localStorage.getItem('token');
            //window.open(`https://videochat.innobing.net/sfu/${idChat}/${token}/`);
            window.open(`https://mbcwebchat.innobing.net/sfu/124/${token}`);
            setMessage('');
            console.log('Mensaje enviado con exito', res);
        }).catch(err => {
            console.log('ERROR al enviar el mensaje', err);
        })*/
    }

    const getFileObject = (value) => {
        let file = document.getElementById('inputFile').files[0];
        let type = file.type.split('/');
        console.log('TYPE', type)
        switch (type[0]) {
            case 'image':
                setTypeData('image');
            break;
            case 'video':
                setTypeData('video');
            break;
            case 'application':
                setTypeData('document');
            break;
        }
        formData.append('file', file);
        const reader = new FileReader();
        reader.readAsDataURL(value.target.files[0]);
        reader.onload = () => {
            setFilePreview(reader.result);
            console.log(reader.result);
        }
    }

    return (
        <div className={'containerBlocksChat'}>


            {showUserCard &&
                <InfoUserCard
                    close={value => setShowUserCard(value)}
                />
            }

            {showMenu && <MenuChat inputRef={inputRef} initVideochat={() => initVideochat()}/>}
            <input id={'inputFile'} ref={inputRef} hidden={true} type={'file'} onChange={value => getFileObject(value)}/>

            <div className={'blockChatsChat'}>
                <div className={'headerChat'}>
                    <img className={'iconBackChat'} src={IconAssets.back} onClick={() => {
                        socketRef?.current?.disconnect();
                        navigate('/')
                    }}/>
                </div>
                {chats !== null &&
                    <div className={'containerChatsChat'}>
                        {chats.map(chat => {
                            console.log('THIS IS A CHAT', chat)
                            return (
                                <ChatItem
                                    fullName={`${chat.channelUsers.user.name} ${chat.channelUsers.user.lastname} ${chat.id}`}
                                    lastMessage={lastMessage !== null && chat.id === idChat ? lastMessage.content : (chat.Messages.length > 0 ? chat.Messages[0].content : '')}
                                    size={'little'}
                                    unreadMessages={idChat === chat.id ? 0 : chat.unreadMessages.length}
                                    press={() => {
                                        if (chat.id !== channelNextId) {
                                            console.log('idCHAAAAAAAT', channelNextId)
                                            setChannelPrevId(location.state.channelId);
                                            setChannelNextId(chat.id);
                                            setIdChat(chat.id);
                                            setIdSession(chat.videocall_uuid);
                                            getMessagesChannel(chat.id);
                                            console.log('channel prev id', channelPrevId);
                                            console.log('channel next id', channelNextId);
                                            /*if (conversationsOpened.includes(chat.id)) {
                                                setActualConversation(chat);
                                                setMessages(chat.Messages);
                                            } else {
                                                setActualConversation(chat);
                                                setMessages(chat.Messages);
                                                setConversationsOpened(opened => [...opened, chat.id]);
                                            }*/

                                            socketRef.current?.emit('coach-last-channel', {
                                                channel_prev_id: location.state.channelId,
                                                channel_next_id: chat.id
                                            })
                                            location.state.channelId = chat.id
                                        }
                                    }}
                                />
                            )
                        })
                        }
                    </div>
                }
            </div>

            <div className={'containerChatChat'}>
                {actualConversation &&
                    <div className={'headerChat'}>
                        <img className={'imageUserChat'} src={ImageAssets.userTest} onClick={() => {
                            setShowUserCard(true);
                            setShowMenu(false);
                        }}/>
                        <p className={'nameUserChat'}  onClick={() => {
                            setShowUserCard(true);
                            setShowMenu(false);
                        }}>{`${actualConversation.channelUsers.user.name} ${actualConversation.channelUsers.user.lastname}`}</p>
                        <img className={'iconOptionsChat'} src={IconAssets.options} onClick={() => {
                            setShowMenu(!showMenu);
                            setShowUserCard(false);
                        }}/>
                    </div>
                }
                <div className={'containerChat'}>
                    {typeData === null ?
                        <div id={'containerMessages'} ref={scrollRef} className={'containerMessagesChat'} onLoad={() => console.log('BOTTTTTOMMMM')}>
                            {messages.length > 0 &&
                            (messages.map(message => {
                                    return (
                                        <Message
                                            sender={message.user_id === actualConversation.channelUsers.coach.id}
                                            message={message.content}
                                            type={message.message_type}
                                            time={moment(message.createdAt).format('HH:mm')}
                                            press={() => {
                                                let token =localStorage.getItem('token');
                                                window.open(`https://mbcwebchat.innobing.net/sfu/${idSession}/${token}`);
                                            }}
                                        />
                                    )
                                })
                            )
                            }
                        </div>
                        :
                        <div className={'containerFilesChat'}>
                            {typeData === 'image' &&
                                <img className={'imageFile'} src={filePreview}/>
                            }
                            {typeData === 'video' &&
                                <video className={'imageFile'}>
                                    <source className={'imageFile'} src={filePreview}/>
                                </video>
                            }
                        </div>
                    }


                    <Writer
                        value={message}
                        changeValue={value => setMessage(value)}
                        pressSender={() => sendNewMessage()}
                        sendMessage={() => sendNewMessage()}
                    />
                </div>
            </div>

        </div>
    )
}

export default Chat;

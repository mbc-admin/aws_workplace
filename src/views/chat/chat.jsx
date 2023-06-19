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
import {getConversations, finishSession, changeStatusToEnterVideoCall} from '../../services/chat.service';

import {sendMessage, getChannelMessages, blockUser} from '../../services/chat.service';
import Searcher from "../../components/searcher/searcher.component";

const Chat = props => {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [chatSelected, setChatSelected] = useState(null);
    const [allChats, setAllChats] = useState(null)
    const [uuidSelected, setUuidSelected] = useState('');

    const [showUserCard, setShowUserCard] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [chats, setChats] = useState(null);
    const [message, setMessage] = useState('');
    const [lastMessage, setLastMessage] = useState(null);
    const [idChat, setIdChat] = useState(null);
    const [idSession, setIdSession] = useState(null);
    const [idUser, setIdUser] = useState(null);

    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [actualConversation, setActualConversation] = useState();
    const [fileSended, setFileSended] = useState(false);
    const [messagesNotRead, setMessagesNotRead] = useState([]);
    const [recentlyMessage, setRecentlyMessage] = useState(null);

    const [conversationsOpened, setConversationsOpened] = useState([]);

    const [channelPrevId, setChannelPrevId] = useState(null);
    //const [channelNextId, setChannelNextId] = useState(location.state.channelId);


    const inputRef = useRef(null);
    const socketRef = useRef(null);
    const scrollRef = useRef(null);
    let formData = new FormData();

    useEffect(() => {
        console.log('THE SOCKET', socketRef)
        //setIdChat(location.state.channelId);
        // console.log('LOCATIOOON', location);

        //RECOGE LAS CONVERSACIONES ABIERTAS
        getConversations(1).then(conversations => {
            console.log('Conversaciones recogidas con exito', conversations.data)
            //setChannelNextId(location.state.channelId);
            //setConversationsOpened(opened => [...opened, location.state.channelId]);
            //let conversat = conversations.data.filter(conver => conver.id === Number(location.state.channelId));
            //setActualConversation(conversat[0]);
            //setIdSession(conversat[0].videocall_uuid)
            //setMessages(conversat[0].Messages);
            /*conversations.data.map(res => {
                res.Messages.reverse();
            })*/
            setAllChats(conversations.data);
            setChats(conversations.data);

            //CONECTA EL SOCKET
            let token =localStorage.getItem('token');
            console.log('ENTER IN SOCKET CONNECT', token)
            socketRef.current = io('https://node.innobing.net/nsp-io-chat', {query: `token=${token}`});

            //OBTIENE LOS EVENTOS DEL SOCKET
            socketEvents(conversations.data[0]);
        }).catch(err => {
            console.log('ERROR al recoger las conversaciones', err);
        })

        return () => {
            socketRef?.current?.disconnect();
            console.log('EL SOCKET SE DESCONECTA')
        }
    }, []);

    window.onbeforeunload = function() {
        socketRef?.current?.disconnect();
        console.log('ENTRA EN LA CONDICION PARA CERRAR EL SOCKET')
    };

    useEffect(() => {
        console.log('ENTER IN THIS SOCKET')
        setTimeout(() => {
            socketRef?.current?.off('message-published');
            socketRef?.current?.on('message-published', (e) => {
                console.log(e.channel_id + '--------' + chatSelected)
                console.log(e)

                if (Number(e.channel_id) === Number(chatSelected)) {
                    console.log('IF IS TRUE')
                    let userStorage = localStorage.getItem('USER');

                    socketRef?.current?.emit('read-message', {messageId: e.id, userId: JSON.parse(userStorage).user.id})
                    setMessages(messages => [e, ...messages]);
                } else {
                    console.log('IF IS FALSE')
                    getConversations(1).then(conversations => {
                        setAllChats(conversations.data);
                        setChats(conversations.data);
                    }).catch(err => {
                        console.log('ERROR al recoger las conversaciones en el socket', err)
                    })
                }
            });
        }, 500)
    }, [chatSelected]);

    /*useEffect(() => {
        if (recentlyMessage) {
            console.log('THIS IS A RECENTLY MESSAGE', recentlyMessage);
        }

    }, [recentlyMessage])*/

    const socketEvents = (conversation) => {
        console.log('USER MAIL', chats)
        console.log('CHANNNEL IDDDD', conversation.channelUsers.coach.id)
        //ENVIAMOS EL CHANNELID A NULL PARA HACER EL JOIN SOBRE TODAS LAS CONVERSACIONES NO SOBRE UNA CONCRETA
        socketRef.current.emit('join_all', {
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

        /*socketRef.current?.emit('coach-last-channel', {
            channel_prev_id: null,
            channel_next_id: location.state.channelId
        })*/

        socketRef?.current?.on('unread-messages', (e) => {
            console.log('LOS MENSAJES SIN LEER', e);
            setMessagesNotRead(e.channels);
        })

        socketRef?.current?.on('new-channel', (e) => {
            socketRef?.current?.off('join_all');
            socketRef.current.emit('join_all', {
                channelId: null,
                userId: conversation.channelUsers.coach.id,
                email: 'rmorenor97@gmail.com',
                socketId: socketRef.current.id,
                platform: 'web',
                appVersion: 'web'
            });
            getConversations(1).then(conversations => {
                setAllChats(conversations.data);
                setChats(conversations.data);
            }).catch(err => {
                console.log('ERROR al recoger las conversaciones en el socket', err)
            })
            console.log('HAVE NEW CHANNEL', e);
        })

        /*socketRef?.current?.on('message-published', (e) => {
            console.log('MESSAGE PUBLISHED IN SHOCKET EVENTS')
            //setRecentlyMessage(e);

            if (Number(e.channel_id) === Number(chatSelected)) {
                console.log('IF IS TRUE')
                let userStorage = localStorage.getItem('USER');

                socketRef?.current?.emit('read-message', {messageId: e.id, userId: JSON.parse(userStorage).user.id})
                setMessages(messages => [e, ...messages]);
            } else {
                console.log('IF IS FALSE')
                getConversations(1).then(conversations => {
                    setAllChats(conversations.data);
                    setChats(conversations.data);
                }).catch(err => {
                    console.log('ERROR al recoger las conversaciones en el socket', err)
                })
            }
        });*/

        socketRef?.current?.on('videocall-started', (e) => {
            // window.open(`https://videochat.innobing.net/sfu/${e.videocall_uuid}/${token}/`);
            console.log('videocall started',e);
            console.log('changes event',e);
            setIdSession(e.videocall_uuid)
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
            setAllChats(conversations);
            setChats(conversations);
            setActualConversation(res.data);
        }).catch(err => {
            console.log('ERROR al recoger los mensajes', err);
        });
    }

    const sendNewMessage = () => {
        console.log('ID CHAT', idChat)
        sendMessage(chatSelected, chats[0].channelUsers.coach.id, message, file).then(res => {
            setMessage('');
            setTypeData(null);
            setFile(null);
            console.log('Mensaje enviado con exito', res);
        }).catch(err => {
            console.log('ERROR al enviar el mensaje', err);
        })
    }

    const initVideochat = () => {
        console.log("initVideochat Emit: ",idChat)
        socketRef?.current?.emit('initVideochat', {channelId: chatSelected});
        // sendMessage(idChat, actualConversation.channelUsers.coach.id, '5876321976543').then(res => {
        //     let token = localStorage.getItem('token');
        //     //window.open(`https://videochat.innobing.net/sfu/${idChat}/${token}/`);
        //     window.open(`https://mbcwebchat.innobing.net/sfu/124/${token}`);
        //     setMessage('');
        //     console.log('Mensaje enviado con exito', res);
        // }).catch(err => {
        //     console.log('ERROR al enviar el mensaje', err);
        // })
    }

    const closeSession = () => {
        finishSession(chatSelected).then(res => {
            console.log('Sesion finalizada con exito', res);
            socketRef?.current?.emit('leave-channel', {channelId: chatSelected});
            navigate('/rating', {state: {idChat: chatSelected}});
        }).catch(err => {
            console.log('ERROR al finalizar la sesion', err);
        })
    }

    const getFileObject = (value) => {
        setShowMenu(false);
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
        console.log('this is a object file', typeof value.target.files[0])
        //formData.append('file', value.target.files[0]);
        setFile(value.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(value.target.files[0]);
        reader.onload = () => {
            setFilePreview(reader.result);
            console.log(reader.result);
        }
    }

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

    const enterVideoCall = async () => {
        await changeStatusToEnterVideoCall(chatSelected).then(async res => {
            console.log('Estado del usuario cambiado correctamente al entrar a videollamada', res.data);
            let token = await localStorage.getItem('token');
            window.open(`https://mbcwebchat.innobing.net/sfu/${idSession === null ? uuidSelected : idSession}/${token}`, '_blank');
        }).catch(err => {
            console.log('ERROR al cambiar el estado dle usuario al entrar a videollamada', err)
        })
    }


    return (
        chatSelected === null ?
        chats !== null &&
        <div className='containerMessages'>
            <p className='titleMessages'>Mensajes</p>

            <Searcher changeValue={value => searchChats(value)}/>

            <div className={'containerChatsMessages'}>
                {chats.map(chat => {
                    console.log('TIME LAST MESSAGE', chat)
                    return (
                        <ChatItem
                            image={chat.channelUsers.user.image}
                            fullName={`${chat.channelUsers.user.name} ${chat.channelUsers.user.lastname}`}
                            lastMessage={chat.Messages.length > 0 && chat.Messages[0].content}
                            timeLastMessage={chat.Messages.length > 0 ? chat.Messages[0].createdAt : ''}
                            press={() => {
                                socketRef?.current?.emit('join_channel', {channelId: chat.id});
                                setChatSelected(chat.id);
                                getMessagesChannel(chat.id);
                                setUuidSelected(chat.videocall_uuid);
                                setIdUser(chat.channelUsers.user.id);
                            }}
                            organization={chat.channelUsers.user.Organization !== null && chat.channelUsers.user.Organization.name}
                            unreadMessages={messagesNotRead.length > 0 ? messagesNotRead.find(object => object.channel_id === chat.id) : chat.unreadMessages.length}
                        />
                    )
                })
                }
            </div>
        </div>
            :
        <div className={'containerBlocksChat'}>
            {showUserCard &&
                <InfoUserCard
                    user={actualConversation}
                    close={value => setShowUserCard(value)}
                />
            }

            {showMenu &&
                <MenuChat
                    inputRef={inputRef}
                    initVideochat={() => initVideochat()}
                    finishSession={() => closeSession()}
                    pressNoMenu={() => setShowMenu(false)}
                    idUser={idUser}
                    idChannel={chatSelected}
                />
            }
            <input id={'inputFile'} ref={inputRef} hidden={true} type={'file'} onChange={value => getFileObject(value)}/>

            <div className={'blockChatsChat'}>
                <div className={'headerChat'}>
                    <img className={'iconBackChat'} src={IconAssets.back} onClick={() => {
                        setChatSelected(null);
                    }}/>
                </div>
                {chats !== null &&
                    <div className={'containerChatsChat'}>
                        {chats.map((chat, index) => {

                            return (
                                <ChatItem
                                    image={chat.channelUsers.user.image}
                                    fullName={`${chat.channelUsers.user.name} ${chat.channelUsers.user.lastname}`}
                                    lastMessage={lastMessage !== null && chat.id === idChat ? lastMessage.content : (chat.Messages.length > 0 ? chat.Messages[0].content : '')}
                                    size={'little'}
                                    organization={chat.channelUsers.user.Organization ? chat.channelUsers.user.Organization.name : 'Sin organizacion'}
                                    unreadMessages={messagesNotRead.find(object => object.channel_id === chat.id)}
                                    timeLastMessage={chat.Messages.length > 0 ? chat.Messages[0].createdAt : ''}
                                    press={() => {
                                        if (chat.id !== chatSelected) {
                                            socketRef?.current?.emit('join_channel', {channelId: chat.id});
                                            setChatSelected(chat.id);
                                            getMessagesChannel(chat.id)
                                            setUuidSelected(chat.videocall_uuid);
                                            setIdUser(chat.channelUsers.user.id);
                                        }
                                        /*if (chat.id !== channelNextId) {
                                            console.log('idCHAAAAAAAT', channelNextId)
                                            setChannelPrevId(location.state.channelId);
                                            setChannelNextId(chat.id);
                                            setIdChat(chat.id);

                                            getMessagesChannel(chat.id);

                                            socketRef.current?.emit('coach-last-channel', {
                                                channel_prev_id: location.state.channelId,
                                                channel_next_id: chat.id
                                            })
                                            location.state.channelId = chat.id
                                        }*/
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
                        <div className={'containerImageUserChat'}>
                            <img className={'imageUserChat'} src={actualConversation.channelUsers.user.image === null ? ImageAssets.userTest : `https://node.innobing.net/${actualConversation.channelUsers.user.image}`} onClick={() => {
                                setShowUserCard(!showUserCard);
                                setShowMenu(false);
                            }}/>
                        </div>
                        <p className={'nameUserChat'}  onClick={() => {
                            setShowUserCard(!showUserCard);
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
                                            sender={Number(message.user_id) === Number(chats[0].channelUsers.coach.id)}
                                            message={message.content}
                                            idChat={message.channel_id}
                                            type={message.message_type}
                                            time={moment(message.createdAt).format('HH:mm')}
                                            file={message.file}
                                            pressFile={value => setFilePreview(value)}
                                            typeFile={value => setTypeData(value)}
                                            isSended={value => setFileSended(value)}
                                            press={() => {
                                                enterVideoCall()
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
                                <>
                                    <img className={'iconCloseChat'} src={IconAssets.close} onClick={() => {
                                        setTypeData(null);
                                        setFile(null);
                                        setFilePreview(null);
                                        setFileSended(false);
                                    }}/>
                                    <img className={'imageFile'} src={filePreview}/>
                                </>
                            }
                            {typeData === 'video' &&
                                <>
                                    <img className={'iconCloseChat'} src={IconAssets.close} onClick={() => {
                                        setTypeData(null);
                                        setFile(null);
                                        setFilePreview(null);
                                        setFileSended(false);
                                    }}/>
                                    <video style={{width: '100%', height: '90%'}} src={filePreview} controls/>
                                </>
                            }
                            {typeData === 'document' &&
                                <>
                                    <img className={'iconCloseChat'} src={IconAssets.close} onClick={() => {
                                        setTypeData(null);
                                        setFile(null);
                                        setFilePreview(null);
                                        setFileSended(false);
                                    }}/>
                                    <iframe src={filePreview+'#toolbar=0'} width={'100%'} height={'90%'}/>
                                </>
                            }
                        </div>
                    }


                    {!fileSended &&
                        <Writer
                            value={message}
                            changeValue={value => setMessage(value)}
                            pressSender={() => sendNewMessage()}
                            sendMessage={() => sendNewMessage()}
                        />
                    }

                </div>
            </div>

        </div>
    )
}

export default Chat;

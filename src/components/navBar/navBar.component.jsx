import React, {useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';

import './navBar.css';
import { ImageAssets } from '../../utils/ImageAssets';

import {useLocation} from 'react-router-dom';

import UserNavBar from '../userNavBar/userNavBar.component';
import StateUser from '../stateUser/stateUser.component';
import Menu from '../menu/menu.component';
import CloseSesion from '../closeSesion/closeSesion.component';
import {getConversations} from "../../services/chat.service";
import {getProfile, changeStatus} from "../../services/user.service";

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [imageUser, setImageUser] = useState(null);
    const [status, setStatus] = useState('No disponible');
    const [unreadMessages, setUnreadMessages] = useState(0)

    const location = useLocation();

    const socketRef = useRef(null);

    useEffect(() => {

        getUserProfile();

        let userStorage = localStorage.getItem('USER');
        console.log('USSEEER', JSON.parse(userStorage));
        setUser(JSON.parse(userStorage));


        //CONECTA EL SOCKET
        let token =localStorage.getItem('token');
        console.log('ENTER IN SOCKET CONNECT', token)
        socketRef.current = io('https://node.innobing.net/nsp-io-event', {query: `token=${token}`});
        socketEvents(JSON.parse(userStorage))
    }, [])

    const socketEvents = (user) => {
        //ENVIAMOS EL CHANNELID A NULL PARA HACER EL JOIN SOBRE TODAS LAS CONVERSACIONES NO SOBRE UNA CONCRETA
        socketRef.current.emit('join', {
            userId: user.user.id,
        });

        socketRef?.current?.on('connect', () => {
            console.log('CONECT TO SOCKET NAVBAR', socketRef.current.id);
        });

        socketRef?.current?.on('unread-messages', (e) => {
            console.log('LOS MENSAJES SIN LEER NAVBAR', e);
            setUnreadMessages(e.hasOwnProperty('unreadMessages') ? e.unreadMessages : e.unreadTotal)
        })

        socketRef?.current?.on('welcome', () => {
            console.log('WELCOME TO SOCKET NAVBAR');
        });

        socketRef?.current?.on('error', () => {
            console.log('CONECT SOCKET ERROR NAVBAR');
        });

        socketRef?.current?.on('disconnect', () => {
            console.log('CONECT SOCKET DISCONNECT NAVBAR');
            //removePushNotifications();
        });
    }

    const getUserProfile = () => {
        getProfile().then(user => {
            console.log('Perfil recogido con exito', user.data.status);
            setImageUser(user.data.image);
            if (user.data.status === 'Online') {
                setStatus('Disponible');

            } else if (user.data.status === 'connect')  {
                setStatus('Disponible');
            } else if (user.data.status === 'Offline') {
                setStatus('No disponible');
            } else {
                setStatus('Busy');
            }
        }).catch(err => {
            console.log('ERROR al recoger el perfil', err);
        })
    }

    const modifyStatus = (status) => {
        let state = status === 'Disponible' ? 'Online' : 'Offline'
        console.log('STATUS', status)

        changeStatus(state).then(res => {
            getUserProfile();
            console.log('Estado actualizado con exito', res.data);
        }).catch(err => {
            console.log('ERROR al actualizar e estado', err);
        })
    }

    return (
        user !== null &&
        <div className={'containerNavBar'}>
            <img className={'logoNavBar'} src={ImageAssets.originalLogo}/>


            <div className={'containerItemsNavBar'}>
                <UserNavBar
                    name={`${user.user.name} ${user.user.lastname}`}
                    email={user.user.email}
                    image={imageUser}
                    status={status}
                />

                <StateUser value={status} changeValue={value => modifyStatus(value)}/>

                <Menu route={location.pathname} unreadMessages={unreadMessages}/>
            </div>

            <CloseSesion/>
        </div>
    )
}

export default NavBar;

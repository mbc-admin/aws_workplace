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

const NavBar = () => {
    const [user, setUser] = useState(null);

    const location = useLocation();

    const socketRef = useRef(null);

    useEffect(() => {
        let userStorage = localStorage.getItem('USER');
        console.log('USSEEER', JSON.parse(userStorage));
        setUser(JSON.parse(userStorage));


        //CONECTA EL SOCKET
        let token =localStorage.getItem('token');
        console.log('ENTER IN SOCKET CONNECT', token)
        socketRef.current = io('http://82.223.37.251:8000/nsp-io-chat', {query: `token=${token}`});
        socketEvents(JSON.parse(userStorage))
    }, [])

    const socketEvents = (user) => {
        //ENVIAMOS EL CHANNELID A NULL PARA HACER EL JOIN SOBRE TODAS LAS CONVERSACIONES NO SOBRE UNA CONCRETA
        socketRef.current.emit('join', {
            channelId: null,
            userId: user.user.id,
            email: user.user.email,
            socketId: socketRef.current.id,
            platform: 'web',
            appVersion: 'web'
        });

        socketRef?.current?.on('connect', () => {
            console.log('CONECT TO SOCKET NAVBAR', socketRef.current.id);
        });

        socketRef?.current?.on('welcome', () => {
            console.log('WELCOME TO SOCKET NAVBAR');
        });

        socketRef?.current?.on('message-published', (e) => {
            console.log('message SOCKET NEW NAVBAR', e);
        });

        socketRef?.current?.on('error', () => {
            console.log('CONECT SOCKET ERROR NAVBAR');
        });

        socketRef?.current?.on('disconnect', () => {
            console.log('CONECT SOCKET DISCONNECT NAVBAR');
            //removePushNotifications();
        });
    }

    return (
        user !== null &&
        <div className={'containerNavBar'}>
            <img className={'logoNavBar'} src={ImageAssets.originalLogo}/>


            <div className={'containerItemsNavBar'}>
                <UserNavBar
                    name={`${user.user.name} ${user.user.lastname}`}
                    email={user.user.email}
                />

                <StateUser/>

                <Menu route={location.pathname}/>
            </div>

            <CloseSesion/>
        </div>
    )
}

export default NavBar;

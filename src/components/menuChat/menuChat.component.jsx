import React from 'react';

import './menuChat.css';

import {useNavigate} from 'react-router-dom';

const MenuChat = ({inputRef, initVideochat, finishSession, pressNoMenu, idUser, idChannel}) => {
    const navigate = useNavigate();

    return (
        <div className={'containerMenuChat'} onClick={pressNoMenu}>
            <div className={'menuChat'}>
                <div className={'itemMenuChat'} onClick={initVideochat}>
                    <p className={'textItemMenu'}>Iniciar videochat</p>
                </div>
                <div className={'itemMenuChat border'} onClick={finishSession}>
                    <p className={'textItemMenu'}>Finalizar sesión</p>
                </div>
                <div className={'itemMenuChat halfBorder'} onClick={() => navigate('/report', {state: {idUser: idUser, idChannel: idChannel}})}>
                    <p className={'textItemMenu'}>Banear usuario</p>
                </div>
                <div className={'itemMenuChat'} onClick={() => inputRef.current.click()}>
                    <p className={'textItemMenu'}>Adjuntar archivo</p>
                </div>
                {/* <div className={'itemMenuChat'} onClick={() => navigate('/rating')}>
                <p className={'textItemMenu'}>Valorar</p>
            </div> */}
            </div>
        </div>

    )
}

export default MenuChat;

import React from 'react';

import './message.css';

const Message = ({sender, message, type, time, press}) => {

    return (
        type !== 'event' ?
            <div className={sender ? 'containerMessageSender' : 'containerMessageNoSender'}>
                <div className={sender ? 'containerTextSender' : 'containerTextNotSender'}>
                    {message}
                </div>
                <p className={'timeMessage'}>{time}</p>
            </div>
            :
            (message === 'videocall_started' ?
                <div className={'containerButtonMessage'}>
                    <button className={'buttonMessage'} onClick={press}>
                        Iniciar video chat
                    </button>
                    <p className={'timeMessage'}>{time}</p>
                </div>
                :
                <div className={sender ? 'containerMessageSender' : 'containerMessageNoSender'}>
                    <div className={sender ? 'containerTextSender' : 'containerTextNotSender'}>La sesión de video se ha finalizado.</div>
                    <p className={'timeMessage'}>{time}</p>
                </div>
            )


    )
}

export default Message;

import React from 'react';

import './message.css';

import {IconAssets} from '../../utils/ImageAssets';

const Message = ({sender, message, idChat, type, time, file, press, pressFile, typeFile, isSended}) => {

    return (
        type !== 'event' ?
            <div className={sender ? 'containerMessageSender' : 'containerMessageNoSender'}>
                <div className={sender ? 'containerTextSender' : 'containerTextNotSender'}>
                    {(file !== null && (file.includes('png') || file.includes('jpg') || file.includes('jpeg'))) &&
                        <img style={{maxWidth: 100, maxHeight: 200, marginBottom: 10, cursor: 'pointer'}} src={`https://node.innobing.net/channels/${idChat}/${file}`} onClick={() => {
                            pressFile(`https://node.innobing.net/channels/${idChat}/${file}`);
                            typeFile('image');
                            isSended(true);
                        }}/>
                    }
                    {(file !== null && file.includes('mp4')) &&
                        <video style={{maxWidth: 200, maxHeight: 300, marginBottom: 10}} src={`https://node.innobing.net/channels/${idChat}/${file}`} controls/>
                    }
                    {(file !== null && file.includes('pdf')) &&
                        <div className={'containerFileMessageComponent'} onClick={() => {
                            pressFile(`https://node.innobing.net/channels/${idChat}/${file}`);
                            typeFile('document');
                            isSended(true);
                        }}>
                            <img style={{maxWidth: 100, maxHeight: 100, marginBottom: 10, marginRight: 7}} src={IconAssets.file} controls/>
                            Archivo
                        </div>
                    }
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

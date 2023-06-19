import React from 'react';

import './avatar.css';
import { ImageAssets } from '../../utils/ImageAssets';

const Avatar = ({image, status}) => {
    console.log('status avatar', status)

    return (
        <div className='containerAvatar'>
            <img className={'imageNavBar'} src={`https://node.innobing.net/${image}`}/>

            {status === 'Disponible' ?
                <div className={'dotAvatarConnected'}></div>
                :
                (status === 'Busy') ?
                <div className={'dotAvatarOcupado'}></div>
                    :
                <div className={'dotAvatarDisconnected'}></div>
            }
        </div>
    )
}

export default Avatar;

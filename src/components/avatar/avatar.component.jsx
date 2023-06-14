import React from 'react';

import './avatar.css';
import { ImageAssets } from '../../utils/ImageAssets';

const Avatar = () => {

    return (
        <div className='containerAvatar'>
            <img className={'imageNavBar'} src={ImageAssets.logoCircular}/>
            
            <div className='dotAvatarConnected'></div>
        </div>
    )
}

export default Avatar;
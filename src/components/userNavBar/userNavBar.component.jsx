import React from 'react';

import './userNavBar.css';
import { ImageAssets } from '../../utils/ImageAssets';

import Avatar from '../avatar/avatar.component';

const UserNavBar = ({name, email, image, status}) => {

    return (
        <div className={'containerUserNavBar'}>
            <Avatar image={image} status={status}/>

            <div className={'containerTextUserNavBar'}>
                <p className={'nameUserNavBar'}>{name}</p>
                <p className={'emailUserNavBar'}>{email}</p>
            </div>
        </div>
    )
}

export default UserNavBar;

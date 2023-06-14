import React from 'react';

import './userNavBar.css';
import { ImageAssets } from '../../utils/ImageAssets';

import Avatar from '../avatar/avatar.component';

const UserNavBar = ({name, email}) => {

    return (
        <div className={'containerUserNavBar'}>
            <Avatar/>

            <div className={'containerTextUserNavBar'}>
                <p className={'nameUserNavBar'}>{name}</p>
                <p className={'emailUserNavBar'}>{email}</p>
            </div>
        </div>
    )
}

export default UserNavBar;

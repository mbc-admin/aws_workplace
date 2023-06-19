import React from 'react';

import './infoUserCard.css';
import {IconAssets, ImageAssets} from '../../utils/ImageAssets';

const InfoUserCard = ({user, close}) => {

        console.log('USEEEEEER', user)

    return (
        user &&
        <div className={'containerUserCard'}>
            <img className={'iconCloseUserCard'} src={IconAssets.close} onClick={() => close(false)}/>

            <div className={'containerImageUserCard'}>
                <img className={'imageUserCard'} src={user.channelUsers.user.image === null ? ImageAssets.userTest : `https://node.innobing.net/${user.channelUsers.user.image}`}/>
            </div>

            <p className={'nameUserCard'}>{user.channelUsers.user.name + '' + user.channelUsers.user.lastname}</p>
            <p className={'companyUserCard'}>Empresa {user.channelUsers.user.Organization !== null && user.channelUsers.user.Organization.name}</p>

            <p className={'titleUserCard'}>Departamento asignado</p>
            <p className={'textDetailsUserCard'}>{user.channelUsers.user.Department ? user.channelUsers.user.Department.name : 'Sin departamento'}</p>

            <p className={'titleUserCard'}>Email</p>
            <p className={'textDetailsUserCard'}>{user.channelUsers.user.email}</p>

            <p className={'titleUserCard'}>Sexo</p>
            <p className={'textDetailsUserCard'}>{user.channelUsers.user.gender}</p>

            <p className={'titleUserCard'}>Fecha de nacimiento</p>
            <p className={'textDetailsUserCard'}>{user.channelUsers.user.birthday}</p>
        </div>
    )
}

export default InfoUserCard;

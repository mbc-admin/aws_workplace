import React, {useEffect, useState, useRef} from 'react';

import './profile.css';
import {ImageAssets, IconAssets} from '../../utils/ImageAssets';

import { Rate } from 'antd';
import Speciality from '../../components/speciality/speciality.component';
import Button from '../../components/button/button.component';

import {getProfile} from '../../services/user.service';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [description, setDescription] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        getProfile().then(user => {
            console.log('Perfil recogido con exito', user.data);
            setUser(user.data);
            if (user.data.description !== null) setDescription(user.data.description);
        }).catch(err => {
            console.log('ERROR al recoger el perfil', err);
        })
        /*let user = localStorage.getItem('USER');
        console.log('USER PROFILE', JSON.parse(user));*/
    }, [])

    const changeImage = () => {
        console.log('URL', document.getElementById('inputFile').files[0])
        let file = document.getElementById('inputFile').files[0];
        console.log('ppppp', URL.createObjectURL(document.getElementById('inputFile').files[0]))
    }

    return (
        user !== null &&
        <div className={'containerProfile'}>
            <p className='titleProfile'>Perfil</p>
            <input id={'inputFile'} ref={inputRef} hidden={true} type={'file'} onChange={value => changeImage()}/>
            <div className={'containerContentProfile'}>
                <div className={'containerImageProfile'}>
                    <img className={'imageProfile'} src={ImageAssets.userTest} onClick={() => inputRef.current.click()}/>
                    <button className={'buttonEditImageProfile'}>
                        <img className={'iconEdit'} src={IconAssets.edit}/>
                    </button>
                </div>
                <p className={'titleRatingProfile'}>Valoración</p>
                <Rate
                    className={'rateProfile'}
                    value={5}
                    disabled
                />
            </div>

            <div className={'containerDataProfile'}>
                <p className={'titleDataProfile'}>Nombre y apellido</p>
                <p className={'nameProfile'}>{user.name + ' '+ user.lastname}</p>

                <p className={'titleDataProfile'}>Especialidades</p>
                <div className={'containerSpecialitiesProfile'}>
                    <Speciality text={'Autoestima y bienestar'}/>
                    <Speciality text={'Autoestima y bienestar'}/>
                    <Speciality text={'Autoestima y bienestar'}/>
                    <Speciality text={'Autoestima y bienestar'}/>
                </div>

                <p className={'titleDataProfile'}>Descripción profesional</p>
                <textarea
                    className={'textareaProfile'}
                    placeholder={'Escriba aqui...'}
                    value={user.description}
                    onChange={value => setDescription(value.target.value)}
                />

                <div className={'containerButtonProfile'}>
                    <Button
                        text={'Guardar'}
                        disabled={description === user.description}
                    />

                </div>
            </div>

        </div>
    )
}

export default Profile;

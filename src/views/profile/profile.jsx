import React, {useEffect, useState, useRef} from 'react';

import './profile.css';
import {ImageAssets, IconAssets} from '../../utils/ImageAssets';
import {message} from 'antd';

import { Rate } from 'antd';
import Speciality from '../../components/speciality/speciality.component';
import Button from '../../components/button/button.component';

import {getProfile, editDescription, editProfileImage} from '../../services/user.service';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [description, setDescription] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        getUserProfile();
        /*let user = localStorage.getItem('USER');
        console.log('USER PROFILE', JSON.parse(user));*/
    }, [])

    const getUserProfile = () => {
        getProfile().then(user => {
            console.log('Perfil recogido con exito', user.data);
            setUser(user.data);
            if (user.data.description !== null) setDescription(user.data.description);
        }).catch(err => {
            console.log('ERROR al recoger el perfil', err);
        })
    }

    const changeImage = async (value) => {
        console.log('AAAAA', value.target.files[0])
        let file = document.getElementById('inputFile').files[0];
        let objectURL = URL.createObjectURL(file);

        let formData = new FormData();
        await formData.append('file', value.target.files[0]);
        console.log('OBJECTURL', objectURL)

        editProfileImage(formData).then(res => {
            getUserProfile();
            console.log('Imagen de perfil editada con exito', res);
        }).catch(err => {
            console.log('ERROR al editar la imagen de perfil', err);
        })
    }

    const changeDescription = () => {
        editDescription(description).then(res => {
            message.success('Descripción modificada con exito.');
            console.log('Descripcion actualizada con exito', res);
        }).catch(err => {
            console.log('ERROR al actualizar la descripcion', err);
        })
    }

    return (
        user !== null &&
        <div className={'containerProfile'}>
            <p className='titleProfile'>Perfil</p>
            <input id={'inputFile'} ref={inputRef} hidden={true} type={'file'} onChange={value => changeImage(value)}/>
            <div className={'containerContentProfile'}>
                <div className={'containerImageProfile'}>
                    <div className={'containerImageProfile'}>
                        <img className={'imageProfile'} src={`https://node.innobing.net/${user.image}`} onClick={() => inputRef.current.click()}/>
                    </div>
                    <button className={'buttonEditImageProfile'}>
                        <img className={'iconEdit'} src={IconAssets.edit}/>
                    </button>
                </div>
                <p className={'titleRatingProfile'}>Valoración</p>
                <Rate
                    className={'rateProfile'}
                    value={user.rating}
                    disabled
                    allowHalf
                />
            </div>

            <div className={'containerDataProfile'}>
                <p className={'titleDataProfile'}>Nombre y apellido</p>
                <p className={'nameProfile'}>{user.name + ' '+ user.lastname}</p>

                <p className={'titleDataProfile'}>Especialidades</p>
                <div className={'containerSpecialitiesProfile'}>
                    {user.Specialities.map(speciality => {
                        return (
                            <Speciality text={speciality.name}/>
                        )
                    })
                    }
                </div>

                <p className={'titleDataProfile'}>Descripción profesional</p>
                <textarea
                    className={'textareaProfile'}
                    placeholder={'Escriba aqui...'}
                    value={description === user.description ? user.description : description}
                    onChange={value => setDescription(value.target.value)}
                />

                <div className={'containerButtonProfile'}>
                    <Button
                        text={'Guardar'}
                        disabled={description === user.description}
                        press={() => changeDescription()}
                    />

                </div>
            </div>

        </div>
    )
}

export default Profile;

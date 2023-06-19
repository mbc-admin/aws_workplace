import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {message} from 'antd';

import './reportUser.css';

import Button from '../../components/button/button.component';
import {blockUser} from "../../services/chat.service";

const ReportUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [reason, setReason] = useState('');

    const reportUser = () => {
        if (reason !== '' && reason !== null) {
            blockUser(location.state.idUser, location.state.idChannel, reason).then(res => {
                console.log('Usuario baneado con exito', res.data);
                navigate('/chat');
            }).catch(err => {
                console.log('ERROR al bloquar a los usuarios', err);
            })
        } else {
            message.error('Rellena el campo para bloquear al usuario.')
        }

    }

    console.log('params', location)

    return (
        <div className={'containerReportUser'}>
            <p className={'titleReportUser'}>¿Desea banear a este usuario?</p>

            <p className={'textReportUser'}>Si baneas a este usuario ya no podra interactuar contigo. Por favor ingresa los motivos:</p>

            <textarea
                className={'textareaReportUser'}
                placeholder={'Escriba aqui...'}
                onChange={value => setReason(value.target.value)}
            />

            <div className={'containerButtonsReportUser'}>
                <div className={'containerButton'}>
                    <Button
                        text={'Cancelar'}
                        secondary
                    />
                </div>
                <div className={'containerButton'}>
                    <Button
                        text={'Confirmar'}
                        press={() => reportUser()}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReportUser;

import React, {useEffect, useState} from 'react';

import './login.css';
import {ImageAssets} from '../../../utils/ImageAssets';
import {IconAssets} from '../../../utils/ImageAssets';

import {useNavigate} from 'react-router-dom';
import {message} from 'antd';
import loginStore from "../../../store/loginStore";
import {login} from '../../../services/user.service';

import Input from '../../../components/input/input.compnent';
import Button from '../../../components/button/button.component';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(false);
    const setLogin = loginStore(state => state.setLogin);

    let navigate = useNavigate();

    useEffect(() => {
        if (!email || !password) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [email, password]);

    const goRememberPassword = () => {
        if (email) {
            navigate('/rememberPassword', {state: {email: email}});
        } else {
            message.error('Introduce tu correo para recordar la contraseña.');
        }
    }

    const signIn = () => {
        login(email, password).then(res => {
            console.log('USER', res.data.user.user_type);
            if (res.data.user.user_type === 'coach') {
                setLogin(true);
            } else {
                localStorage.clear();
                message.error('Credenciales invalidas para el workplace.');
            }
        }).catch(err => {
            message.error('No se ha podido realizar el login, credenciales incorrectas.');

        })
    }

    return (
        <div className={'containerLogin'}>
            <img className={'logo'} src={ImageAssets.originalLogoAuth}/>
            <form className={'formLogin'}>
                <Input
                    iconLeft={IconAssets.at}
                    placeholder={'Email'}
                    type={'text'}
                    changeValue={value => setEmail(value)}
                />

                <Input
                    iconLeft={IconAssets.pass}
                    placeholder={'Contraseña'}
                    type={'password'}
                    changeValue={value => setPassword(value)}
                />

                <a className={'rememberPasswordLogin'} onClick={goRememberPassword}>¿Olvidaste tu contraseña?</a>

                <Button
                    disabled={disable}
                    text={'Iniciar sesión'}
                    press={() => signIn()}
                />
            </form>
        </div>
    )
}

export default Login;

import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import './rating.css';

import { Rate } from 'antd';

import {rateSession} from '../../services/chat.service';
import {getSpecialities} from '../../services/data.service';

import routeStore from '../../store/routeStore';
import Button from '../../components/button/button.component';
import RadioButton from '../../components/radioButton/radioButton.component';

const Rating = () => {
    const [rate, setRate] = useState(0);
    const [speciality, setSpeciality] = useState(null);
    const [allSpecialities, setAllSpecialities] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const setRoute = routeStore(state => state.setRoute);

    console.log('Location rate', location)

    useEffect(() => {
        setRoute(location.pathname);

        getSpecialities().then(res => {
            console.log('Especialidades recogidas con exito', res.data);
            setAllSpecialities(res.data);
        }).catch(err => {
            console.log('ERROR al recoger las especialidades', err);
        })
    }, [])

    const ratingSession = () => {
        console.log('SPECIALITY', speciality)
        rateSession(location.state.idChat, rate, speciality).then(res => {
            console.log('Sesion valorada con exito', res);
            setRoute(null);
            navigate('/chat')
        }).catch(err => {
            console.log('ERROR al valorar la sesion', err);
        })
    }

    return (
        <div className={'containerRating'}>
            <p className={'titleRating'}>Valoración del servicio</p>

            <Rate
                className={'rate'}
                allowHalf
                defaultValue={0}
                onChange={value => setRate(value)}
            />

            <p className={'textConfirmRating'}>Confirmación de especialidad</p>

            {/*<select className={'selectRating'}>
                <option>Seleccione la especialidad</option>
                <option>Seleccione la especialidad</option>
                <option>Seleccione la especialidad</option>
            </select>*/}

            <div className={'containerRadioButtons'}>
                <div className={'blockRadioButtons'}>
                    {allSpecialities.map((speciality, index) => {
                        if (index % 2 === 0) {
                            return (
                                <RadioButton name={'radioRate'} id={speciality.id} text={speciality.name} changeValue={value => setSpeciality(value)}/>
                            )
                        }
                    })
                    }
                    {/*<RadioButton name={'radioRate'} text={'Coaching ejecutivo'} changeValue={value => setSpeciality(value)}/>
                    <RadioButton name={'radioRate'} text={'Coach de vida'}/>
                    <RadioButton name={'radioRate'} text={'Familia'}/>
                    <RadioButton name={'radioRate'} text={'Adolescencia'}/>
                    <RadioButton name={'radioRate'} text={'Productividad, liderazgo, equipos'}/>
                    <RadioButton name={'radioRate'} text={'Gestión del cambio'}/>
                    <RadioButton name={'radioRate'} text={'Gestión del cambio en la mujer'}/>*/}
                </div>
                <div className={'blockRadioButtons blockRadioButtonsRight'}>
                    {allSpecialities.map((speciality, index) => {
                        if (index % 2 !== 0) {
                            return (
                                <RadioButton name={'radioRate'} id={speciality.id} text={speciality.name} changeValue={value => setSpeciality(value)}/>
                            )
                        }
                    })
                    }
                    {/*<RadioButton name={'radioRate'} text={'Actitud positiva'}/>
                    <RadioButton name={'radioRate'} text={'Inteligencia emocional: Estrés y ansiedad'}/>
                    <RadioButton name={'radioRate'} text={'Coaching de mujeres'}/>
                    <RadioButton name={'radioRate'} text={'Duelo'}/>
                    <RadioButton name={'radioRate'} text={'Mindfulness'}/>
                    <RadioButton name={'radioRate'} text={'Desarrollo personal'}/>
                    <RadioButton name={'radioRate'} text={'Relaciones personales'}/>*/}
                </div>
            </div>

            <div className={'containerButtonRating'}>
                <Button
                    text={'Enviar'}
                    press={() => ratingSession()}
                />
            </div>
        </div>
    )
}

export default Rating;

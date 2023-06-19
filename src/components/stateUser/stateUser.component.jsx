import React, {useState, useEffect} from 'react';

import './stateUser.css';

const StateUser = ({value, changeValue}) => {
    console.log('DATO VALUE', value)
    const [dot, setDot] = useState(value);

    useEffect(() => {
        console.log('ESTE ES EL ESTADO DEL USER', dot)
    }, []);

    return (
        <div className={'containerStateUser'}>
            <p className={'textStateUser'}>Estado</p>

            <div className={'containerSelectStateUser'}>
                <div className={value === 'Disponible' ? 'dotGreen' : (value === 'Busy') ? 'dotOrange' : 'dotRed'}></div>

                <select
                    className={'selectStateUser'}
                    onChange={value => {
                        setDot(value.target.value)
                        changeValue(value.target.value)
                    }}
                >
                    <option selected={value === 'Disponible'}>Disponible</option>
                    <option selected={value !== 'Disponible'}>No disponible</option>
                </select>
            </div>
        </div>
    )
}

export default StateUser;

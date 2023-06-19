import React from 'react';

import './radioButton.css';

const RadioButton = ({name, id, text, changeValue}) => {

    return (
        <div className={'container'}>
            <input name={name} type={'radio'} onChange={value => changeValue(id)}/>
            <p className={'textRadioButton'}>{text}</p>
        </div>
    )
}

export default RadioButton;

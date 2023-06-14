import React from 'react';

import './button.css';

const Button = ({disabled, iconLeft, text, secondary, press}) => {

    return (
        <button
            className={secondary ? 'secondaryButton' : 'button'}
            type={'button'}
            disabled={disabled}
            onClick={press}
        >
            {iconLeft && <img className={'iconButton'} src={iconLeft}/>}
            {text}
        </button>
    )
}

export default Button;

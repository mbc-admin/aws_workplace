import React from 'react';

import './writer.css';
import {IconAssets} from '../../utils/ImageAssets';

const Writer = ({value, changeValue, pressSender, sendMessage}) => {

    return (
        <div className={'containerWriter'}>
            <input
                className={'inputWriter'}
                placeholder={'Escribe tu mensaje'}
                type={'text'}
                value={value}
                rows={10}
                onChange={value => changeValue(value.target.value)}
                onKeyPress={e => {
                    console.log('KEY PRESED', e.code)
                    if (e.code === 'Enter') {
                            sendMessage(true)
                    }
                }}
            />

            <div className={'senderWriter'} onClick={pressSender}>
                <img src={IconAssets.sender}/>
            </div>
        </div>
    )
}

export default Writer;

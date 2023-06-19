import React from 'react';

import './searcher.css';
import {IconAssets} from '../../utils/ImageAssets';

const Searcher = ({changeValue}) => {

    return (
        <div className='containerSearcher'>
            <img className={'iconSearchSearcher'} src={IconAssets.search}/>
            <input
                className={'inputSearcher'}
                placeholder={'Buscar'}
                type={'text'}
                onChange={value => changeValue(value.target.value)}
            />
            <img className={'iconDownSearcher'} src={IconAssets.down}/>
        </div>
    )
}

export default Searcher;

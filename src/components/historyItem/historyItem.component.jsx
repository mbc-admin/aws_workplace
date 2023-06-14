import React from 'react';

import './historyItem.css';
import {ImageAssets} from "../../utils/ImageAssets";

import DotQuantity from "../dotQuantity/dotQuantity.component";

const HistoryItem = () => {

    return (
        <div className={'containerHistoryItem'}>
            <img className={'imageHistoryItem'} src={ImageAssets.userTest}/>

            <div className={'containerTextHistoryItem'}>
                <p className={'nameHistoryItem'}>Antonio Garcia</p>
                <p className={'companyHistoryItem'}>Empresa XXX</p>
            </div>

            <p className={'dateHistoryItem'}>20/02/2023</p>
        </div>
    )
}

export default HistoryItem;

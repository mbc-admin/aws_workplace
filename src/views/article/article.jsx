import React from 'react';
import {useNavigate} from 'react-router-dom'

import './article.css';
import {ImageAssets, IconAssets} from '../../utils/ImageAssets';

import Button from '../../components/button/button.component';

const Article = () => {
    const navigate = useNavigate();

    return (
        <div className={'containerArticle'}>
            <div className={'containerGoBackArticle'} onClick={() => navigate('/articles')}>
                <img className={'iconGoBackArticle'} src={IconAssets.left}/>
                <p className={'goBackArticle'}>Volver</p>
            </div>

            <div className={'containerTitleArticle'}>
                <p className={'titleArticle'}>Título del artículo</p>
                <div className={'containerButtonArticle'}>
                    <Button
                        text={'Descargar archivo'}
                        iconLeft={IconAssets.download}
                    />
                </div>
            </div>

            <iframe className={'pdfArticle'} src={ImageAssets.pdfTest+'#toolbar=0'} width={'100%'} height={'700px'}/>
        </div>
    )
}

export default Article;

import React from 'react';

import './articles.css';

import ArticleComponent from '../../components/article/article.component';

const Articles = () => {

    return (
        <div className={'containerArticles'}>
            <p className='titleArticles'>Artículos</p>

            <p className={'descriptionArticles'}>Aquí encontrarás las ultimas actualizaciones acerca de las mejores practicas coaching asi como comunicaciones de importantes de la empresa</p>

            <select className={'selectArticles'}>
                <option>Ordernar por...</option>
            </select>

            <div className={'containerItemArticles'}>
                <ArticleComponent/>
                <ArticleComponent/>
                <ArticleComponent/>
                <ArticleComponent/>
                <ArticleComponent/>
                <ArticleComponent/>
                <ArticleComponent/>
                <ArticleComponent/>
            </div>
        </div>

    )
}

export default Articles;

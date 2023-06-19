import React, {useEffect, useState} from 'react';

import './articles.css';

import ArticleComponent from '../../components/article/article.component';

import {getArticles} from '../../services/data.service';

const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles().then(res => {
            console.log('Articulos recogidos con exito', res.data);
            setArticles(res.data);
        }).catch(err => {
            console.log('ERROR al recoger los articulos', err);
        })
    }, []);

    return (
        <div className={'containerArticles'}>
            <p className='titleArticles'>Artículos</p>

            <p className={'descriptionArticles'}>Aquí encontrarás las ultimas actualizaciones acerca de las mejores practicas coaching asi como comunicaciones de importantes de la empresa</p>

            <select className={'selectArticles'}>
                <option>Ordernar por...</option>
            </select>

            <div className={'containerItemArticles'}>
                {articles.map(article => {
                    return(
                        <ArticleComponent article={article}/>
                    )
                })
                }
            </div>
        </div>

    )
}

export default Articles;

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './articleComponent.css';
import {IconAssets} from '../../utils/ImageAssets';

import DotQuantity from '../dotQuantity/dotQuantity.component';

const ArticleComponent = ({article, press}) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const subarticles = [
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
        {
            title: 'Title',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
        },
    ]

    return (
        <div className={'containerCompleteArticleComponent'}>
            <div className={'containerArticleComponent'} onClick={() => setOpen(!open)}>

                <div className={'containerDetailsArticleComponent'}>
                    <div className={'detailsArticleComponent'}>
                        <p className={'titleArticleComponent'}>{article.name}</p>
                        <p className={'descriptionArticleComponent'}>{article.description}</p>
                    </div>

                    <div className={'detailsDateArticleComponent'}>
                        <p className={'dateArticleComponent'}>12/02/2023</p>
                        <DotQuantity />
                    </div>

                    <img className={'iconArticleComponent'} src={open ? IconAssets.up : IconAssets.down}/>
                </div>
            </div>
            {open &&
                <div className={'containerSubarticlesArticlesComponent'}>
                    {article.Posts.map((subarticle, index) => {
                        return (
                            <div className={index === article.Posts.length - 1 ? 'lastSubarticleArticleComponent' : 'subarticleArticleComponent'} onClick={() => navigate('/article', {state: {post: subarticle}})}>
                                <div className={'subarticleTextArticleComponent'}>
                                    <p className={'titleSubarticleArticleComponent'}>{subarticle.title}</p>
                                    <p className={'subtitleSubarticleArticleComponent'}>{subarticle.description}</p>
                                </div>

                                <img className={'iconSubarticleArticleComponent'} src={IconAssets.right}/>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div>

    )
}

export default ArticleComponent;

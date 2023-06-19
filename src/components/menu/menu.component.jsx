import React from 'react';

import './menu.css';
import {IconAssets} from '../../utils/ImageAssets';

import {useNavigate} from 'react-router-dom';

import DotQuantity from '../dotQuantity/dotQuantity.component';

const Menu = ({route, unreadMessages}) => {
    const navigate = useNavigate();

    return (
        <div className={'containerMenu'}>
            <div className={(route === '/' || route === '/chat') ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/chat')}>
                <img className={'iconMenuItem'} src={(route === '/' || route === '/chat') ? IconAssets.messagesFocus : IconAssets.messagesNoFocus}/>
                <p className={route === '/' || route === '/chat' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Mensajes</p>
                <DotQuantity style={{marginRight: 13}} size={'little'} quantity={unreadMessages} focus={route === '/' || route === '/chat'}/>
            </div>

            <div className={route === '/diary' ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/diary')}>
                <img className={'iconMenuItem'} src={route === '/diary' ? IconAssets.agendaFocus : IconAssets.agendaNoFocus}/>
                <p className={route === '/diary' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Agenda</p>
                <DotQuantity style={{marginRight: 13}} size={'little'} quantity={0} focus={route === '/diary'}/>
            </div>


            <div className={route === '/history' ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/history')}>
                <img className={'iconMenuItem'} src={route === '/history' ? IconAssets.historyFocus : IconAssets.historyNoFocus}/>
                <p className={route === '/history' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Historial de mensajes</p>
                <DotQuantity style={{marginRight: 13}} size={'little'} quantity={0} focus={route === '/history'}/>
            </div>


            <div className={route === '/articles' ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/articles')}>
                <img className={'iconMenuItem'} src={route === '/articles' ? IconAssets.articlesFocus : IconAssets.articlesNoFocus}/>
                <p className={route === '/articles' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Artículos</p>
                <DotQuantity style={{marginRight: 13}} size={'little'} quantity={0} focus={route === '/articles'}/>
            </div>


            <div className={route === '/profile' ? 'MenuItem' : 'MenuItemNoFocus'} onClick={() => navigate('/profile')}>
                <img className={'iconMenuItem'} src={route === '/profile' ? IconAssets.profileFocus : IconAssets.profileNoFocus}/>
                <p className={route === '/profile' ? 'textMenuItemFocus' : 'textMenuItemNoFocus'}>Perfil</p>
                <DotQuantity style={{marginRight: 13}} size={'little'} quantity={0} focus={route === '/profile'}/>
            </div>

        </div>
    )
}

export default Menu;

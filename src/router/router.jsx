import {Routes, Route} from 'react-router-dom';

import Messages from '../views/messages/messages';
import Chat from '../views/chat/chat';
import Rating from '../views/rating/rating';
import ReportUser from '../views/reportUser/reportUser';
import Diary from '../views/diary/diary';
import History from '../views/history/history';
import Articles from '../views/articles/articles';
import Article from '../views/article/article';
import Profile from '../views/profile/profile';

import NotFound from '../views/notFound/notFound';

const Router = () => {

    return(
        <Routes>
            <Route path={'/'} element={<Messages/>}/>
            <Route path={'/chat'} element={<Chat/>}/>
            <Route path={'/rating'} element={<Rating/>}/>
            <Route path={'/report'} element={<ReportUser/>}/>
            <Route path={'/diary'} element={<Diary/>}/>
            <Route path={'/history'} element={<History/>}/>
            <Route path={'/articles'} element={<Articles/>}/>
            <Route path={'/article'} element={<Article/>}/>
            <Route path={'/profile'} element={<Profile/>}/>

            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    )
}

export default Router;

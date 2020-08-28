import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import FindPeople from '../pages/find_people/FindPeople';
import Posts from '../pages/posts/Posts';
import MyProfile from '../pages/user_profile/MyProfile';
import UserProfile from '../pages/user_profile/UserProfile';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Routes() {
    const { currentUser } = useContext(CurrentUserContext);

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/findPeople">
                {!currentUser ? <Home /> : <FindPeople />}
            </Route>
            <Route exact path="/posts">
                {!currentUser ? <Home /> : <Posts />}
            </Route>
            <Route exact path="/myProfile">
                {!currentUser ? <Home /> : <MyProfile />}
            </Route>
            <Route exact path="/userProfile/:id">
                <UserProfile />
            </Route>
        </Switch>
    );
}

export default Routes;

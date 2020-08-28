import React from 'react';
import NavigationRouter from './app_routes/NavigationRouter';

import { BrowserRouter as Router } from 'react-router-dom';
import { AllPostsContextProvider } from './context/AllPostsContext';
import { AllUsersContextProvider } from './context/AllUsersContext';
import { CurrentUserContextProvider } from './context/CurrentUserContext';

function App() {
    return (
        <Router>
            <CurrentUserContextProvider>
                <AllUsersContextProvider>
                    <AllPostsContextProvider>
                        <NavigationRouter />
                    </AllPostsContextProvider>
                </AllUsersContextProvider>
            </CurrentUserContextProvider>
        </Router>
    );
}

export default App;

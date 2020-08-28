import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';
import { config } from '../constants/generalConstants';

interface CurrentUserContextProps {
    currentUser: string | null;
    setUser: (currentUser: string | null) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextProps>({
    currentUser: '',
    setUser: () => null,
});

export const CurrentUserContextProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        window.localStorage.getItem('token') &&
            Axios.get('/api/auth/user', config)
                .then((res) => {
                    setCurrentUser(res.data.user._id);
                })
                .catch((err) => console.log(err));
    }, []);

    const setUser = (currentUser: string | null) => setCurrentUser(currentUser);

    return <CurrentUserContext.Provider value={{ currentUser, setUser }}>{children}</CurrentUserContext.Provider>;
};

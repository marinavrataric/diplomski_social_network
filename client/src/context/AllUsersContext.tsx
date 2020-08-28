import React, { useState, useEffect, createContext, useContext } from 'react';
import Axios from 'axios';
import { UserInterface } from '../interfaces/UserInterface';
import { config } from '../constants/generalConstants';
import { CurrentUserContext } from './CurrentUserContext';

interface AllUsersContextProps {
    allUsers: UserInterface[];
    followUser: (userID: string) => void;
    unFollowUser: (userID: string) => void;
    setUsers: (users: UserInterface[]) => void;
}

const initialState: UserInterface = {
    _id: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    user_bio: '',
    followers: [],
    following: [],
};

export const AllUsersContext = createContext<AllUsersContextProps>({
    allUsers: [initialState],
    followUser: () => null,
    unFollowUser: () => null,
    setUsers: () => null,
});

export const AllUsersContextProvider: React.FC = ({ children }) => {
    const [allUsers, setAllUsers] = useState<UserInterface[]>([initialState]);
    const { currentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        window.localStorage.getItem('token') &&
            Axios.get('/api/auth/users', {
                headers: {
                    'x-auth-token': window.localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    setAllUsers(res.data);
                })
                .catch((err) => console.log(err));
    }, [currentUser]);

    const setUsers = (users: UserInterface[]) => {
        setAllUsers(users);
    };

    const followUser = (userID: string) => {
        Axios.put(
            '/api/users/follow',
            {
                followId: userID,
            },
            config,
        ).then(() =>
            Axios.get('/api/auth/users', config)
                .then((res) => {
                    setAllUsers(res.data);
                })
                .catch((err) => console.log(err)),
        );

        // const tempArrayWithoutCurrent = allUsers.filter((user) => user._id !== currentUser);
        // const tempArrayWithoutBoth = tempArrayWithoutCurrent.filter((user) => user._id !== userID);
        // const [currentUserArray] = allUsers.filter((user) => user._id === currentUser);
        // const [otherUserArray] = allUsers.filter((user) => user._id === userID);

        // currentUserArray.following.push(userID);
        // currentUser && otherUserArray.followers.push(currentUser);
        // tempArrayWithoutBoth.push(currentUserArray, otherUserArray);
        // setAllUsers(tempArrayWithoutBoth);
    };

    const unFollowUser = (userID: string) => {
        Axios.put('/api/users/unfollow', { unfollowId: userID }, config).then(() =>
            Axios.get('/api/auth/users', config)
                .then((res) => {
                    setAllUsers(res.data);
                })
                .catch((err) => console.log(err)),
        );

        // const tempArrayWithoutCurrent = allUsers.filter((user) => user._id !== currentUser);
        // const tempArrayWithoutBoth = tempArrayWithoutCurrent.filter((user) => user._id !== userID);
        // const [currentUserArray] = allUsers.filter((user) => user._id === currentUser);
        // const [otherUserArray] = allUsers.filter((user) => user._id === userID);
        // const indexOfCurrent = currentUserArray.following.indexOf(userID);
        // const indexOfOther = otherUserArray.followers.indexOf(currentUser as string);

        // currentUserArray.following.splice(indexOfCurrent, 1);
        // otherUserArray.followers.splice(indexOfOther, 1);
        // tempArrayWithoutBoth.push(currentUserArray, otherUserArray);

        // setAllUsers(tempArrayWithoutBoth);
    };

    return (
        <AllUsersContext.Provider value={{ allUsers, followUser, unFollowUser, setUsers }}>
            {children}
        </AllUsersContext.Provider>
    );
};

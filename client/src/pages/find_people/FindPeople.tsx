import React, { useContext, useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import './findPeople.css';
import UserCard from '../../components/user_card/UserCard';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AllUsersContext } from '../../context/AllUsersContext';

const FindPeople = () => {
    const [inputSearch, setInputSearch] = useState('');
    const { currentUser } = useContext(CurrentUserContext);
    const { allUsers } = useContext(AllUsersContext);

    const searchUser = (e: any) => {
        e.preventDefault();
        inputSearch.toLowerCase();
        e.target[0].value = '';
    };

    const filterResult = allUsers
        .filter((user) => user._id !== currentUser)
        .filter((user) => {
            const userName = user.first_name + ' ' + user.last_name;
            if (userName.toLowerCase().includes(inputSearch)) {
                return user;
            }
        });

    const allUsersDisplayed = filterResult.map((user) => <UserCard user={user} key={user._id} />);

    return (
        <div className="center">
            <form onSubmit={searchUser}>
                <Input
                    placeholder="Search user..."
                    onChange={(e: any) => setInputSearch(e.target.value)}
                    className="searchbox"
                ></Input>
            </form>
            {allUsersDisplayed}
        </div>
    );
};

export default FindPeople;

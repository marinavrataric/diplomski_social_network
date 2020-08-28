export const config = {
    headers: {
        'x-auth-token': window.localStorage.getItem('token'),
        'Content-Type': 'application/json',
    },
};

export const configWithoutToken = {
    headers: {
        'Content-Type': 'application/json',
    },
};

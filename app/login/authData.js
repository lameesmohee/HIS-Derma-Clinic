let authData = {
    token: null,
    id: null,
};

const setAuthData = (newToken, newId) => {
    authData.token = newToken;
    authData.id = newId;
    // console.log(authData.token)
};
console.log(authData.token)
const getAuthData = () => {
    // console.log(authData.token)
    return authData;
    
};

export { setAuthData, getAuthData };
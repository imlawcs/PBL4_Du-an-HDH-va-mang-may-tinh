export const ApiConstants = {
    BASE_URL: 'https://192.168.56.1:3001',
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/register',
    CLAIMS: {
        NAME_IDENTIFIER: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
        EMAIL: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
        ROLE: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    },
    USER: {
        GET_USER: '/api/User',
        GET_USER_BY_ID: '/api/User/',
        GET_USER_BY_NAME: '/api/User/name=',
    },
}
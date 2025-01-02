export const ApiConstants = {
    BASE_URL: "https://localhost:3001",
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
    STREAM: {
        GET_STREAMS: '/api/Stream',
        GET_STREAM_BY_ID: '/api/Stream/',
    },
    CATEGORY: {
        GET_CATEGORIES: '/api/Category',
        GET_CATEGORIES_BY_ID: '/api/Category/',
    },
    TAG: {
        GET_TAGS: '/api/Tag',
        GET_TAG_BY_ID: '/api/Tag/',
    },
    FOLLOW: {
        GET_ALL_FOLLOWING: '/api/Following',
        GET_FOLLOWERS_BY_ID: '/api/Following/',
        FOLLOW: '/api/Following/follow',
        UNFOLLOW: '/api/Following/unfollow',
    },
    BLOCK: {
        GET_ALL_BLOCKED: '/api/Blocked',
        GET_BLOCKED_BY_ID: '/api/Blocked/',
        BLOCK: '/api/Blocked/block',
        UNBLOCK: '/api/Blocked/unblock',
    },
    ROLE: {
        GET_ROLES: '/api/Role',
        GET_ROLE_BY_ID: '/api/Role/',
        ASSIGN_ROLE: '/api/Role/assign-role',
        REMOVE_ROLE: '/api/Role/remove-role',
        ASSIGN_MOD: '/api/Role/assign-mod',
        REMOVE_MOD: '/api/Role/remove-mod',
        GET_MODS_OF_CHANNEL: (id: string) => `/api/Role/${id}-mod`,
    }
}
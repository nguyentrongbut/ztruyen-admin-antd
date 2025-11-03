export const BASE_URL = import.meta.env.VITE_API_URL

export const CONFIG_API = {
    AUTH: {
        LOGIN: 'auth/login',
        LOGOUT: 'auth/logout',
    },
    USER: {
        INDEX: 'users',
        PROFILE: 'users/profile',
        DETAIL: 'users/detail',
        DELETE: 'users/delete',
        DELETE_MULTI: 'users/delete-multi',
        UPDATE: 'users/update',
    },
    UPLOAD: {
        ONE: '/upload-telegram/upload',
        MULTI: '/upload-telegram/upload-multiple',
        IMAGE: '/images'
    }
} as const
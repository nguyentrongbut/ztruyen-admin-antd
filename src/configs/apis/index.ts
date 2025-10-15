export const BASE_URL = import.meta.env.VITE_API_URL

export const CONFIG_API = {
    AUTH: {
        LOGIN: 'auth/login',
        LOGOUT: 'auth/logout',
    },
    USER: {
        INDEX: 'users',
        PROFILE: 'users/profile'
    }
} as const
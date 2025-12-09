export const BASE_URL = import.meta.env.VITE_API_URL

export const CONFIG_API = {
    AUTH: {
        LOGIN: 'auth/login',
        LOGOUT: 'auth/logout',
    },
    UPLOAD: {
        ONE: '/upload-telegram/upload',
        MULTI: '/upload-telegram/upload-multiple',
        IMAGE: '/images'
    },
    USER: {
        INDEX: 'users',
        PROFILE: 'users/profile',
        DETAIL: 'users/detail',
        DELETE: 'users/delete',
        DELETE_MULTI: 'users/delete-multi',
        UPDATE: 'users/update',
        EXPORT: 'users/export',
        EXPORT_TEMPLATE: 'users/template',
        IMPORT: 'users/import',
        TRASH: 'users/trash',
        HARD_DELETE: 'users/trash/delete',
        HARD_DELETE_MULTI: 'users/trash/delete-multi',
        RESTORE: 'users/restore',
        RESTORE_MULTI: 'users/restore-multi',
    },
   GENRE: {
        INDEX: 'genres',
        DETAIL: 'genres/detail',
        DELETE: 'genres/delete',
        DELETE_MULTI: 'genres/delete-multi',
        UPDATE: 'genres/update',
        EXPORT: 'genres/export',
        EXPORT_TEMPLATE: 'genres/template',
        IMPORT: 'genres/import',
        TRASH: 'genres/trash',
        HARD_DELETE: 'genres/trash/delete',
        HARD_DELETE_MULTI: 'genres/trash/delete-multi',
        RESTORE: 'genres/restore',
        RESTORE_MULTI: 'genres/restore-multi',
   }
} as const
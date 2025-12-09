export interface IUpload {
    "_id": string,
    "slug": string,
    "fileId": string,
    "isDeleted": boolean,
    "deletedAt": string,
    "createdAt": string,
    "updatedAt": string,
}

export interface IRemoveMultiImg {
    "success": boolean,
    "deletedCount": number,
    "slugs": string[],
}

export interface IUserLogin {
    _id?: string;
    name: string;
    email: string;
    role?: string
}

export interface ILogin {
    access_token: string;
    user: IUserLogin
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    avatar?: string
    cover?: string
    avatar_frame?: string
    bio?: string;
    birthday?: string;
    age: number;
    gender: string;
    address: string;
    provider: string;
    role?: string
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IGenre {
    _id?: string;
    name: string;
    slug?: string;
    description?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}


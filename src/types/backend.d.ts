export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        page: number;
        limit: number;
        totalPages: number;
        totalItems: number;
    },
    result: T[]
}
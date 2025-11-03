export const handleResponse = <T>(res: any): IBackendRes<T> => {
    if (res?.statusCode && res.statusCode >= 400) {
        throw res;
    }
    return res;
};
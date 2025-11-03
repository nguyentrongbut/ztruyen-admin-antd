// ** Services
import axios from "@/services/axios-customize";

// ** Types
import type {IUser} from "@/types/backend";

// ** Configs
import {CONFIG_API} from "@/configs/apis";

export const UserService = {
    profile: () => axios.get<IBackendRes<IUser>>(CONFIG_API.USER.PROFILE),
    list: async (query: string) => {
        return await axios.get<IBackendRes<IModelPaginate<IUser>>>(
            `${CONFIG_API.USER.INDEX}?${query}`
        );
    },
    detail: async (id: string) => {
        return await axios.get<IBackendRes<IUser>>(
            `${CONFIG_API.USER.DETAIL}/${id}`
        );
    },
    remove: async (id: string) => {
        return await axios.delete(
            `${CONFIG_API.USER.DELETE}/${id}`
        );
    },
    removeMulti: async (ids: string[]) => {
        return await axios.delete(
            CONFIG_API.USER.DELETE_MULTI, {
                data: {ids},
            }
        );
    },
    add: async (payload: any) => {
        return await axios.post<IBackendRes<IUser>>(CONFIG_API.USER.INDEX, payload)
    },
    update: async (id: string, payload: any) => {
        return await axios.patch(`${CONFIG_API.USER.UPDATE}/${id}`, payload)
    }
};

// ** Services
import axios from "@/services/axios-customize";

// ** Types
import type {IUser} from "@/types/backend";

// ** Configs
import {CONFIG_API} from "@/configs/apis";
import {ExportService} from "@/services/export";

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
    },

    export: async (query: string) => {
        await ExportService.export(`${CONFIG_API.USER.EXPORT}?${query}`, 'users.xlsx')
    },
    exportTemplate: async (fileName = "import_template.xlsx") => {
        await ExportService.export(CONFIG_API.USER.EXPORT_TEMPLATE, fileName);
    },
    import: (file: File) => {
        const formData = new FormData();
        formData.append("file", file)

        return axios.post(CONFIG_API.USER.IMPORT, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

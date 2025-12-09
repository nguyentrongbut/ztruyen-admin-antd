// ** Services
import axios from "@/services/axios-customize";

// ** Types
import type {IGenre} from "@/types/backend";

// ** Configs
import {CONFIG_API} from "@/configs/apis";
import {ExportService} from "@/services/export";

export const GenreService = {
    list: async (query: string) => {
        return await axios.get<IBackendRes<IModelPaginate<IGenre>>>(
            `${CONFIG_API.GENRE.INDEX}?${query}`
        );
    },
    detail: async (id: string) => {
        return await axios.get<IBackendRes<IGenre>>(
            `${CONFIG_API.GENRE.DETAIL}/${id}`
        );
    },
    remove: async (id: string) => {
        return await axios.delete(
            `${CONFIG_API.GENRE.DELETE}/${id}`
        );
    },
    removeMulti: async (ids: string[]) => {
        return await axios.delete(
            CONFIG_API.GENRE.DELETE_MULTI, {
                data: {ids},
            }
        );
    },
    add: async (payload: any) => {
        return await axios.post<IBackendRes<IGenre>>(CONFIG_API.GENRE.INDEX, payload)
    },
    update: async (id: string, payload: any) => {
        return await axios.patch(`${CONFIG_API.GENRE.UPDATE}/${id}`, payload)
    },

    //  trash
    listTrash: async (query: string) => {
        return await axios.get<IBackendRes<IModelPaginate<IGenre>>>(
            `${CONFIG_API.GENRE.TRASH}?${query}`
        );
    },
    detailTrash: async (id: string) => {
        return await axios.get<IBackendRes<IGenre>>(
            `${CONFIG_API.GENRE.TRASH}/${id}`
        );
    },
    hardRemove: async (id: string) => {
        return await axios.delete(
            `${CONFIG_API.GENRE.HARD_DELETE}/${id}`
        );
    },
    hardRemoveMulti: async (ids: string[]) => {
        return await axios.delete(
            CONFIG_API.GENRE.HARD_DELETE_MULTI, {
                data: {ids},
            }
        );
    },
    restore: async (id: string) => {
        return await axios.patch(
            `${CONFIG_API.GENRE.RESTORE}/${id}`
        );
    },
    restoreMulti: async (ids: string[]) => {
        return await axios.patch(
            CONFIG_API.GENRE.RESTORE_MULTI, {ids}
        );
    },

    // import/export
    export: async (query: string) => {
        await ExportService.export(`${CONFIG_API.GENRE.EXPORT}?${query}`, 'genres.xlsx')
    },
    exportTemplate: async (fileName = "import_template.xlsx") => {
        await ExportService.export(CONFIG_API.GENRE.EXPORT_TEMPLATE, fileName);
    },
    import: (file: File) => {
        const formData = new FormData();
        formData.append("file", file)

        return axios.post(CONFIG_API.GENRE.IMPORT, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

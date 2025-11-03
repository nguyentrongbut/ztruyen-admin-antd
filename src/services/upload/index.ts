// ** Services
import axios from "@/services/axios-customize";

// ** Configs
import {CONFIG_API} from "@/configs/apis";

// ** Types
import type {IUpload} from "@/types/backend";

export const UploadService = {
    uploadImg: (file: File, caption: string) => {
        const formData = new FormData();
        formData.append("file", file);
        if (caption) formData.append("caption", caption);

        return axios.post<IBackendRes<IUpload>>(CONFIG_API.UPLOAD.ONE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
}
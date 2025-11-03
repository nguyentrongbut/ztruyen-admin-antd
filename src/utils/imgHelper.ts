import {CONFIG_API} from "@/configs/apis";

export const imgHelper = (url?: string | null): string | undefined => {
    if (!url) return undefined;

    try {
        const cleanPath = url.split("?")[0].split("#")[0].replace(/\/+$/, "");

        const parts = cleanPath.split("/");
        return parts.pop();
    } catch {
        return undefined;
    }
};

export const isInternalImage = (url?: string) => {
    if (!url) return false;
    return url.includes(CONFIG_API.UPLOAD.IMAGE)
};
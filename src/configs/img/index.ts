import {BASE_URL} from "@/configs/apis";

const BASE_URL_IMG = `${BASE_URL}/images`

export const CONFIG_IMG = {
    AVATAR: `${BASE_URL_IMG}/avatar`,
    COVER: `${BASE_URL_IMG}/cover`
} as const;
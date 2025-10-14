// ** Services
import axios from "@/services/axios-customize";

// ** Types
import type {IUser} from "@/types/backend";

// ** Configs
import {CONFIG_API} from "@/configs/apis";

export const UserService = {
    getProfile: () => axios.get<IBackendRes<IUser>>(CONFIG_API.USER.PROFILE),
};

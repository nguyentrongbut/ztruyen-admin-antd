// ** Services
import axios from "@/services/axios-customize"

// ** Types
import type {ILogin} from "@/types/backend";

// ** Configs
import {CONFIG_API} from "@/configs/apis";

interface LoginPayload {
    email: string;
    password: string;
}

export const AuthService = {
    login: (payload: LoginPayload) => axios.post<IBackendRes<ILogin>>(CONFIG_API.AUTH.LOGIN, payload, {skipAuth: true}),
};

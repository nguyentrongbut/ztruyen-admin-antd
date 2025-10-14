// ** React
import type {ReactNode} from "react";
import { Navigate } from "react-router";

// ** Hooks
import {useCurrentApp} from "@/hooks/useCurrentApp.ts";

// ** Components
import Loading from "@/components/common/loading";

// ** Configs
import {CONFIG_ROLE} from "@/configs/role";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, user, isAppLoading } = useCurrentApp();

    if (isAppLoading) {
        return <Loading/>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== CONFIG_ROLE.ADMIN) {
        return <Navigate to="/403" replace />;
    }

    return <>{children}</>;
};

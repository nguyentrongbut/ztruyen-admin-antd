// ** React
import {createContext, type ReactNode, useEffect, useState} from "react";

// ** Types
import type {IUserLogin} from "@/types/backend";

// ** Services
import {UserService} from "@/services/user";

interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUserLogin | null) => void;
    user: IUserLogin | null;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;
    fetchProfile: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = { children: ReactNode };

export const AppProvider = ({children}: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<IUserLogin | null>(null);
    const [isAppLoading, setIsAppLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("ZTC_ATK");
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                setIsAppLoading(false);
                return;
            }

            const res = await UserService.getProfile();

            if (res?.data) {
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem("ZTC_ATK");
            }
        } catch (err) {
            console.error("fetchProfile error:", err);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsAppLoading(false);
        }
    };

    useEffect(() => {
        const handleTokenRefreshed = () => {
            fetchProfile();
        };

        window.addEventListener("tokenRefreshed", handleTokenRefreshed);

        fetchProfile();

        return () => {
            window.removeEventListener("tokenRefreshed", handleTokenRefreshed);
        };
    }, []);

    return (
        <CurrentAppContext.Provider
            value={{
                isAuthenticated,
                user,
                setIsAuthenticated,
                setUser,
                isAppLoading,
                setIsAppLoading,
                fetchProfile,
            }}
        >
            {children}
        </CurrentAppContext.Provider>
    );
};

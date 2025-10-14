// ** React
import {useContext} from "react";

// ** Context
import {CurrentAppContext} from "@/context/app.context.tsx";

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAppContext.Provider>"
        );
    }

    return currentAppContext;
};
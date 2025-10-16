// ** React
import type {ReactNode} from "react";

// ** Antd
import {ConfigProvider, theme as antdTheme} from "antd";

// ** Configs
import {THEME_DARK_CONFIG, THEME_LIGHT_CONFIG} from "@/configs/themes";

// ** Hooks
import {useTheme} from "@/hooks/useTheme.ts";

const CustomTheme = ({children}: { children: ReactNode }) => {

    const { theme } = useTheme()
    const isDark = theme === "dark";

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? antdTheme.darkAlgorithm
                    : antdTheme.defaultAlgorithm,
                token: {
                    ...(isDark ? THEME_DARK_CONFIG : THEME_LIGHT_CONFIG),
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default CustomTheme
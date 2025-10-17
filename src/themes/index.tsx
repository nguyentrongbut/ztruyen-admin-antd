// ** React
import type {ReactNode} from "react";

// ** Antd
import {ConfigProvider, theme as antdTheme} from "antd";

// ** Configs
import {THEME_DARK_CONFIG, THEME_LIGHT_CONFIG} from "@/configs/themes";

// ** Hooks
import {useTheme} from "@/hooks/useTheme.ts";

const CustomTheme = ({children}: { children: ReactNode }) => {

    const {theme} = useTheme()
    const isDark = theme === "dark";

    const currentTheme = isDark ? THEME_DARK_CONFIG : THEME_LIGHT_CONFIG;

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? antdTheme.darkAlgorithm
                    : antdTheme.defaultAlgorithm,
                token: {
                    ...currentTheme.GLOBAL,
                },
                components: {
                    Layout: {
                        siderBg: currentTheme.GLOBAL.colorBgLayout
                    },
                    Menu: {
                       ...currentTheme.MENU
                    }
                }
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default CustomTheme
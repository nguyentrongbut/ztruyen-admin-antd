// ** React
import type {ReactNode} from "react";

// ** Antd
import {ConfigProvider, theme} from "antd";

// ** Configs
import {THEME_LIGHT_CONFIG} from "@/configs/themes";

const CustomTheme = ({children}: { children: ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: THEME_LIGHT_CONFIG.PRIMARY_COLOR,
                    colorBgLayout: THEME_LIGHT_CONFIG.BG_COLOR_PRIMARY,
                    fontFamily: THEME_LIGHT_CONFIG.FONT_FAMILY,
                    colorBgMask: THEME_LIGHT_CONFIG.BG_COLOR_MASK
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default CustomTheme
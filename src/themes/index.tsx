// ** React
import type {ReactNode} from "react";

// ** Antd
import {ConfigProvider, theme} from "antd";

// ** Configs
import {THEME_CONFIG} from "@/configs/themes";

const CustomTheme = ({children}: {children: ReactNode}) => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: THEME_CONFIG.PRIMARY_COLOR,
                    fontFamily: THEME_CONFIG.FONT_FAMILY,
                    colorBgMask: THEME_CONFIG.BG_COLOR_MASK
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default CustomTheme
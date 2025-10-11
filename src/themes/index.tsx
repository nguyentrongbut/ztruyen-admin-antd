// ** React
import type {ReactNode} from "react";

// ** Antd
import {ConfigProvider} from "antd";

// ** Configs
import {THEME_CONFIG} from "@/configs/themes";

const CustomTheme = ({children}: {children: ReactNode}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: THEME_CONFIG.PRIMARY_COLOR,
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default CustomTheme
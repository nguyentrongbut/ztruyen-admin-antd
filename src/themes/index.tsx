// ** React
import type {ReactNode} from "react";

// ** Antd
import {ConfigProvider} from "antd";

// ** Configs
import {THEME_CONFIG} from "../configs/themes";

const CustomTheme = ({children}: {children: ReactNode}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: THEME_CONFIG.PRIMARY_COLOR,
                    borderRadius: 8,
                    fontSize: 16,
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default CustomTheme
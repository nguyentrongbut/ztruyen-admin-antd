// ** Styles
import "@/styles/main.scss";

// ** Theme
import CustomTheme from "@/themes";

// ** Routes
import AppRoutes from "@/routes";

// ** React helmet
import {HelmetProvider} from "react-helmet-async";

// ** Contents
import {AppProvider} from "@/context/app.context.tsx";

// ** antd
import {App as AntdApp} from "antd";

function App() {
    return (
        <HelmetProvider>
            <AppProvider>
                <AntdApp>
                    <CustomTheme>
                        <AppRoutes/>
                    </CustomTheme>
                </AntdApp>
            </AppProvider>
        </HelmetProvider>
    )
}

export default App

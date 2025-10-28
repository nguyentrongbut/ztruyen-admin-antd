// ** React query
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

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
import {ThemeProvider} from "@/context/theme.context.tsx";

// ** antd
import {App as AntdApp} from "antd";

const queryClient = new QueryClient()

function App() {
    return (
        <HelmetProvider>
            <AppProvider>
                <AntdApp>
                    <ThemeProvider>
                        <CustomTheme>
                            <QueryClientProvider client={queryClient}>
                            <AppRoutes/>
                                <ReactQueryDevtools initialIsOpen={false}/>
                            </QueryClientProvider>
                        </CustomTheme>
                    </ThemeProvider>
                </AntdApp>
            </AppProvider>
        </HelmetProvider>
    )
}

export default App

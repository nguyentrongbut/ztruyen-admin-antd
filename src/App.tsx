// ** Styles
import 'antd/dist/reset.css';

// ** Theme
import CustomTheme from "@/themes";

// ** Routes
import AppRoutes from "@/routes";

// ** React helmet
import {HelmetProvider} from "react-helmet-async";

function App() {
    return (
        <HelmetProvider>
            <CustomTheme>
                <AppRoutes/>
            </CustomTheme>
        </HelmetProvider>
    )
}

export default App

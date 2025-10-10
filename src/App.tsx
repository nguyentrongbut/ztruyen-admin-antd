// ** Antd
import {Button, Flex} from "antd";

// ** Styles
import 'antd/dist/reset.css';

// ** Theme
import CustomTheme from "@/themes";

function App() {
    return (
        <CustomTheme>
            <Flex gap="small" wrap>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
            </Flex>
        </CustomTheme>
    )
}

export default App

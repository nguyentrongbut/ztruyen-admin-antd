// ** React
import {Outlet} from "react-router";

// ** Layouts
import Header from "@/layouts/default-layout/components/header";
import Sidebar from "@/layouts/default-layout/components/sidebar";

// ** antd
import {Layout} from "antd";

// ** Hooks
import useResponsive from "@/hooks/useResponsive.ts";

const {Content} = Layout;

const DefaultLayout = () => {

    const {isMd} = useResponsive()

    return (
        <Layout hasSider>
            {isMd && (
                <Sidebar/>
            )}
            <Header isMd={isMd}/>
            <Content
                style={{margin: '24px 16px 0', overflow: 'initial'}}
            >
                <Outlet/>
            </Content>
        </Layout>
    )
}

export default DefaultLayout
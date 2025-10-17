// ** React
import {Outlet} from "react-router";

// ** Layouts
import Header from "@/layouts/default-layout/components/header";
import Sidebar from "@/layouts/default-layout/components/sidebar";

// ** antd
import {Layout} from "antd";

const {Content} = Layout;

const DefaultLayout = () => {
    return (
        <Layout hasSider>
                <Sidebar/>
            <Header/>
            <Content
                style={{margin: '24px 16px 0', overflow: 'initial'}}
            >
                <Outlet/>
            </Content>
        </Layout>
    )
}

export default DefaultLayout
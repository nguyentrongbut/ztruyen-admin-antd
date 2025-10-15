// ** React
import {Outlet} from "react-router";

// ** Layouts
import Header from "@/layouts/default-layout/components/header";

// ** antd
import {Layout} from "antd";

const DefaultLayout = () => {
    return (
        <Layout>
            <Header/>
            <Outlet />
        </Layout>
    )
}

export default DefaultLayout
// ** React
import {Outlet} from "react-router";

// ** Layouts
import Header from "@/layouts/default-layout/components/header";
import Sidebar from "@/layouts/default-layout/components/sidebar";

// ** antd
import {Layout} from "antd";

// ** Hooks
import useResponsive from "@/hooks/useResponsive.ts";

// ** Style
import styles from "@/layouts/default-layout/default.layout.module.scss"

// ** clsx
import clsx from "clsx";

const {Content} = Layout;

const DefaultLayout = () => {

    const {isMd} = useResponsive()

    return (
        <Layout hasSider style={{ minHeight: "100vh" }}>
            {isMd && (
                <Sidebar/>
            )}
            <Header isMd={isMd}/>
            <Content className={clsx(styles.wrapper, "select-none")}>
                <Outlet/>
            </Content>
        </Layout>
    )
}

export default DefaultLayout
// ** React
import {useState} from "react";

// ** antd
import {Flex, Layout, Menu, theme} from "antd";

// ** Styles
import styles from "@/layouts/default-layout/components/sidebar/slidebar.module.scss"

import {RightOutlined, LeftOutlined,} from "@ant-design/icons";

// ** clsx
import clsx from "clsx";

// ** Configs
import useMenuItems from "@/configs/menu-items";

const {Sider} = Layout;


const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);

    const items = useMenuItems();

    const {
        token: {colorBgLayout, colorText},
    } = theme.useToken();

    return (
        <Sider width={257} className={styles.wrapper} collapsed={collapsed} collapsible trigger={null}>
            <Flex justify='center' align='center'
                  className={clsx(styles.collapsedBtn, "cursor-pointer")}
                  style={{
                      backgroundColor: colorBgLayout,
                      color: colorText,
                  }}
                  onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <RightOutlined className={styles.icon}/> : <LeftOutlined className={styles.icon}/>}
            </Flex>
            <div className="demo-logo-vertical"/>
            <Menu mode="inline" style={{height: '100%'}} defaultSelectedKeys={['4']} items={items}/>
        </Sider>
    )
}

export default Sidebar
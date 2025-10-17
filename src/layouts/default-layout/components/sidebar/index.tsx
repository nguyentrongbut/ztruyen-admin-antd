// ** React
import {useState} from "react";

// ** antd
import {Layout, Menu} from "antd";

// ** Styles
import styles from "@/layouts/default-layout/components/sidebar/slidebar.module.scss"

// ** clsx
import clsx from "clsx";

// ** Configs
import useMenuItems from "@/configs/menu-items";
import CollapsedBtn from "@/layouts/default-layout/components/collapsed-btn";

const {Sider} = Layout;

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const items = useMenuItems();

    return (
        <div className={styles.wrapper}>
            <CollapsedBtn collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Sider width={257} className={clsx(styles.sidebar, 'custom-scroll')} collapsed={collapsed} collapsible
                   trigger={null}>
                <Menu
                    mode="inline" style={{height: '100%'}}
                    defaultSelectedKeys={['/dashboard']}
                    items={items}
                />
            </Sider>
        </div>
    )
}

export default Sidebar
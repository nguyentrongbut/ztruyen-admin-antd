// ** React
import {useState} from "react";
import {Link, useLocation} from "react-router";

// ** Antd
import {Drawer, Flex, Menu, Switch, theme as themeAntd} from "antd";

// ** styles
import styles from '@/layouts/default-layout/components/header/header.module.scss'

// ** Components
import Logo from "@/components/common/logo";
import TranslationDropdown from "@/components/common/translation-dropdown";
import AvatarDropdown from "@/components/common/avatar-dropdown";

// ** Layout components
import CollapsedBtn from "@/layouts/default-layout/components/collapsed-btn";

// ** icons
import {MenuOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";

// ** hooks
import {useTheme} from "@/hooks/useTheme.ts";

// ** configs
import useMenuItems from "@/configs/menu-items";

interface IHeaderProps {
    isMd: boolean
}

const Header = ({isMd}: IHeaderProps) => {

    const {theme, toggleTheme} = useTheme();

    const [openSidebar, setOpenSidebar] = useState(false);
    const location = useLocation();

    const {
        token: {colorText},
    } = themeAntd.useToken()

    const items = useMenuItems();

    return (
        <header className={styles.wrapper}>
            <Flex justify='space-between' align='center'>
                <Flex align='center' gap='middle'>
                    {!isMd && (
                        <>
                            <MenuOutlined
                                className={styles.icon}
                                style={{color: colorText}}
                                onClick={() => setOpenSidebar(true)}/>
                            <Drawer
                                placement='left'
                                open={openSidebar}
                                width={248}
                                closable={false}
                                bodyStyle={{padding: 0}}
                                onClose={() => setOpenSidebar(false)}
                                rootClassName='hidden-overlay--drawer custom-scroll--drawer'
                                className={styles.sidebar}
                            >
                                <CollapsedBtn collapsed={openSidebar} setCollapsed={setOpenSidebar} drawer/>
                                <Menu
                                    mode="inline" style={{height: '100%'}}
                                    items={items}
                                    selectedKeys={[location.pathname]}
                                />
                            </Drawer>
                        </>
                    )}
                    <Link to='/'>
                        <Logo/>
                    </Link>
                </Flex>
                <Flex align='center' gap='middle'>
                    <TranslationDropdown/>
                    <AvatarDropdown/>
                    <Switch
                        style={{marginTop: '10px'}}
                        checkedChildren={<SunOutlined/>}
                        unCheckedChildren={<MoonOutlined/>}
                        checked={theme === "light"}
                        onChange={toggleTheme}
                    />
                </Flex>
            </Flex>
        </header>
    )
}

export default Header
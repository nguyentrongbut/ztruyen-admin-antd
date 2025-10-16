// ** React
import {Link} from "react-router";

// ** Antd
import {Flex, Switch} from "antd";

// ** styles
import styles from '@/layouts/default-layout/components/header/header.module.scss'

// ** Components
import Logo from "@/components/common/logo";
import TranslationDropdown from "@/components/common/translation-dropdown";
import AvatarDropdown from "@/components/common/avatar-dropdown";

// ** icons
import {MoonOutlined, SunOutlined} from "@ant-design/icons";

// ** hooks
import {useTheme} from "@/hooks/useTheme.ts";

const Header = () => {

    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.wrapper}>
           <Flex justify='space-between' align='center'>
               <Link to='/'>
                   <Logo/>
               </Link>
               <Flex align='center' gap='middle'>
                   <TranslationDropdown />
                   <AvatarDropdown/>
                   <Switch
                       style={{marginTop: '10px'}}
                       checkedChildren={<SunOutlined />}
                       unCheckedChildren={<MoonOutlined />}
                       checked={theme === "light"}
                       onChange={toggleTheme}
                   />
               </Flex>
           </Flex>
        </header>
    )
}

export default Header
// ** React
import {Link} from "react-router";

// ** Antd
import {Flex, Layout} from "antd";

// ** styles
import styles from '@/layouts/default-layout/components/header/header.module.scss'

// ** Components
import Logo from "@/components/common/logo";
import TranslationDropdown from "@/components/common/translation-dropdown";
import AvatarDropdown from "@/components/common/avatar-dropdown";

const {Header: AntdHeader} = Layout;

const Header = () => {

    return (
        <AntdHeader className={styles.wrapper}>
           <Flex justify='space-between' align='center'>
               <Link to='/'>
                   <Logo/>
               </Link>
               <Flex align='center' gap='middle'>
                   <TranslationDropdown />
                   <AvatarDropdown/>
               </Flex>
           </Flex>
        </AntdHeader>
    )
}

export default Header
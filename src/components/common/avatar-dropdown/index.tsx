// ** React
import {useState} from "react";

// ** Hooks
import {useCurrentApp} from "@/hooks/useCurrentApp.ts";

// ** i18n
import {useTranslation} from "react-i18next";

// ** Antd
import {App, Avatar, Dropdown, Flex, type MenuProps, Typography} from "antd";

// ** Styles
import styles from "@/components/common/avatar-dropdown/avatar.dropdown.module.scss"

// ** Icons
import {LogoutOutlined} from "@ant-design/icons";

// ** Components
import Loading from "@/components/common/loading";

// ** Services
import {AuthService} from "@/services/auth";

// ** clsx
import clsx from "clsx";

// ** Configs


const {Text} = Typography;

const AvatarDropdown = () => {

    const {t} = useTranslation()

    const {user, setUser, setIsAuthenticated} = useCurrentApp()

    const {message, notification} = App.useApp()

    const [isLoading, setIsLoading] = useState(false)

    const items: MenuProps["items"] = [
        {
            key: "logout",
            label: (
                <Flex gap='small' onClick={() => handleLogout()}>
                    <LogoutOutlined/>
                    <Text>
                        {t('logout')}
                    </Text>
                </Flex>
            ),
        },
    ];

    if (isLoading) return <Loading/>

    const handleLogout = async () => {
        setIsLoading(true)
        const res = await AuthService.logout()
        setIsLoading(false)
        if (res?.data) {
            localStorage.removeItem('ZTC_ATK');
            message.success(t('logout_success'));
            setIsAuthenticated(false);
            setUser(null)
        } else {
            notification.error({
                message: t('error_general'),
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    }

    return (
        <Dropdown menu={{items}} placement='top'>
            <Flex gap='small' align='end' className={clsx(styles.wrapper, 'cursor-pointer hover-bg')}>
                {/*`${CONFIG_IMG.AVATAR}/tst-3`*/}
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"/>
                <Text className={styles.name}>{user?.name || 'Admin'}</Text>
            </Flex>
        </Dropdown>
    )
}

export default AvatarDropdown
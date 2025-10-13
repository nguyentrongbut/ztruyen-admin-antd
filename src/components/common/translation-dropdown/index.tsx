// ** React
import {useState} from "react";

// ** Styles
import styles from '@/components/common/translation-dropdown/transilation.dropdown.module.scss'

// ** i18n
import {useTranslation} from "react-i18next";

// ** antd
import {Button, Dropdown, type MenuProps} from "antd";

// ** icon
import { TranslationOutlined } from "@ant-design/icons";


const TranslationDropdown = () => {
    const {i18n} = useTranslation();

    const [language, setLanguage] = useState<string>("vi");

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className={`${language === 'vi' ? styles.itemActive : ''}`} onClick={() => {
                    i18n.changeLanguage("vi")
                    setLanguage("vi")
                }}>🇻🇳 Tiếng Việt</div>
            ),
        },
        {
            key: '2',
            label: (
                <div className={`${language === 'en' ? styles.itemActive : ''}`} onClick={() => {
                    i18n.changeLanguage("en")
                    setLanguage("en")
                }}>🇺🇸 English</div>
            ),
        },
    ];
    return (
        <div className={styles.wrapper}>
            <Dropdown menu={{items}} placement="bottomRight">
                <Button className={styles.btn}>
                    <TranslationOutlined/>
                </Button>
            </Dropdown>
        </div>
    )
}

export default TranslationDropdown
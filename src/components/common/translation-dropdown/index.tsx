// ** React
import { useEffect, useState } from "react";

// ** Styles
import styles from "@/components/common/translation-dropdown/transilation.dropdown.module.scss";

// ** i18n
import { useTranslation } from "react-i18next";

// ** antd
import { Button, Dropdown, type MenuProps } from "antd";

// ** icon
import { TranslationOutlined } from "@ant-design/icons";

const TranslationDropdown = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
    };

    const items: MenuProps["items"] = [
        {
            key: "vi",
            label: (
                <div
                    className={`${language === "vi" ? styles.itemActive : ""}`}
                    onClick={() => changeLanguage("vi")}
                >
                    🇻🇳 Tiếng Việt
                </div>
            ),
        },
        {
            key: "en",
            label: (
                <div
                    className={`${language === "en" ? styles.itemActive : ""}`}
                    onClick={() => changeLanguage("en")}
                >
                    🇺🇸 English
                </div>
            ),
        },
    ];

    return (
        <div className={styles.wrapper}>
            <Dropdown menu={{ items }} placement="bottomRight">
                <Button className={styles.btn}>
                    <TranslationOutlined />
                </Button>
            </Dropdown>
        </div>
    );
};

export default TranslationDropdown;

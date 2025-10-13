// ** React helmet
import {Helmet} from "react-helmet-async";

// ** i18n
import {useTranslation} from "react-i18next";

// ** antd
import {Button} from "antd";

const Login = () => {

    const { t, i18n } = useTranslation();

    return (
        <>
            <Helmet>
                <title>Ztruyen - {t('login')}</title>
            </Helmet>
            <h1>{t("login")} page</h1>

            <Button onClick={() => i18n.changeLanguage("vi")}>🇻🇳 Tiếng Việt</Button>
            <Button onClick={() => i18n.changeLanguage("en")}>🇬🇧 English</Button>

            <p>Current language: {i18n.language}</p>
            
        </>
    )
}

export default Login
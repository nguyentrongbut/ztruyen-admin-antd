// ** React
import {useNavigate} from "react-router";

// ** Antd
import {Button, Result} from "antd";

// ** i18n
import {useTranslation} from "react-i18next";

// ** Styles
import styles from '@/pages/403/forbidden.module.scss'

const ForbiddenPage = () => {

    const navigate = useNavigate();

    const {t} = useTranslation();

    return (
       <div className={styles.wrapper}>
           <Result
               status="403"
               title="403"
               subTitle={t('403')}
               extra={<Button type="primary"
                              onClick={() => navigate('/login')}
               >{t('back_login')}</Button>}
           />
       </div>
    )
}

export default ForbiddenPage;
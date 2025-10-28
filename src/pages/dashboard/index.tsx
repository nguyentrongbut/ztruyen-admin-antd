// ** antd
import {Breadcrumb} from "antd";

// ** i18n
import {useTranslation} from "react-i18next";

const Dashboard = () => {

    const { t } = useTranslation();

    return (
        <div>
            <Breadcrumb
                items={[{ title: t('menu.dashboard') }]}
            />
        </div>
    )
}

export default Dashboard;
// ** React
import {useNavigate} from "react-router";

// ** Antd
import {Button, Flex, Layout, Result} from "antd";

// ** i18n
import {useTranslation} from "react-i18next";

const ForbiddenPage = () => {

    const navigate = useNavigate();

    const {t} = useTranslation();

    return (
        <Layout>
            <Flex justify='center' align='center' style={{height: '100vh'}}>
                <Result
                    status="403"
                    title="403"
                    subTitle={t('403')}
                    extra={
                        <Button type="primary"
                                onClick={() => navigate('/login')}
                        >
                            {t('back_login')}
                        </Button>
                    }
                />
            </Flex>
        </Layout>
    )
}

export default ForbiddenPage;
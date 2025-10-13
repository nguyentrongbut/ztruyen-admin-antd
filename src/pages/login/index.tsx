// ** React
import {Link} from "react-router";

// ** React helmet
import {Helmet} from "react-helmet-async";

// ** Styles
import styles from "@/pages/login/login.module.scss"

// ** i18n
import {useTranslation} from "react-i18next";

// ** antd
import {Button, Form, type FormProps, Input, message} from "antd";

// ** Components
import Logo from "@/components/common/logo";
import TranslationDropdown from "@/components/common/translation-dropdown";

// ** icon
import {GithubOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";

type FieldType = {
    email?: string;
    password?: string;
};

const Login = () => {

    const {t} = useTranslation();

    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        message.success(t('login_success'));
    };

    return (
        <>
            <Helmet>
                <title>Ztruyen - {t('login')}</title>
            </Helmet>
            <TranslationDropdown/>
            <div className={styles.bg}>
                <Logo/>
                <p className={styles.desc}>{t('desc_login')}</p>
                <div className={styles.formWrapper}>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item<FieldType>
                            name='email'
                            rules={[
                                {required: true, message: t('email_required')},
                                {type: 'email', message: t('email_invalid')},
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined/>}
                                size='large' placeholder="Email: email@gmail.com"/>
                        </Form.Item>
                        <Form.Item<FieldType>
                            name='password'
                            rules={[
                                {required: true, message: t('password_required')},
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve();

                                        if (value.length < 6)
                                            return Promise.reject(new Error(t('password_min_length')));
                                        if (!/[A-Z]/.test(value))
                                            return Promise.reject(new Error(t('password_uppercase')));
                                        if (!/[a-z]/.test(value))
                                            return Promise.reject(new Error(t('password_lowercase')));
                                        if (!/[0-9]/.test(value))
                                            return Promise.reject(new Error(t('password_number')));
                                        if (!/[@$!%*?&]/.test(value))
                                            return Promise.reject(new Error(t('password_special')));

                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                size='large' placeholder={t('placeholder_pass_login')}/>
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles.btn}
                                    size='large' type="primary"
                                    htmlType="submit">
                                {t('login')}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.footer}>
                    <div className={styles.groupLink}>
                        <Link to='https://ztruyen.io.vn/' target='_blank'>Ztruyen</Link>
                        <Link to='https://github.com/nguyentrongbut' target='_blank' className={styles.githubLink}>
                            <GithubOutlined/>
                            Bút
                        </Link>
                    </div>
                    <p>© {t('copy_right_login')}</p>
                </div>
            </div>
        </>
    )
}

export default Login
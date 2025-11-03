// ** React
import {useState} from "react";

// ** React Query
import {useQuery} from "@tanstack/react-query";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** Icon
import {EyeOutlined} from "@ant-design/icons";

// ** Services
import {UserService} from "@/services/user";

// ** style
import styles from '@/pages/users/view/user.detail.module.scss'

// ** antd
import {App, Avatar, Flex, Space, Typography} from "antd";

// ** i18n
import type {TFunction} from "i18next";

// ** Dayjs
import dayjs from "dayjs";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";

// ** Types
import type {IUser} from "@/types/backend";

interface IUserDetail {
    id: string;
    t: TFunction
}

interface IListDetail {
    key: string;
    value: string | number | undefined;
}

const {Text, Title} = Typography;

const UserDetail = ({id, t}: IUserDetail) => {

    const [visible, setVisible] = useState(false);

    const {notification} = App.useApp()

    const {data, isLoading} = useQuery({
        queryKey: ["getDetailUser", id],
        queryFn: async () => {
            try {
                const res = await UserService.detail(id);
                return handleResponse<IUser>(res)
            } catch (err: any) {
                notification.error({
                    message: t("error_general"),
                    description: Array.isArray(err.message)
                        ? err.message[0]
                        : err.message || t("error_general"),
                    duration: 5,
                });
            }
        },
        enabled: visible,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const infoUser = data?.data;

    const listDetail: IListDetail[] = [
        {
            key: "Email",
            value: infoUser?.email,
        },
        {
            key: t("user.columns.role"),
            value: t(`user.roles.${infoUser?.role}`),
        },
        {
            key: t("user.columns.provider"),
            value: t(`user.providers.${infoUser?.provider}`),
        },
        {
            key: t("user.columns.gender"),
            value: infoUser?.gender ? t(`user.genders.${infoUser?.gender}`) :
                t('user.columns.notSet'),
        },
        {
            key: t("user.columns.age"),
            value: infoUser?.age ? infoUser?.age :
                t('user.columns.notSet'),
        },
        {
            key: t("user.columns.birthday"),
            value: infoUser?.birthday ? dayjs(infoUser?.birthday).format("DD-MM-YYYY") :
                t('user.columns.notSet'),
        },
        {
            key: t("user.columns.createdAt"),
            value: dayjs(infoUser?.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            key: t("user.columns.updatedAt"),
            value: dayjs(infoUser?.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
        },
    ]

    return (
        <ModalAction
            title={t("user.detail.title")}
            icon={<EyeOutlined/>}
            centered
            loading={isLoading}
            footer={null}
            onOpen={() => setVisible(true)}
            onCancel={() => setVisible(false)}
        >
            <Space direction='vertical' className='w-full mt-10'>
                <div className={styles.cover}>
                    <div
                        className={styles.avatarContainer}
                        style={{left: infoUser?.avatar_frame ? undefined : '5%'}}
                    >
                        <div className={styles.avatarWrapper}>
                            <Avatar className={styles.avatar} src={infoUser?.avatar}
                                    alt={infoUser?.name}/>
                            <div className={styles.frameWrapper}>
                                {infoUser?.avatar_frame && (
                                    <img className={styles.frame} src={infoUser?.avatar_frame} alt="frame"/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Title level={4} className={styles.content}>{infoUser?.name}</Title>
                    <Text type='secondary'>{infoUser?.bio}</Text>
                </div>
                {listDetail.map((item) => (
                    <Flex
                        key={item.key}
                        align="center"
                        justify="space-between"
                        className='mt-10'
                    >
                        <Text strong>{item.key}</Text>
                        <Text>{item.value || "-"}</Text>
                    </Flex>
                ))}
            </Space>
        </ModalAction>
    )
}

export default UserDetail;
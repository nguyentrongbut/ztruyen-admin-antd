// ** i18n
import type {TFunction} from "i18next";

// ** antd
import {Space, Tag} from "antd";
import type {TableProps} from "antd";

// ** Type
import type {IUser} from "@/types/backend";

// ** Dayjs
import dayjs from "dayjs";

// ** Page components
import UserDetail from "@/pages/users/view";
import DeleteUser from "@/pages/users/delete";
import UpdateUser from "@/pages/users/update";

export const listUserColumns = (
    t: TFunction
): TableProps<IUser>["columns"] => {

    return [
        {
            title: t("user.columns.name"),
            dataIndex: "name",
            key: "name",
            sorter: true,
            showSorterTooltip: false,
        },
        {
            title: t("user.columns.email"),
            dataIndex: "email",
            key: "email",
            sorter: true,
            showSorterTooltip: false,
        },
        {
            title: t("user.columns.age"),
            dataIndex: "age",
            key: "age",
            sorter: true,
            showSorterTooltip: false,
        },
        {
            title: t("user.columns.gender"),
            dataIndex: "gender",
            key: "gender",
            render: (text: string) => {
                if (!text) {
                    return <Tag>{t('user.columns.notSet')}</Tag>;
                }

                const color = text === "male" ? "blue" : "pink";
                return <Tag color={color}>{t(`user.genders.${text}`)}</Tag>;
            },
        },
        {
            title: t("user.columns.role"),
            dataIndex: "role",
            key: "role",
            render: (text: string) => (
                <Tag color={text === "author" ? "red" : "green"}>
                    {t(`user.roles.${text}`)}
                </Tag>
            ),
        },
        {
            title: t("user.columns.provider"),
            dataIndex: "provider",
            key: "provider",
            render: (text: string) => {
                let color = "";

                switch (text) {
                    case "local":
                        color = "default";
                        break;
                    case "facebook":
                        color = "blue";
                        break;
                    case "google":
                        color = "red";
                        break;
                    default:
                        color = "purple";
                }

                return <Tag color={color}>{t(`user.providers.${text}`)}</Tag>;
            },
        },
        {
            title: t("user.columns.createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: true,
            showSorterTooltip: false,
            render: (text: string) =>
                dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            title: t("user.columns.updatedAt"),
            dataIndex: "updatedAt",
            key: "updatedAt",
            sorter: true,
            showSorterTooltip: false,
            render: (text: string) =>
                dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            title: t("user.columns.action"),
            key: "action",
            fixed: "right",
            render: (_, record) => (
                <Space size="middle">
                    <UserDetail id={record?._id as string} t={t}/>
                    <UpdateUser id={record?._id as string} t={t}/>
                    <DeleteUser id={record._id as string} t={t} name={record?.name}/>
                </Space>
            ),
        },
    ];
}

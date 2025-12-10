// ** i18n
import type {TFunction} from "i18next";

// ** antd
import {Space, Tag} from "antd";
import type {TableProps} from "antd";

// ** Type
import type {IUser} from "@/types/backend";

// ** Dayjs
import dayjs from "dayjs";

// ** Services
import {UserService} from "@/services/user";

// ** Page components
import UserDetail from "@/pages/users/components/view";
import UpdateUser from "@/pages/users/update";
import DeleteRestoreActions from "@/components/common/delete-restore-actions";

export const listUserColumns = (
    t: TFunction,
    action: boolean = true,
    trash: boolean = false,
): TableProps<IUser>["columns"] => {
    const columns: TableProps<IUser>["columns"] = [
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
                if (!text) return <Tag>{t('user.columns.notSet')}</Tag>;
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
            title: trash ? t('user.columns.deletedAt') : t("user.columns.updatedAt"),
            dataIndex: "updatedAt",
            key: "updatedAt",
            sorter: true,
            showSorterTooltip: false,
            render: (text: string) =>
                dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
        },
    ];

    if (action) {
        columns.push({
            title: t("user.columns.action"),
            key: "action",
            fixed: "right",
            render: (_, record) => (
                <Space size="middle">
                    {trash ? (
                        <>
                            <UserDetail
                                id={record?._id as string}
                                t={t}
                                fetchDetail={UserService.detailTrash}
                            />
                            <DeleteRestoreActions
                                id={record._id as string}
                                t={t} name={record?.name}
                                title={t("user.restore.title")}
                                desc={t("user.restore.desc")}
                                messageSuccess={t("user.restore.restored_success")}
                                api={UserService.restore}
                                queryKey={["getListTrashUser"]}
                                action='restore'
                            />
                            <DeleteRestoreActions
                                id={record._id as string}
                                t={t} name={record?.name}
                                title={t("user.delete.title")}
                                desc={t("user.delete.hard_desc")}
                                messageSuccess={t("user.delete.deleted_success")}
                                api={UserService.hardRemove}
                                queryKey={["getListTrashUser"]}
                            />
                        </>
                    ) : (
                        <>
                            <UserDetail
                                id={record?._id as string}
                                t={t}
                                fetchDetail={UserService.detail}
                            />
                            <UpdateUser id={record?._id as string} t={t}/>
                            <DeleteRestoreActions
                                id={record._id as string} t={t}
                                name={record?.name}
                                api={UserService.remove}
                                title={t("user.delete.title")}
                                desc={t("user.delete.desc")}
                                messageSuccess={t("user.delete.deleted_success")}
                                queryKey={["getListUser"]}
                            />
                        </>
                    )}
                </Space>
            ),
        });
    }

    return columns;
}


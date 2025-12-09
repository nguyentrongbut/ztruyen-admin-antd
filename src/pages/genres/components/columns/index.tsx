// ** i18n
import type {TFunction} from "i18next";

// ** antd
import {Space} from "antd";
import type {TableProps} from "antd";

// ** Type
import type {IGenre} from "@/types/backend";

// ** Dayjs
import dayjs from "dayjs";

// ** Services
import {GenreService} from "@/services/genre";

// ** Page components
import DeleteRestoreActions from "@/components/common/delete-restore-actions";
import UpdateGenre from "@/pages/genres/update";

export const listGenreColumns = (
    t: TFunction,
    action: boolean = true,
    trash: boolean = false,
): TableProps<IGenre>["columns"] => {
    const columns: TableProps<IGenre>["columns"] = [
        {
            title: t("genre.columns.name"),
            dataIndex: "name",
            key: "name",
            sorter: true,
            showSorterTooltip: false,
        },
        {
            title: t("genre.columns.slug"),
            dataIndex: "slug",
            key: "slug",
            sorter: true,
            showSorterTooltip: false,
        },
        {
            title: t("genre.columns.description"),
            dataIndex: "description",
            key: "description",
            sorter: true,
            width: 400,
            showSorterTooltip: false,
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
            title: t("table.actions"),
            key: "action",
            fixed: "right",
            render: (_, record) => (
                <Space size="middle">
                    {trash ? (
                        <>
                            <DeleteRestoreActions
                                id={record._id as string}
                                t={t} name={record?.name}
                                title={t("genre.restore.title")}
                                desc={t("genre.restore.desc")}
                                messageSuccess={t("genre.delete.deleted_success")}
                                api={GenreService.restore}
                                queryKey={["getListTrashGenre"]}
                                action='restore'
                            />
                            <DeleteRestoreActions
                                id={record._id as string}
                                t={t} name={record?.name}
                                title={t("genre.delete.title")}
                                desc={t("genre.delete.hard_desc")}
                                messageSuccess={t("genre.delete.deleted_success")}
                                api={GenreService.hardRemove}
                                queryKey={["getListTrashGenre"]}
                            />
                        </>
                    ) : (
                        <>
                            <UpdateGenre id={record?._id as string} t={t}/>
                            <DeleteRestoreActions
                                id={record._id as string} t={t}
                                name={record?.name}
                                api={GenreService.remove}
                                title={t("genre.delete.title")}
                                desc={t("genre.delete.desc")}
                                messageSuccess={t("genre.delete.deleted_success")}
                                queryKey={["getListGenre"]}
                            />
                        </>
                    )}
                </Space>
            ),
        });
    }

    return columns;
}


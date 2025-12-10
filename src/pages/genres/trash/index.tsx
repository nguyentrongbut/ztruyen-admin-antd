// ** React
import {useEffect, useState} from "react";

// React query
import {keepPreviousData, useQuery} from "@tanstack/react-query";

// ** Services
import {GenreService} from "@/services/genre";

// ** i18n
import {useTranslation} from "react-i18next";

// ** antd
import {App, Breadcrumb, Button, Col, Collapse, Row, Space, Table, theme, Typography} from "antd";

// ** Style
import styles from "@/pages/users/list/list.user.module.scss"

// ** columns
import {listGenreColumns} from "@/pages/genres/components/columns";

// ** Types
import type {IGenre} from "@/types/backend";
import type {IGenreQueryParams} from "@/pages/genres/list";

// ** Query string
import qs from "query-string";

// ** Hooks
import {useTableQueryParams} from "@/hooks/useTableQueryParams.ts";
import {useTableSelection} from "@/hooks/useTableSelection.ts";

// ** clsx
import clsx from "clsx";

// ** Icon
import {ReloadOutlined} from "@ant-design/icons";

// ** Page Components
import {searchGroup} from "@/pages/genres/components/search-group";
import {filterGroup} from "@/pages/genres/components/filter-group";

// ** Components
import DeleteRestoreMultiActions from "@/components/common/delete-restore-multi-actions";

const {Title} = Typography;

const TrashGenreList = () => {
    const {t} = useTranslation();

    const {notification} = App.useApp()
    const {
        token: {colorPrimary},
    } = theme.useToken();

    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [resetSignal, setResetSignal] = useState(Date.now());

    const {queryParams, handleTableChange, setQueryParams} = useTableQueryParams<IGenre, IGenreQueryParams>({
        page: 1,
        limit: 10,
        sort: "-createdAt",
        name: "",
        description: "",
        createdAt: "",
        updatedAt: ""
    });

    const query = qs.stringify(queryParams, {skipNull: true, skipEmptyString: true});

    //  call api
    const {data} = useQuery({
        queryKey: ["getListTrashGenre", queryParams],
        queryFn: () =>
            GenreService.listTrash(query),
        placeholderData: keepPreviousData,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const listGenre = data?.data?.result

    const {rowSelection, selectedRowKeys, setSelectedRowKeys} = useTableSelection<IGenre>(listGenre);

    const meta = data?.data?.meta ?? {page: 1, limit: 10, totalItems: 0};

    const pagination = {
        current: meta.page,
        pageSize: meta.limit,
        total: meta.totalItems,
        showSizeChanger: true,
    };

    // notification when fetch error
    useEffect(() => {
        if (data && !data.data) {
            notification.error({
                message: t("error_general"),
                description: Array.isArray(data.message)
                    ? data.message[0]
                    : data.message || t("error_general"),
                duration: 5,
            });
        }
    }, [data, notification, t]);

    const handleFullReset = () => {
        setQueryParams({
            page: 1,
            limit: 10,
            sort: "-createdAt",
            name: "",
            description: "",
            createdAt: "",
            updatedAt: "",
        });

        setResetSignal(Date.now());
    };

    return (
        <Space direction='vertical' size={24} className='w-full'>
            {/* Header */}
            <Breadcrumb
                items={[{title: t('menu.genres.title')}, {title: t('menu.genres.list_trash')}]}
            />
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                {/* Title */}
                <Col>
                    <Title className={clsx(styles.title, styles.wrapper)} style={{margin: 0}}>
                        {t('menu.genres.list_trash')}
                    </Title>
                </Col>

                {/* Button group */}
                <Col>
                    <Row gutter={[8, 8]} align="middle" wrap>
                        <Col>
                            <Button icon={<ReloadOutlined/>} onClick={handleFullReset}>
                                {t("table.refresh")}
                            </Button>
                        </Col>

                        <Col>
                            <DeleteRestoreMultiActions
                                t={t}
                                ids={selectedRowKeys as string[]}
                                onClearSelection={() => setSelectedRowKeys([])}
                                api={GenreService.restoreMulti}
                                queryKey={['getListTrashGenre']}
                                title={t("genre.restore_multi.title")}
                                desc={t("genre.restore_multi.desc")}
                                messageSuccess={t("genre.restore_multi.restored_success")}
                                action='restore'
                            />
                        </Col>

                        <Col>
                            <DeleteRestoreMultiActions
                                t={t}
                                ids={selectedRowKeys as string[]}
                                onClearSelection={() => setSelectedRowKeys([])}
                                api={GenreService.hardRemoveMulti}
                                queryKey={['getListTrashGenre']}
                                title={t("genre.delete_multi.title")}
                                desc={t("genre.delete_multi.hard_desc")}
                                messageSuccess={t("genre.delete_multi.deleted_success")}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Collapse Search */}
            <Collapse
                items={searchGroup(t, queryParams, setQueryParams, colorPrimary)}
                activeKey={isSearchOpen ? ['search'] : []}
                onChange={() => setIsSearchOpen(prev => !prev)}
            />

            {/* Collapse Filter */}
            <Collapse
                items={filterGroup(t, queryParams, setQueryParams, resetSignal, setResetSignal, colorPrimary)}
                activeKey={isFilterOpen ? ['filter'] : []}
                onChange={() => setIsFilterOpen(prev => !prev)}
            />


            {/* Table */}

            <Table<IGenre>
                rowKey='_id'
                rowSelection={rowSelection}
                columns={listGenreColumns(t, true, true)}
                dataSource={listGenre}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showTotal: (total, range) =>
                        `${range[0]} - ${range[1]} ${t('table.of')} ${total} ${t('menu.genres.title').toLowerCase()}`,
                    showSizeChanger: true,
                }}
                onChange={handleTableChange}
                sticky
                scroll={{
                    x: "max-content",
                }}
            />

        </Space>
    )
}

export default TrashGenreList
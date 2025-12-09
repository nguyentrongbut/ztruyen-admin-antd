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

// ** Query string
import qs from "query-string";

// ** Hooks
import {useTableQueryParams} from "@/hooks/useTableQueryParams.ts";
import {useTableSelection} from "@/hooks/useTableSelection.ts";

// ** clsx
import clsx from "clsx";

// ** Icon
import {ExportOutlined, ReloadOutlined} from "@ant-design/icons";

// ** Page Components
import {searchGroup} from "@/pages/genres/components/search-group";
import {filterGroup} from "@/pages/genres/components/filter-group";
import CreateGenre from "@/pages/genres/create";

// ** Components
import DeleteRestoreMultiActions from "@/components/common/delete-restore-multi-actions";
import ImportData from "@/components/common/import-data";

// ** utils
import {userFieldMappings} from "@/utils/excelMapping.ts";


const {Title} = Typography;

export interface IGenreQueryParams {
    page: number;
    limit: number;
    name: string;
    description: string;
    sort: string;
    createdAt: string;
    updatedAt: string;

    // filter range
    "createdAt>"?: string;
    "updatedAt>"?: string;
}

const GenresList = () => {

    const {t} = useTranslation();

    const {notification} = App.useApp()
    const {
        token: {colorPrimary},
    } = theme.useToken();

    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [resetSignal, setResetSignal] = useState(Date.now());
    const [loadingExport, setLoadingExport] = useState(false);

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
        queryKey: ["getListGenre", queryParams],
        queryFn: () =>
            GenreService.list(query),
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

    const handleExport = async () => {
        setLoadingExport(true);
        try {
            await GenreService.export(query);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingExport(false);
        }
    };

    return (
        <Space direction='vertical' size={24} className='w-full'>
            {/* Header */}
            <Breadcrumb
                items={[{title: t('menu.genres.title')}, {title: t('menu.genres.list')}]}
            />
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                {/* Title */}
                <Col>
                    <Title className={clsx(styles.title, styles.wrapper)} style={{margin: 0}}>
                        {t('menu.genres.list')}
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
                            <Button
                                icon={<ExportOutlined/>}
                                onClick={handleExport}
                                loading={loadingExport}
                                disabled={loadingExport}
                            >
                                {t("table.export")}
                            </Button>
                        </Col>

                        <Col>
                            <ImportData
                                t={t}
                                queryKey={['getListGenre']}
                                fieldMappings={userFieldMappings}
                                apiImport={GenreService.import}
                                apiExportTemplate={GenreService.exportTemplate}
                                columnsTable={listGenreColumns(t, false)}
                                messageSuccess={t("user.create.created_success")}
                            />
                        </Col>

                        <Col>
                            <DeleteRestoreMultiActions
                                t={t}
                                ids={selectedRowKeys as string[]}
                                onClearSelection={() => setSelectedRowKeys([])}
                                api={GenreService.removeMulti}
                                queryKey={['getListGenre']}
                                title={t("genre.delete_multi.title")}
                                desc={t("genre.delete_multi.desc")}
                                messageSuccess={t("genre.delete_multi.deleted_success")}
                            />
                        </Col>
                        <Col>
                            <CreateGenre t={t}/>
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
                columns={listGenreColumns(t)}
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

export default GenresList
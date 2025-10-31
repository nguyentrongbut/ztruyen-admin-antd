// ** React
import {useEffect, useState} from "react";

// React query
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {UserService} from "@/services/user";

// ** i18n
import {useTranslation} from "react-i18next";

// ** antd
import {App, Breadcrumb, Button, Col, Collapse, Row, Space, Table, theme, Typography} from "antd";

// ** Style
import styles from "@/pages/users/list/list.user.module.scss"

// ** columns
import {listUserColumns} from "@/pages/users/components/columns";

// ** Types
import type {IUser} from "@/types/backend";

// ** Query string
import qs from "query-string";

// ** Hooks
import {useTableQueryParams} from "@/hooks/useTableQueryParams.ts";
import {useTableSelection} from "@/hooks/useTableSelection.ts";

import clsx from "clsx";
// ** Icon
import {ExportOutlined, ImportOutlined, PlusOutlined, ReloadOutlined} from "@ant-design/icons";

// ** Page Components
import {filterGroup} from "@/pages/users/components/filter-group";
import {searchGroup} from "@/pages/users/components/search-group";
import DeleteMultiUser from "@/pages/users/delete-multi";

const {Title} = Typography;

export interface IUserQueryParams {
    page: number;
    limit: number;
    name: string;
    email: string;
    sort: string;
    role: string;
    gender: string;
    provider: string;
    age: string;
    createdAt: string;
    updatedAt: string;

    // filter range
    "createdAt>"?: string;
    "updatedAt>"?: string;
    "age>"?: string;
}

const UserList = () => {

    const {t} = useTranslation();

    const {notification} = App.useApp()
    const {
        token: {colorPrimary},
    } = theme.useToken();

    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [resetSignal, setResetSignal] = useState(Date.now());

    const {queryParams, handleTableChange, setQueryParams} = useTableQueryParams<IUser, IUserQueryParams>({
        page: 1,
        limit: 10,
        sort: "-createdAt",
        name: "",
        email: "",
        role: "",
        gender: "",
        provider: "",
        age: "",
        createdAt: "",
        updatedAt: ""
    });

    const query = qs.stringify(queryParams, {skipNull: true, skipEmptyString: true});

    //  call api
    const {data} = useQuery({
        queryKey: ["getListUser", queryParams],
        queryFn: () =>
            UserService.getListUser(query),
        placeholderData: keepPreviousData,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const listUser = data?.data?.result

    const {rowSelection, selectedRowKeys, setSelectedRowKeys} = useTableSelection<IUser>(listUser);

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
            email: "",
            role: "",
            gender: "",
            provider: "",
            age: "",
            createdAt: "",
            updatedAt: "",
        });

        setResetSignal(Date.now());
    };

    return (
        <Space direction='vertical' size={24} style={{width: "100%"}}>
            {/* Header */}
            <Breadcrumb
                items={[{title: t('menu.users.title')}, {title: t('menu.users.list')}]}
            />
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                {/* Title */}
                <Col>
                    <Title className={clsx(styles.title, styles.wrapper)} style={{margin: 0}}>
                        {t('menu.users.list')}
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
                            <Button icon={<ExportOutlined/>}>
                                {t("table.export")}
                            </Button>
                        </Col>

                        <Col>
                            <Button icon={<ImportOutlined/>}>
                                {t("table.import")}
                            </Button>
                        </Col>

                        <Col>
                            <DeleteMultiUser
                                t={t}
                                ids={selectedRowKeys as string[]}
                                onClearSelection={() => setSelectedRowKeys([])}
                            />
                        </Col>
                        <Col>
                            <Button icon={<PlusOutlined/>} type="primary">
                                {t("user.create")}
                            </Button>
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

            <Table<IUser>
                rowKey='_id'
                rowSelection={rowSelection}
                columns={listUserColumns(t)}
                dataSource={listUser}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showTotal: (total, range) =>
                        `${range[0]} - ${range[1]} ${t('table.of')} ${total} ${t('menu.users.title').toLowerCase()}`,
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

export default UserList
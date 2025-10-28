// ** antd
import { Button, Col, Row, Space, Typography, Flex, Badge, Divider } from "antd";

// ** Icon
import {ReloadOutlined, SearchOutlined} from "@ant-design/icons";

// ** i18n
import type { TFunction } from "i18next";

// ** interface
import type { IUserQueryParams } from "@/pages/users/list";

// ** Components
import Search from "@/components/common/search";

export const searchGroup = (
    t: TFunction,
    queryParams: IUserQueryParams,
    setQueryParams: (updater: (prev: IUserQueryParams) => IUserQueryParams) => void,
    colorPrimary: string,
) => {
    const { Text, Title } = Typography;

    const activeFiltersCount = [
        queryParams.name,
        queryParams.email
    ].filter(Boolean).length;

    const handleResetAllFilters = () => {
        setQueryParams((prev) => ({
            ...prev,
            name: "",
            email: ""
        }));
    };

    return [
        {
            key: "search",
            label: (
                <Space size={8}>
                    <SearchOutlined />
                    <span style={{ fontWeight: 500 }}>{t("table.search")}</span>
                    {activeFiltersCount > 0 && (
                        <Badge
                            count={activeFiltersCount}
                            style={{ backgroundColor: colorPrimary }}
                        />
                    )}
                </Space>
            ),

            children: (
                <Space direction="vertical" size={20} className='w-full'>
                    {/* Header with Reset Button */}
                    <Flex justify="space-between" align="center">
                        <div>
                            <Title level={5} style={{ margin: 0, fontSize: 14 }}>
                                {t("table.search")}
                            </Title>
                            {activeFiltersCount > 0 && (
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {activeFiltersCount} {t("table.active_filters")}
                                </Text>
                            )}
                        </div>
                        <Button
                            icon={<ReloadOutlined />}
                            type="text"
                            size="small"
                            onClick={handleResetAllFilters}
                            disabled={activeFiltersCount === 0}
                            danger={activeFiltersCount > 0}
                        >
                            {t("table.reset_all_search")}
                        </Button>
                    </Flex>

                    <Divider style={{ margin: 0 }} />

                    {/* Search Fields */}
                    <Row gutter={[16, 20]}>
                        <Col sm={24} lg={12}>
                            <Space direction="vertical" size={8} className='w-full'>
                                <Text strong type='secondary' className='fz-13'>
                                    {t("user.search.name")}
                                </Text>
                                <Search
                                    queryParams={queryParams}
                                    setQueryParams={setQueryParams}
                                    field="name"
                                    t={t}
                                    placeholder={t('user.search.choose.name')}
                                />
                            </Space>
                        </Col>
                        <Col sm={24} lg={12}>
                            <Space direction="vertical" size={8} className='w-full'>
                                <Text strong type='secondary' className='fz-13'>
                                    {t("user.search.email")}
                                </Text>
                                <Search
                                    queryParams={queryParams}
                                    setQueryParams={setQueryParams}
                                    field="email"
                                    t={t}
                                    placeholder={t('user.search.choose.email')}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Space>
            ),
        },
    ];
};
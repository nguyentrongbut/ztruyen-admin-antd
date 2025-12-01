// ** React
import type {Dispatch, SetStateAction} from "react";

// ** antd
import {Button, Col, Divider, Row, Space, Typography, Flex, Badge} from "antd";

// ** Icon
import {FilterOutlined, ReloadOutlined} from "@ant-design/icons";

// ** Components
import FilterSelect from "@/components/common/filter-select";
import {RangeFilter} from "@/components/common/range-filter";

// ** i18n
import type {TFunction} from "i18next";

// ** interface
import type {IUserQueryParams} from "@/pages/users/list";

// ** utils
import {withPlaceholderLabel} from "@/utils/withPlaceholderLabel.ts";

export const filterGroup = (
    t: TFunction,
    queryParams: IUserQueryParams,
    setQueryParams: (updater: (prev: IUserQueryParams) => IUserQueryParams) => void,
    resetSignal: number,
    setResetSignal: Dispatch<SetStateAction<number>>,
    colorPrimary: string,
    isDeletedAt?: boolean,
) => {
    const {Text, Title} = Typography;

    const advancedFilters = [
        queryParams["createdAt>"],
        queryParams["updatedAt>"],
        queryParams["age>"],
    ];

    const basicFilters = [
        queryParams.gender,
        queryParams.role,
        queryParams.provider,
    ];

    const activeFiltersCount = [...basicFilters, ...advancedFilters].filter(Boolean).length;

    const handleResetAllFilters = () => {
        setQueryParams((prev) => ({
            ...prev,
            gender: "",
            role: "",
            provider: "",
            "createdAt>": "",
            "createdAt<": "",
            "updatedAt>": "",
            "updatedAt<": "",
            "age>": "",
            "age<": "",
    }));
        setResetSignal(Date.now());
    };

    return [
        {
            key: 'filter',
            label: (
                <Space size={8}>
                    <FilterOutlined style={{ fontSize: 16 }} />
                    <span style={{ fontWeight: 500 }}>{t('table.filter')}</span>
                    {activeFiltersCount > 0 && (
                        <Badge
                            count={activeFiltersCount}
                            style={{ backgroundColor: colorPrimary }}
                        />
                    )}
                </Space>
            ),
            children: (
                <Space direction="vertical" size={20} style={{width: '100%'}}>
                    {/* Header with Reset Button */}
                    <Flex justify="space-between" align="center">
                        <div>
                            <Title level={5} style={{ margin: 0, fontSize: 14 }}>
                                {t("table.filter_options")}
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
                            {t('table.reset_all_filter')}
                        </Button>
                    </Flex>

                    <Divider style={{margin: 0}}/>

                    {/* Basic Filters */}
                    <div>
                        <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
                            {t('table.basic_filters')}
                        </Text>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8}>
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Text strong type="secondary" className='fz-13'>
                                        {t('user.filter.gender')}
                                    </Text>
                                    <FilterSelect<typeof queryParams>
                                        options={[
                                            {value: 'male', label: withPlaceholderLabel(t('user.genders.male'))},
                                            {value: 'female', label: withPlaceholderLabel(t('user.genders.female'))},
                                        ]}
                                        value={queryParams?.gender}
                                        placeholder={t('user.filter.choose.gender')}
                                        setQueryParams={setQueryParams}
                                        field="gender"
                                    />
                                </Space>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Text strong type="secondary" className='fz-13'>
                                        {t('user.filter.role')}
                                    </Text>
                                    <FilterSelect<typeof queryParams>
                                        options={[
                                            {value: 'user', label: withPlaceholderLabel(t('user.roles.user'))},
                                            {value: 'author', label: withPlaceholderLabel(t('user.roles.author'))},
                                        ]}
                                        value={queryParams?.role}
                                        placeholder={t('user.filter.choose.role')}
                                        setQueryParams={setQueryParams}
                                        field="role"
                                    />
                                </Space>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Text strong type="secondary" className='fz-13'>
                                        {t('user.filter.provider')}
                                    </Text>
                                    <FilterSelect<typeof queryParams>
                                        options={[
                                            {value: 'local', label: withPlaceholderLabel(t('user.providers.local'))},
                                            {value: 'facebook', label: withPlaceholderLabel(t('user.providers.facebook'))},
                                            {value: 'google', label: withPlaceholderLabel(t('user.providers.google'))},
                                        ]}
                                        value={queryParams?.provider}
                                        placeholder={t('user.filter.choose.provider')}
                                        setQueryParams={setQueryParams}
                                        field="provider"
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </div>

                    <Divider style={{margin: 0}}/>

                    {/* Advanced Filters */}
                    <div>
                        <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
                            {t('table.advanced_filters')}
                        </Text>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} lg={12}>
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Text strong type="secondary" className='fz-13'>
                                        {t('user.filter.createdAt')}
                                    </Text>
                                    <RangeFilter<typeof queryParams>
                                        field="createdAt"
                                        type="date"
                                        setQueryParams={setQueryParams}
                                        t={t}
                                        resetSignal={resetSignal}
                                    />
                                </Space>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Text strong type="secondary" className='fz-13'>
                                        {isDeletedAt ? t('user.filter.deletedAt') : t('user.filter.updatedAt')}
                                    </Text>
                                    <RangeFilter<typeof queryParams>
                                        field="updatedAt"
                                        type="date"
                                        setQueryParams={setQueryParams}
                                        t={t}
                                        resetSignal={resetSignal}
                                    />
                                </Space>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Text strong type="secondary" className='fz-13'>
                                        {t('user.filter.age')}
                                    </Text>
                                    <RangeFilter<typeof queryParams>
                                        field="age"
                                        type="number"
                                        setQueryParams={setQueryParams}
                                        width="100%"
                                        t={t}
                                        resetSignal={resetSignal}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </div>
                </Space>
            )
        }
    ];
}
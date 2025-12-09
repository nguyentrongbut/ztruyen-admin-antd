// ** React
import type {Dispatch, SetStateAction} from "react";

// ** antd
import {Button, Col, Divider, Row, Space, Typography, Flex, Badge} from "antd";

// ** Icon
import {FilterOutlined, ReloadOutlined} from "@ant-design/icons";

// ** Components
import {RangeFilter} from "@/components/common/range-filter";

// ** i18n
import type {TFunction} from "i18next";

// ** interface
import type {IGenreQueryParams} from "@/pages/genres/list";


export const filterGroup = (
    t: TFunction,
    queryParams: IGenreQueryParams,
    setQueryParams: (updater: (prev: IGenreQueryParams) => IGenreQueryParams) => void,
    resetSignal: number,
    setResetSignal: Dispatch<SetStateAction<number>>,
    colorPrimary: string,
    isDeletedAt?: boolean,
) => {
    const {Text, Title} = Typography;

    const advancedFilters = [
        queryParams["createdAt>"],
        queryParams["updatedAt>"],
    ];

    const activeFiltersCount = [...advancedFilters].filter(Boolean).length;

    const handleResetAllFilters = () => {
        setQueryParams((prev) => ({
            ...prev,
            "createdAt>": "",
            "createdAt<": "",
            "updatedAt>": "",
            "updatedAt<": "",
        }));
        setResetSignal(Date.now());
    };

    return [
        {
            key: 'filter',
            label: (
                <Space size={8}>
                    <FilterOutlined style={{fontSize: 16}}/>
                    <span style={{fontWeight: 500}}>{t('table.filter')}</span>
                    {activeFiltersCount > 0 && (
                        <Badge
                            count={activeFiltersCount}
                            style={{backgroundColor: colorPrimary}}
                        />
                    )}
                </Space>
            ),
            children: (
                <Space direction="vertical" size={20} style={{width: '100%'}}>
                    {/* Header with Reset Button */}
                    <Flex justify="space-between" align="center">
                        <div>
                            <Title level={5} style={{margin: 0, fontSize: 14}}>
                                {t("table.filter")}
                            </Title>
                            {activeFiltersCount > 0 && (
                                <Text type="secondary" style={{fontSize: 12}}>
                                    {activeFiltersCount} {t("table.active_filters")}
                                </Text>
                            )}
                        </div>
                        <Button
                            icon={<ReloadOutlined/>}
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

                    {/* Advanced Filters */}
                    <div>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} lg={12}>
                                <Space direction="vertical" size={8} style={{width: "100%"}}>
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
                                <Space direction="vertical" size={8} style={{width: "100%"}}>
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
                        </Row>
                    </div>
                </Space>
            )
        }
    ];
}
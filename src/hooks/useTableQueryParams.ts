import { useState } from "react";
import type { TableProps } from "antd";

interface QueryParamsBase {
    page: number;
    limit: number;
    sort?: string;
    [key: string]: any;
}

export const useTableQueryParams = <T extends object, QP extends QueryParamsBase>(initialParams: QP) => {
    const [queryParams, setQueryParams] = useState<QP>(initialParams);

    const handleTableChange: TableProps<T>["onChange"] = (pagination, filters, sorter) => {
        let sortValue = initialParams.sort ?? "-createdAt";

        if (!Array.isArray(sorter) && sorter.field) {
            const { field, order } = sorter;
            if (order === "ascend") sortValue = field as string;
            else if (order === "descend") sortValue = `-${field}`;
        }

        const dynamicFilters = Object.fromEntries(
            Object.entries(filters).map(([key, value]) => [
                key,
                Array.isArray(value) ? value : [],
            ])
        );

        setQueryParams((prev) => ({
            ...prev,
            page: pagination.current || 1,
            limit: pagination.pageSize || 10,
            sort: sortValue,
            ...dynamicFilters,
        }));
    };

    return { queryParams, setQueryParams, handleTableChange };
};

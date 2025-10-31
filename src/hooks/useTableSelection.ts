// ** React
import {type Key, useState} from "react";

// ** antd
import type { TableProps } from "antd";

// ** i18n
import {useTranslation} from "react-i18next";

export const useTableSelection = <T extends { _id?: string }>(listData?: T[]) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const { t } = useTranslation();

    const rowSelection: TableProps<T>["rowSelection"] = {
        selectedRowKeys,
        onChange: (newKeys) => setSelectedRowKeys(newKeys),
        selections: [
            {
                key: "all",
                text: t("table.select_all"),
                onSelect: () => {
                    if (!listData) return;
                    const allKeys = listData
                        .map((row) => row._id)
                        .filter((id): id is string => !!id);
                    setSelectedRowKeys(allKeys);
                },
            },
            {
                key: "invert",
                text: t("table.select_invert"),
                onSelect: () => {
                    if (!listData) return;
                    const newKeys = listData
                        .map((row) => row._id)
                        .filter((id): id is string => !!id)
                        .filter((id) => !selectedRowKeys.includes(id));
                    setSelectedRowKeys(newKeys);
                },
            },
            {
                key: "none",
                text: t("table.select_none"),
                onSelect: () => {
                    setSelectedRowKeys([]);
                },
            },
            {
                key: "odd",
                text: t("table.select_odd_rows"),
                onSelect: () => {
                    if (!listData) return;
                    const newKeys = listData
                        .filter((_, index) => index % 2 === 0)
                        .map((row) => row._id)
                        .filter((id): id is string => !!id);
                    setSelectedRowKeys(newKeys);
                },
            },
            {
                key: "even",
                text: t("table.select_even_rows"),
                onSelect: () => {
                    if (!listData) return;
                    const newKeys = listData
                        .filter((_, index) => index % 2 !== 0)
                        .map((row) => row._id)
                        .filter((id): id is string => !!id);
                    setSelectedRowKeys(newKeys);
                },
            },
        ],
    };

    return { rowSelection, selectedRowKeys, setSelectedRowKeys };
};

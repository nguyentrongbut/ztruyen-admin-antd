// ** React
import {type Key, useState} from "react";

// ** antd
import { Table } from "antd";
import type { TableProps } from "antd";

export const useTableSelection = <T extends { _id?: string }>(listData?: T[]) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const rowSelection: TableProps<T>["rowSelection"] = {
        selectedRowKeys,
        onChange: (newKeys) => setSelectedRowKeys(newKeys),
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
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
                key: 'even',
                text: 'Select Even Row',
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

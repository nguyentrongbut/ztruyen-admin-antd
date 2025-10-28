// ** React
import {useState, useEffect} from "react";

// ** antd
import {Button, Input, Space} from "antd";

// ** Icon
import {SearchOutlined} from "@ant-design/icons";

// ** i18n
import type {TFunction} from "i18next";

interface ISearch<T> {
    field: keyof T;
    queryParams: T;
    setQueryParams: (updater: (prev: T) => T) => void;
    t: TFunction,
    placeholder?: string;
}

const Search = <T extends object>({
                                      field,
                                      queryParams,
                                      setQueryParams,
                                      t,
                                      placeholder
                                  }: ISearch<T>) => {
    const [value, setValue] = useState<string>("");

    const fieldValue = queryParams[field] as string;

    useEffect(() => {
        setValue(fieldValue?.replace(/^\/|\/i$/g, "") || "");
    }, [fieldValue]);

    const handleSearch = () => {
        setQueryParams(prev => ({
            ...prev,
            [field]: value ? `/${value}/i` : ""
        }));
    };

    const handleReset = () => {
        setQueryParams(prev => ({
            ...prev,
            [field]: ""
        }));
        setValue("")
    };

    return (
        <Space className='w-full space-input'>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder || "Nhập từ khóa..."}
                onPressEnter={handleSearch}
            />
            <Button onClick={handleReset} type="text" disabled={value === ""}>
                {t("table.reset")}
            </Button>
            <Button
                icon={<SearchOutlined/>}
                type="primary"
                onClick={handleSearch}
            >
                {t("table.search_btn")}
            </Button>
        </Space>
    );
};

export default Search;

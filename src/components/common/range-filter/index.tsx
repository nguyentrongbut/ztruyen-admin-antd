// ** React
import {useEffect, useState} from "react";

// ** i18n
import type {TFunction} from "i18next";

// ** antd
import {DatePicker, InputNumber, Space, Button, Flex} from "antd";

// ** Dayjs
import {Dayjs} from "dayjs";

// ** i18n
import i18n from "@/i18n";

// ** antd locales
import viVN from "antd/es/date-picker/locale/vi_VN";
import enUS from "antd/es/date-picker/locale/en_US";

const {RangePicker} = DatePicker;

interface IRangeFilter<T> {
    field: keyof T;
    setQueryParams: (updater: (prev: T) => T) => void;
    type?: "number" | "date";
    width?: number | string;
    t: TFunction;
    resetSignal?: number;
}

export const RangeFilter = <T extends object>({
                                                  field,
                                                  setQueryParams,
                                                  type = "date",
                                                  width = "100%",
                                                  t,
                                                  resetSignal
                                              }: IRangeFilter<T>) => {
    type ValueType = [number | null, number | null] | [Dayjs | null, Dayjs | null];
    const [value, setValue] = useState<ValueType>([null, null]);

    useEffect(() => {
        setValue([null, null]);
    }, [resetSignal]);

    const applyFilter = () => {
        if (!Array.isArray(value)) return;

        if (type === "number") {
            const [start, end] = value as [number | null, number | null];
            setQueryParams((prev) => ({
                ...prev,
                [`${String(field)}>`]: start ?? "",
                [`${String(field)}<`]: end ?? "",
            }));
        } else {
            const [start, end] = value as [Dayjs | null, Dayjs | null];
            setQueryParams((prev) => ({
                ...prev,
                [`${String(field)}>`]: start ? start.format("YYYY-MM-DD HH:mm:ss") : "",
                [`${String(field)}<`]: end ? end.format("YYYY-MM-DD HH:mm:ss") : "",
            }));
        }
    };

    const clearFilter = () => {
        setValue([null, null]);
        setQueryParams((prev) => ({
            ...prev,
            [`${String(field)}>`]: "",
            [`${String(field)}<`]: "",
        }));
    };

    const isResetDisabled = !value[0] && !value[1];

    if (type === "number") {
        const [start, end] = value as [number | null, number | null];
        return (
            <Space className='w-full space-input'>
                <Flex gap='small'>
                    <InputNumber
                        placeholder={t("table.from")}
                        value={start ?? undefined}
                        onChange={(val) => setValue([val ?? null, end])}
                        style={{width}}
                    />
                    <InputNumber
                        placeholder={t("table.to")}
                        value={end ?? undefined}
                        onChange={(val) => setValue([start, val ?? null])}
                        style={{width}}
                    />
                </Flex>
                <Button
                    disabled={isResetDisabled}
                    type="text"
                    onClick={clearFilter}>
                    {t("table.reset")}
                </Button>
                <Button type="primary" onClick={applyFilter}>
                    {t("table.filter_btn")}
                </Button>
            </Space>
        );
    }

    const [start, end] = Array.isArray(value)
        ? (value as [Dayjs | null, Dayjs | null])
        : [null, null];

    return (
        <Space className='w-full space-input'>
            <RangePicker
                placeholder={[t("table.from_date"), t("table.to_date")]}
                value={(start || end) ? [start, end] : null}
                onChange={(dates) => {
                    if (dates) {
                        setValue([dates[0], dates[1]]);
                    } else {
                        setValue([null, null]);
                    }
                }}
                locale={i18n.language === "vi" ? viVN : enUS}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                allowClear
                className='w-full'
            />
            <Button
                disabled={isResetDisabled}
                type="text"
                onClick={clearFilter}>
                {t("table.reset")}
            </Button>
            <Button type="primary" onClick={applyFilter}>
                {t("table.filter_btn")}
            </Button>
        </Space>
    );
};
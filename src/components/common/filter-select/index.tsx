// ** React
import {useState} from "react";

// ** antd
import {Select, type SelectProps} from "antd";

// ** Utils
import {withPlaceholderLabel} from "@/utils/withPlaceholderLabel.ts";

type OptionType = NonNullable<SelectProps['options']>[number];

interface IFilterSelect<T> {
    options: OptionType[];
    placeholder?: string;
    width?: number | string;
    field: keyof T;
    value?: string;
    setQueryParams: (updater: (prev: T) => T) => void;
    includeAllOption?: boolean;
}

const FilterSelect = <T extends object>({
                                            options,
                                            placeholder,
                                            width = "100%",
                                            field,
                                            setQueryParams,
                                            includeAllOption = true,
                                            value = ""
                                        }: IFilterSelect<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (value: string) => {
        setIsLoading(true);

        setQueryParams(prev => ({
            ...prev,
            [field]: value === "" ? "" : value,
        }));

        setIsLoading(false);
    };

    const finalOptions = includeAllOption
        ? [...options, {value: "", label: withPlaceholderLabel('Tất cả')}]
        : options;

    return (
        <Select
            placeholder={placeholder}
            style={{width}}
            loading={isLoading}
            value={value || undefined}
            onChange={handleChange}
            options={finalOptions}
        />
    );
};

export default FilterSelect;

export interface FieldMapping {
    excelKey: string;
    backendKey: string;
    transform?: (value: any) => any;
}

export const userFieldMappings: FieldMapping[] = [
    { excelKey: 'Name', backendKey: 'name' },
    { excelKey: 'Email', backendKey: 'email'},
    { excelKey: 'Age', backendKey: 'age'},
    { excelKey: 'Gender', backendKey: 'gender' },
    { excelKey: 'Role', backendKey: 'role'},
    { excelKey: 'Provider', backendKey: 'provider'},
];

export const mapExcelToBackend = <T = any>(
    excelRow: any,
    mappings: FieldMapping[]
): T => {
    const result: any = {};

    mappings.forEach(({ excelKey, backendKey, transform }) => {
        const value = excelRow[excelKey];

        if (value !== undefined && value !== null && value !== '') {
            result[backendKey] = transform ? transform(value) : value;
        }
    });

    return result as T;
};
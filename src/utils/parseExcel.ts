import * as XLSX from "xlsx";

export const parseExcelToJson = async <T = any>(
    file: File,
    filterMetadata: boolean = true
): Promise<T[]> => {
    if (!file) {
        throw new Error("No file provided");
    }

    try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        let json = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        // Loại bỏ metadata nếu cần
        if (filterMetadata) {
            const metadataKeywords = ['page', 'total'];

            json = json.filter((row: any) => {
                const rowValues = Object.values(row).join(' ').toLowerCase();
                return !metadataKeywords.some(keyword => rowValues.includes(keyword));
            });
        }

        // Trim tất cả string values
        json = json.map((row: any) => {
            const cleanedRow: any = {};
            Object.keys(row).forEach(key => {
                const value = row[key];
                cleanedRow[key] = typeof value === 'string' ? value.trim() : value;
            });
            return cleanedRow;
        });

        return json as T[];
    } catch (error) {
        console.error("Error parsing Excel file:", error);
        throw new Error("Failed to parse Excel file");
    }
};
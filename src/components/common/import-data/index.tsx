// ** React
import {useState} from "react"

// ** React query
import {useMutation, useQueryClient} from "@tanstack/react-query";

// ** Antd
import {App, Button, Form, Space, Table, type TableProps, Upload} from "antd";

// ** Icons
import {ImportOutlined, InboxOutlined} from "@ant-design/icons";

// ** i18n
import type {TFunction} from "i18next";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** utils
import {parseExcelToJson} from "@/utils/parseExcel.ts";
import {type FieldMapping, mapExcelToBackend} from "@/utils/excelMapping.ts";
import {handleResponse} from "@/utils/handleResponse.ts";

interface TImportData {
    t: TFunction
    apiExportTemplate: () => Promise<void>
    apiImport: (file: File) => Promise<any>
    queryKey: string[]
    fieldMappings: FieldMapping[]
    columnsTable: TableProps<any>["columns"]
    messageSuccess: string
}

const {Item} = Form;
const {Dragger} = Upload;

const ImportData = ({t, apiExportTemplate, apiImport, queryKey, fieldMappings, columnsTable, messageSuccess}: TImportData) => {
    const [file, setFile] = useState<File | null>(null);
    const [jsonData, setJsonData] = useState<any[]>([]);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingExport, setLoadingExport] = useState(false);

    const {notification, message} = App.useApp()

    const queryClient = useQueryClient();

    const handleExportTemplate = async () => {
        setLoadingExport(true);
        try {
            await apiExportTemplate();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingExport(false);
        }
    }

    const importMutation = useMutation({
        mutationFn: async (fileImport: File) => {
            const res = await apiImport(fileImport);
            return handleResponse(res)
        },
        onSuccess: async (res) => {
            if (res.data) {
                message.success(messageSuccess);
                await queryClient.invalidateQueries({queryKey});
                setOpen(false);
                setFile(null);
                setJsonData([]);
            }
        },
        onError: (err) => {
            notification.error({
                message: t("error_general"),
                description: Array.isArray(err.message)
                    ? err.message[0]
                    : err.message || t("error_general"),
                duration: 5,
            });
        },
    });

    const handleResetFile = () => {
        setFile(null);
        setJsonData([]);
    }

    const handleFileChange = async (info: any) => {
        if (info.fileList.length === 0) {
            handleResetFile()
            return;
        }

        const selectedFile = info.file;

        if (!selectedFile) return;

        setFile(selectedFile);

        try {
            const excelData = await parseExcelToJson(selectedFile);

            const mappedData = excelData.map(row =>
                mapExcelToBackend(row, fieldMappings)
            );

            setJsonData(mappedData);
        } catch (error) {
            console.error("Error parsing Excel:", error);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;
        setLoading(true);
        try {
            await importMutation.mutateAsync(file);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

    };

    return (
        <ModalAction
            title={t("table.import")}
            trigger={
                <Button icon={<ImportOutlined/>}>
                    {t("table.import")}
                </Button>
            }
            formId="importUserForm"
            confirmLoading={loading}
            open={open}
            onOpen={() => setOpen(true)}
            onCancel={() => {
                setOpen(false);
                handleResetFile()
            }}
        >
            <Space direction="vertical" size={10} className='w-full'>
                <Form
                    id="importUserForm"
                    onFinish={handleSubmit}
                    layout="vertical"
                    scrollToFirstError
                    className="w-full mt-10">
                    {/* Upload file */}
                    <Item
                        name="file"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            return e?.fileList || [];
                        }}
                        rules={[{required: true, message: t("upload.file_required")}]}
                    >
                        <Dragger
                            name="file"
                            multiple={false}
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                            accept=".xlsx,.xls"
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">
                                {t("upload.drag_click")}
                            </p>

                            <p className="ant-upload-hint">
                                {t("upload.only_excel")}
                            </p>
                            <a
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleExportTemplate();
                                }}
                            >
                                {
                                    loadingExport ? t("upload.loading") : t("upload.export_template")
                                }
                            </a>
                        </Dragger>
                    </Item>
                </Form>
                <Table
                    rowKey='_id'
                    columns={columnsTable}
                    dataSource={jsonData}
                    sticky
                    scroll={{
                        x: "max-content",
                    }}
                />
            </Space>
        </ModalAction>
    )
}

export default ImportData;
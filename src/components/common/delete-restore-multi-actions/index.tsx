// ** React query
import {useMutation, useQueryClient} from "@tanstack/react-query";

// ** i18n
import type {TFunction} from "i18next";

// ** antd
import {App, Button, Space, Typography} from "antd";

// ** Icon
import {DeleteOutlined, RollbackOutlined} from "@ant-design/icons";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";

interface IDeleteRestoreMultiActions {
    ids: string[];
    t: TFunction;
    onClearSelection?: () => void;
    title: string;
    desc: string;
    messageSuccess: string;
    api: (id: string[]) => Promise<any>;
    queryKey: readonly unknown[];
    action?: "delete" | "restore";
}

const DeleteRestoreMultiActions = ({ids, t, onClearSelection, title, desc, messageSuccess, api, action = "delete", queryKey}: IDeleteRestoreMultiActions) => {

    const queryClient = useQueryClient();
    const {message, notification} = App.useApp();

    const isDelete = action === "delete";
    const icon = action === "delete" ? <DeleteOutlined/> : <RollbackOutlined/>;
    const titleBtn = action === "delete" ? t("table.delete_selected") : t("table.restore_selected");

    const deleteRestoreMultiActionsMutation = useMutation({
        mutationFn: async () => {
            const res = await api(ids)
            return handleResponse(res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey});
            message.success(messageSuccess);
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

    const handleDelete = async () => {
        await deleteRestoreMultiActionsMutation.mutateAsync();
        onClearSelection?.();
    };

    return (
        <ModalAction
            danger={isDelete}
            type={action}
            maskClosable={false}
            keyboard={false}
            icon={icon}
            title={title}
            onOk={handleDelete}
            centered
            confirmLoading={deleteRestoreMultiActionsMutation.isPending}
            trigger={
                <Button
                    color={isDelete ? 'danger' : 'primary'}
                    variant='solid'
                    disabled={ids.length < 2}
                    icon={icon}>
                    {titleBtn}
                </Button>
            }
        >
            <Space align="start">
                <Typography.Text>{desc}</Typography.Text>
            </Space>
        </ModalAction>
    )
}

export default DeleteRestoreMultiActions
// ** React Query
import {useMutation, useQueryClient} from "@tanstack/react-query";

// ** antd
import {App, Typography, Space} from "antd";

// ** Icon
import {DeleteOutlined, RollbackOutlined} from "@ant-design/icons";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** i18n
import type {TFunction} from "i18next";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";

interface IDeleteRestoreActions {
    id: string;
    name: string;
    t: TFunction;
    title: string;
    desc: string;
    messageSuccess: string;
    api: (id: string) => Promise<any>;
    queryKey: readonly unknown[];
    action?: "delete" | "restore";
}

const DeleteRestoreActions = ({id, name, t, title, desc, messageSuccess, api, queryKey, action = "delete"}: IDeleteRestoreActions) => {
    const queryClient = useQueryClient();
    const {message, notification} = App.useApp();

    const icon = action === "delete" ? <DeleteOutlined/> : <RollbackOutlined style={{color: 'var(--color-primary)'}}/>;
    const isDelete = action === "delete";

    const deleteRestoreActionsMutation = useMutation({
        mutationFn: async () => {
            const res = await api(id);
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

    const handleDeleteRestoreActions = async () => {
        await deleteRestoreActionsMutation.mutateAsync();
    };

    return (
        <ModalAction
            danger={isDelete}
            type={action}
            maskClosable={false}
            keyboard={false}
            icon={icon}
            title={`${title} ${name}?`}
            onOk={handleDeleteRestoreActions}
            centered
            confirmLoading={deleteRestoreActionsMutation.isPending}
        >
            <Space align="start">
                <Typography.Text>{desc}</Typography.Text>
            </Space>
        </ModalAction>
    );
};

export default DeleteRestoreActions;

// ** React Query
import {useMutation, useQueryClient} from "@tanstack/react-query";

// ** antd
import {App, Typography, Space} from "antd";

// ** Icon
import {DeleteOutlined} from "@ant-design/icons";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** Services
import {UserService} from "@/services/user";

// ** i18n
import type {TFunction} from "i18next";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";

interface IDeleteUser {
    id: string;
    name: string;
    t: TFunction;
}

const DeleteUser = ({id, name, t}: IDeleteUser) => {
    const queryClient = useQueryClient();
    const {message, notification} = App.useApp();

    const deleteUserMutation = useMutation({
        mutationFn: async () => {
            const res = await UserService.remove(id);
            return handleResponse(res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getListUser"]});
            message.success(t("user.delete.deleted_success"));
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
        await deleteUserMutation.mutateAsync();
    };

    return (
        <ModalAction
            danger
            type='delete'
            maskClosable={false}
            keyboard={false}
            icon={<DeleteOutlined/>}
            title={`${t("user.delete.title")} ${name}?`}
            onOk={handleDelete}
            centered
            confirmLoading={deleteUserMutation.isPending}
        >
            <Space align="start">
                <Typography.Text>{t("user.delete.desc")}</Typography.Text>
            </Space>
        </ModalAction>
    );
};

export default DeleteUser;

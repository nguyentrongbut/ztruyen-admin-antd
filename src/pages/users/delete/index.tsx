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

interface IDeleteUser {
    id: string;
    name: string;
    t: TFunction;
}

const DeleteUser = ({id, name, t}: IDeleteUser) => {
    const queryClient = useQueryClient();
    const {message, notification} = App.useApp();

    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => UserService.removeUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getListUser"]});
            message.success(t("user.delete.deleted_success"));
        },
        onError: (error: any) => {
            notification.error({
                message: t("error_general"),
                description: error?.response?.data?.message || t("user.delete.deleted_fail"),
            });
        },
    });

    const handleDelete = async () => {
        await deleteUserMutation.mutateAsync(id);
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

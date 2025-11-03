// ** React query
import {useMutation, useQueryClient} from "@tanstack/react-query";

// ** i18n
import type {TFunction} from "i18next";

// ** antd
import {App, Button, Space, Typography} from "antd";

// ** Icon
import {DeleteOutlined} from "@ant-design/icons";

// ** Services
import {UserService} from "@/services/user";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";

interface IDeleteMultiUser {
    ids: string[];
    t: TFunction;
    onClearSelection?: () => void;
}

const DeleteMultiUser = ({ids, t, onClearSelection}: IDeleteMultiUser) => {

    const queryClient = useQueryClient();
    const {message, notification} = App.useApp();

    const deleteMultiUserMutation = useMutation({
        mutationFn: async () => {
            const res = await UserService.removeMulti(ids)
            return handleResponse(res)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getListUser"]});
            message.success(t("user.delete_multi.deleted_success"));
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
        await deleteMultiUserMutation.mutateAsync();
        onClearSelection?.();
    };

    return (
        <ModalAction
            danger
            type='delete'
            maskClosable={false}
            keyboard={false}
            icon={<DeleteOutlined/>}
            title={`${t("user.delete_multi.title")}`}
            onOk={handleDelete}
            centered
            confirmLoading={deleteMultiUserMutation.isPending}
            trigger={
                <Button
                    color='danger'
                    variant='solid'
                    disabled={ids.length < 2}
                    icon={<DeleteOutlined/>}>
                    {t("table.delete_selected")}
                </Button>
            }
        >
            <Space align="start">
                <Typography.Text>{t("user.delete_multi.desc")}</Typography.Text>
            </Space>
        </ModalAction>
    )
}

export default DeleteMultiUser
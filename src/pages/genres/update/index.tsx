// ** React
import {useState} from "react";

// ** React Query
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

// ** antd
import {
    App,
    Button,
    Form,
    Input
} from "antd";

// ** Icon
import {EditOutlined} from "@ant-design/icons";

// ** i18n
import type {TFunction} from "i18next";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** Services
import {GenreService} from "@/services/genre";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";

// ** Types
import type {IGenre} from "@/types/backend";

interface IUpdateGenre {
    t: TFunction;
    id: string
}

const {Item} = Form;
const {TextArea} = Input;

const UpdateGenre = ({t, id}: IUpdateGenre) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const {notification, message} = App.useApp()

    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ["getDetailGenre", id],
        queryFn: async () => {
            try {
                const res = await GenreService.detail(id);
                return handleResponse<IGenre>(res)
            } catch (err: any) {
                notification.error({
                    message: t("error_general"),
                    description: Array.isArray(err.message)
                        ? err.message[0]
                        : err.message || t("error_general"),
                    duration: 5,
                });
            }
        },
        enabled: open,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const infoGenre = data?.data;

    const updateGenreMutation = useMutation({
        mutationFn: async (payload) => {
            const res = await GenreService.update(id, payload);
            return handleResponse(res)
        },
        onSuccess: async (res) => {
            if (res.data) {
                message.success(t("genre.update.updated_success"));
                await queryClient.invalidateQueries({queryKey: ["getListGenre"]});
                await queryClient.invalidateQueries({queryKey: ["getDetailGenre", id]});
                setOpen(false);
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

    const handleSubmit = async (value: any) => {
        setLoading(true);
        try {
            await updateGenreMutation.mutateAsync(value);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalAction
            title={t("genre.update.title")}
            trigger={
                <Button
                    type="text"
                    icon={<EditOutlined/>}
                    onClick={() => console.log("update", id)}
                />
            }
            formId="updateGenreForm"
            confirmLoading={loading}
            open={open}
            loading={isLoading}
            onOpen={() => setOpen(true)}
            onCancel={() => {
                setOpen(false);
            }}
        >
            <Form
                key={infoGenre?._id}
                id="updateGenreForm"
                onFinish={handleSubmit}
                layout="vertical"
                scrollToFirstError
                className="w-full mt-10"
                initialValues={
                    {
                        ...infoGenre,
                    }
                }
            >
                <Item
                    name="name"
                    label={t("genre.columns.name")}
                    rules={[
                        {required: true, message: t("genre.validation.nameRequired")},
                        {min: 2, message: t("genre.validation.nameMin")},
                    ]}
                >
                    <Input placeholder={t('genre.placeholder.name')}/>
                </Item>

                <Item label={t("genre.columns.description")} name="description">
                    <TextArea rows={4} placeholder={t('genre.placeholder.description')}/>
                </Item>
            </Form>
        </ModalAction>
    );
}

export default UpdateGenre;
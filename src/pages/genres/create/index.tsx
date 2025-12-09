// ** React
import {useState} from "react";

// ** React Query
import {useMutation, useQueryClient} from "@tanstack/react-query";

// ** antd
import {
    App,
    Button,
    Form,
    Input,
} from "antd";

// ** Icon
import {PlusOutlined} from "@ant-design/icons";

// ** i18n
import type {TFunction} from "i18next";

// ** Components
import ModalAction from "@/components/common/modal-action";

// ** Services
import {GenreService} from "@/services/genre";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";

interface ICreateGenre {
    t: TFunction;
}

const {Item} = Form;
const {TextArea} = Input;

const CreateGenre = ({t}: ICreateGenre) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const {notification, message} = App.useApp()

    const queryClient = useQueryClient();

    const addGenreMutation = useMutation({
        mutationFn: async (payload) => {
            const res = await GenreService.add(payload);
            return handleResponse(res)
        },
        onSuccess: async (res) => {
            if (res.data) {
                message.success(t("genre.create.created_success"));
                await queryClient.invalidateQueries({queryKey: ["getListGenre"]});
                form.resetFields();
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

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await addGenreMutation.mutateAsync(values);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalAction
            title={t("genre.create.title")}
            trigger={
                <Button icon={<PlusOutlined/>} type="primary">
                    {t("genre.create.title")}
                </Button>
            }
            formId="createGenreForm"
            confirmLoading={loading}
            open={open}
            onOpen={() => setOpen(true)}
            onCancel={() => {
                setOpen(false);
            }}
        >
            <Form
                id="createGenreForm"
                onFinish={handleSubmit}
                layout="vertical"
                scrollToFirstError
                className="w-full mt-10">

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
};

export default CreateGenre;

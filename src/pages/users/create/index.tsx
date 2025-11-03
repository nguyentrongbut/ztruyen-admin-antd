// ** React
import {useState} from "react";

// ** React Query
import {useMutation, useQueryClient} from "@tanstack/react-query";

// ** antd
import {
    App,
    Button,
    DatePicker,
    Flex,
    Form,
    Image,
    Input,
    Select,
    Upload,
    type UploadFile,
    type UploadProps,
} from "antd";

// ** Icon
import {EyeOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";

// ** i18n
import type {TFunction} from "i18next";

// ** Components
import ModalAction from "@/components/common/modal-action";
import {withPlaceholderLabel} from "@/utils/withPlaceholderLabel.ts";

// ** Dayjs
import dayjs from "dayjs";
import {UploadService} from "@/services/upload";

// ** Configs
import {CONFIG_IMG} from "@/configs/img";

// ** i18n
import i18n from "@/i18n";

// ** antd locales
import enUS from "antd/es/date-picker/locale/en_US";
import viVN from "antd/es/date-picker/locale/vi_VN";

// ** Services
import {UserService} from "@/services/user";

// ** utils
import {handleResponse} from "@/utils/handleResponse.ts";
import {getExactAge} from "@/utils/dayjsHelper.ts";

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

interface ICreateUser {
    t: TFunction;
}

const {Item} = Form;
const {TextArea} = Input;

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const CreateUser = ({t}: ICreateUser) => {
    const [avatar, setAvatar] = useState<UploadFile[]>([]);
    const [cover, setCover] = useState<UploadFile[]>([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const {notification, message} = App.useApp()

    const queryClient = useQueryClient();


    const addUserMutation = useMutation({
        mutationFn: async (payload) => {
            const res = await UserService.add(payload);
            return handleResponse(res)
        },
        onSuccess: async (res) => {
            if (res.data) {
                message.success(t("user.create.created_success"));
                await queryClient.invalidateQueries({queryKey: ["getListUser"]});
                form.resetFields();
                setAvatar([]);
                setCover([]);
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

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChangeAvatar: UploadProps["onChange"] = ({fileList}) =>
        setAvatar(fileList);

    const handleChangeCover: UploadProps["onChange"] = ({fileList}) =>
        setCover(fileList);

    const handleSubmit = async (values: any) => {
        const email = values.email;
        setLoading(true);
        try {
            const [avatarUpload, coverUpload] = await Promise.all([
                avatar[0]?.originFileObj
                    ? UploadService.uploadImg(avatar[0].originFileObj, email)
                    : null,
                cover[0]?.originFileObj
                    ? UploadService.uploadImg(cover[0].originFileObj, `${email}-cover`)
                    : null,
            ]);

            const avatarSlug = avatarUpload?.data?.slug ? `${CONFIG_IMG.AVATAR}/${avatarUpload?.data?.slug}` : null;
            const coverSlug = coverUpload?.data?.slug ? `${CONFIG_IMG.COVER}/${coverUpload?.data?.slug}` : null;

            const payload = {
                ...values,
                age: getExactAge(values.birthday),
                avatar: avatarSlug,
                cover: coverSlug,
            };

            await addUserMutation.mutateAsync(payload);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // DatePicker configs
    const today = dayjs();
    const minDate = today.subtract(10, "year").endOf("day");
    const startYear = minDate.year();
    const defaultYear = dayjs(`${startYear}-01-01`);

    const uploadCover = (
        <div>
            <UploadOutlined/>
            <div style={{marginTop: 8}}>{t("user.placeholder.cover")}</div>
        </div>
    );

    const uploadAvatar = (
        <div>
            <UploadOutlined/>
            <div style={{marginTop: 8}}>{t("user.placeholder.avatar")}</div>
        </div>
    )

    return (
        <ModalAction
            title={t("user.create.title")}
            icon={<EyeOutlined/>}
            trigger={
                <Button icon={<PlusOutlined/>} type="primary">
                    {t("user.create.title")}
                </Button>
            }
            formId="createUserForm"
            confirmLoading={loading}
            open={open}
            onOpen={() => setOpen(true)}
            onCancel={() => setOpen(false)}
        >
            <Form
                id="createUserForm"
                onFinish={handleSubmit}
                layout="vertical"
                scrollToFirstError
                className="w-full mt-10">
                {/* Avatar */}
                <Item label={t("user.create.avatar")}>
                    <Flex justify="center" align="center">
                        <Upload
                            name="file"
                            listType="picture-circle"
                            fileList={avatar}
                            onChange={handleChangeAvatar}
                            onPreview={handlePreview}
                            beforeUpload={() => false}
                        >
                            {avatar.length >= 1 ? null : uploadAvatar}
                        </Upload>
                    </Flex>
                </Item>

                {/* Cover */}
                <Item label={t("user.create.cover")}>
                    <Upload
                        name="file"
                        listType="picture-card"
                        fileList={cover}
                        onChange={handleChangeCover}
                        onPreview={handlePreview}
                        beforeUpload={() => false}
                        style={{width: '100%', height: 180}}
                        className="custom-cover-upload"
                    >
                        {cover.length >= 1 ? null : uploadCover}
                    </Upload>
                </Item>

                {/* Other fields */}
                <Item
                    name="name"
                    label={t("user.columns.name")}
                    rules={[
                        {required: true, message: t("user.validation.nameRequired")},
                        {min: 2, message: t("user.validation.nameMin")},
                    ]}
                >
                    <Input placeholder={t('user.placeholder.name')}/>
                </Item>

                <Item
                    name="email"
                    label={t("user.columns.email")}
                    rules={[
                        {required: true, message: t("user.validation.emailRequired")},
                        {type: "email", message: t("user.validation.emailInvalid")},
                    ]}
                >
                    <Input placeholder={t('user.placeholder.email')}/>
                </Item>

                <Item
                    name="password"
                    label={t("user.columns.password")}
                    rules={[
                        {required: true, message: t("user.validation.passwordRequired")},
                        {min: 6, message: t("user.validation.passwordMin")},
                    ]}
                >
                    <Input.Password placeholder={t("user.placeholder.password")}/>
                </Item>

                <Item
                    name="birthday"
                    label={t("user.columns.birthday")}
                >
                    <DatePicker
                        className="w-full"
                        showToday={false}
                        format="DD/MM/YYYY"
                        locale={i18n.language === "vi" ? viVN : enUS}
                        placeholder={t("user.placeholder.birthday")}
                        defaultPickerValue={defaultYear}
                        disabledDate={(current) => current && current.isAfter(minDate)}
                    />
                </Item>

                <Item label="Bio" name="bio">
                    <TextArea rows={4} placeholder={t('user.placeholder.bio')}/>
                </Item>

                <Item
                    name="gender"
                    label={t("user.columns.gender")}
                >
                    <Select
                        options={[
                            {value: "male", label: withPlaceholderLabel(t("user.genders.male"))},
                            {value: "female", label: withPlaceholderLabel(t("user.genders.female"))},
                        ]}
                        placeholder={t("user.filter.choose.gender")}
                    />
                </Item>

                <Item
                    name="role"
                    label={t("user.columns.role")}
                    rules={[
                        {required: true, message: t("user.validation.roleRequired")},
                    ]}
                >
                    <Select
                        options={[
                            {value: "user", label: withPlaceholderLabel(t("user.roles.user"))},
                            {value: "author", label: withPlaceholderLabel(t("user.roles.author"))},
                        ]}
                        placeholder={t("user.filter.choose.role")}
                    />
                </Item>
            </Form>

            {previewImage && (
                <Image
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </ModalAction>
    );
};

export default CreateUser;

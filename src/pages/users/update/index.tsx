// ** React
import {useEffect, useState} from "react";

// ** React Query
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

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
import {EditOutlined, UploadOutlined} from "@ant-design/icons";

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
import {type FileType, getBase64} from "@/utils/getBase64.ts";
import {imgHelper, isInternalImage} from "@/utils/imgHelper.ts";

// ** Types
import type {IUser} from "@/types/backend";

interface IUpdateUser {
    t: TFunction;
    id: string
}

const {Item} = Form;
const {TextArea} = Input;

const UpdateUser = ({t, id}: IUpdateUser) => {
    const [avatar, setAvatar] = useState<UploadFile[]>([]);
    const [cover, setCover] = useState<UploadFile[]>([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const {notification, message} = App.useApp()

    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ["getDetailUser", id],
        queryFn: async () => {
            try {
                const res = await UserService.getDetailUser(id);
                return handleResponse<IUser>(res)
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

    const infoUser = data?.data;

    const resetAvatarCover = (user?: IUser) => {
        setAvatar(user?.avatar ? [{uid: "-1", name: "avatar", status: "done", url: user.avatar}] : []);
        setCover(user?.cover ? [{uid: "-2", name: "cover", status: "done", url: user.cover}] : []);
    };

    useEffect(() => {
        resetAvatarCover(infoUser);
    }, [infoUser])

    const updateUserMutation = useMutation({
        mutationFn: async (payload) => {
            const res = await UserService.update(id, payload);
            return handleResponse(res)
        },
        onSuccess: async (res) => {
            if (res.data) {
                message.success(t("user.update.updated_success"));
                await queryClient.invalidateQueries({queryKey: ["getListUser"]});
                await queryClient.invalidateQueries({queryKey: ["getDetailUser", id]});
                resetAvatarCover(infoUser);
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
            // remove old img
            const slugsToRemove = [
                isInternalImage(infoUser?.avatar) ? imgHelper(infoUser?.avatar) : null,
                isInternalImage(infoUser?.cover) ? imgHelper(infoUser?.cover) : null,
            ].filter(Boolean) as string[];

            if (slugsToRemove.length > 0) {
                await UploadService.removeMultiImg(slugsToRemove);
            }

            // upload new img
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

            await updateUserMutation.mutateAsync(payload);

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
            title={t("user.update.title")}
            trigger={
                <Button
                    type="text"
                    icon={<EditOutlined/>}
                    onClick={() => console.log("update", id)}
                />
            }
            formId="updateUserForm"
            confirmLoading={loading}
            open={open}
            loading={isLoading}
            onOpen={() => setOpen(true)}
            onCancel={() => {
                setOpen(false);
                resetAvatarCover(infoUser);
            }}
        >
            <Form
                key={infoUser?._id}
                id="updateUserForm"
                onFinish={handleSubmit}
                layout="vertical"
                scrollToFirstError
                className="w-full mt-10"
                initialValues={
                    {
                        ...infoUser,
                        birthday: infoUser?.birthday ? dayjs(infoUser.birthday) : undefined,
                    }
                }
            >
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

export default UpdateUser;

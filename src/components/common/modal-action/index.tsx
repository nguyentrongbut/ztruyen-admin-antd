// ** React
import {type ReactNode, useState, cloneElement, isValidElement, type ReactElement} from "react";

// ** antd
import { Button, Modal, Flex, type ModalProps } from "antd";

// ** i18n
import { useTranslation } from "react-i18next";

interface IModalAction extends Omit<ModalProps, "children" | "open" | "onCancel"> {
    icon?: ReactNode;
    children?: ReactNode;
    onOpen?: () => void;
    onCancel?: () => void;
    onOk?: () => void;
    danger?: boolean;
    type?: "default" | "delete";
    confirmLoading?: boolean;
    trigger?: ReactElement<{ onClick?: () => void }>;
}

const ModalAction = ({
                         icon,
                         danger = false,
                         type = "default",
                         children,
                         onOpen,
                         onCancel,
                         onOk,
                         footer,
                         confirmLoading,
                         trigger,
                         ...modalProps
                     }: IModalAction) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        onOpen?.();
    };

    const handleClose = () => {
        setOpen(false);
        onCancel?.();
    };

    const handleOk = async () => {
        await onOk?.();
        setOpen(false);
    };

    const renderFooter = () => {
        if (footer === null) return null;
        if (footer) return footer;

        const cancelBtn = (
            <Button type="text" onClick={handleClose}>
                {t("table.cancel")}
            </Button>
        );

        const okBtn = (
            <Button
                type="primary"
                danger={type === "delete"}
                onClick={handleOk}
                loading={confirmLoading}
            >
                {type === "delete" ? t("table.delete") : t("table.ok")}
            </Button>
        );

        return (
            <Flex gap="middle" justify="end">
                {cancelBtn}
                {okBtn}
            </Flex>
        );
    };

    const renderTrigger = () => {
        if (trigger && isValidElement(trigger)) {
            return cloneElement(trigger, {
                onClick: handleOpen,
            });
        }

        return (
            <Button
                danger={danger}
                type="text"
                icon={icon}
                onClick={handleOpen}
            />
        );
    };

    return (
        <>
            {renderTrigger()}
            <Modal
                open={open}
                onCancel={handleClose}
                footer={renderFooter()}
                {...modalProps}
            >
                {children}
            </Modal>
        </>
    );
};

export default ModalAction;

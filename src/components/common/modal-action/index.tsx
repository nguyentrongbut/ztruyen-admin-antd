// ** React
import {
    type ReactNode,
    useState,
    cloneElement,
    isValidElement,
    type ReactElement,
} from "react";

// ** antd
import {Button, Modal, Flex, type ModalProps} from "antd";

// ** i18n
import {useTranslation} from "react-i18next";

// ** style
import styles from "@/components/common/modal-action/modal.action.module.scss";

// ** clsx
import clsx from "clsx";

interface IModalAction
    extends Omit<ModalProps, "children" | "open" | "onCancel" | "onOk"> {
    open?: boolean;
    icon?: ReactNode;
    children?: ReactNode;
    onOpen?: () => void;
    onCancel?: () => void;
    onOk?: (...args: any[]) => void;
    danger?: boolean;
    type?: "default" | "delete" | "restore";
    confirmLoading?: boolean;
    trigger?: ReactElement<{ onClick?: () => void }>;
    formId?: string;
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
                         formId,
                         open: controlledOpen,
                         ...modalProps
                     }: IModalAction) => {
    const {t} = useTranslation();
    const [internalOpen, setInternalOpen] = useState(false);

    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const handleOpen = () => {
        setInternalOpen(true);
        onOpen?.();
    };

    const handleClose = () => {
        setInternalOpen(false);
        onCancel?.();
    };

    const handleOkClick = async () => {
        await onOk?.();
        setInternalOpen(false);
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
                loading={confirmLoading}
                htmlType={formId ? "submit" : "button"}
                form={formId}
                onClick={!formId ? handleOkClick : undefined}
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
                centered
                destroyOnHidden={true}
                {...modalProps}
            >
                <div className={clsx(styles.wrapper, "custom-scroll")}>
                    {children}
                </div>
            </Modal>
        </>
    );
};

export default ModalAction;

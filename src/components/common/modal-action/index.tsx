// ** React
import {type ReactNode, useState} from "react";

// ** antd
import {Button, Modal, type ModalProps} from "antd";

interface IModalAction extends Omit<ModalProps, "children" | "open" | "onCancel"> {
    icon: ReactNode;
    children?: ReactNode;
    danger?: boolean;
    onOpen?: () => void;
    onCancel?: () => void;
}

const ModalAction = ({ icon, danger = false, children, onOpen, onCancel, ...modalProps}: IModalAction) => {

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
        onOpen?.();
    };

    const handleClose = () => {
        setOpen(false);
        onCancel?.();
    };

    return (
        <>
            <Button
                danger={danger}
                type="text"
                icon={icon}
                onClick={handleOpen}
            />
            <Modal
                open={open}
                onCancel={handleClose}
                {...modalProps}
            >
                {children}
            </Modal>
        </>
    )
}

export default ModalAction;
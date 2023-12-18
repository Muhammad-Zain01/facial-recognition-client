import { Modal } from "antd"
import React from "react";
type ComponentProps = {
    name: string;
    isOpen: boolean;
    setModal: (value: boolean) => void
}
const ShowName: React.FC<ComponentProps> = ({ name, isOpen, setModal }) => {
    const closeModal = () => setModal(false);
    return (
        <Modal open={isOpen} footer={null} onCancel={closeModal}>
            {name}
        </Modal>
    )
}

export default ShowName;
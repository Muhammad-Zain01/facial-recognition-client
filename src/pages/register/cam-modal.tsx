import { Modal, Button, Spin } from "antd";
import FaceCam from "../../components/facecam/facecam";
import { useWebcamContext } from "../../hooks/useWebcam";
import { SpinWrapper, ModalContent } from "./register.style";
type ComponentProps = {
    isModalOpen: boolean;
    handleModalClose: () => void;
    captureImage: () => void;
    title?: string;
    buttonText?: string;
    extra?: boolean | React.ReactNode;
}
const CamModal: React.FC<ComponentProps> = ({ title = "Add Image", buttonText = "Capture", isModalOpen, handleModalClose, captureImage, extra = false }): JSX.Element => {
    const { resolution, isDetected, WebCamRef } = useWebcamContext()
    const { width, height } = resolution;
    return (
        <Modal
            title={title}
            open={isModalOpen}
            centered
            width={`calc(${width}px + 45px)`}
            onCancel={handleModalClose}
            footer={
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {extra}
                    </div>
                    <Button type="primary" disabled={!isDetected} onClick={captureImage}>{buttonText}</Button>
                </div>
            }
        >
            <ModalContent $hg={`calc(${height}px + 10px)`}>
                {!WebCamRef && <SpinWrapper><Spin size="large" /></SpinWrapper>}
                <FaceCam />
            </ModalContent>
        </Modal>
    )
}
export default CamModal;
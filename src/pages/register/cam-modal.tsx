import { Modal, Button, Spin } from "antd";
import FaceCam from "../../components/facecam/facecam";
import { useWebcamContext } from "../../hooks/useWebcam";
import { SpinWrapper, ModalContent } from "./register.style";
type ComponentProps = {
    isModalOpen: boolean;
    handleModalClose: () => void;
    captureImage: () => void
}
const CamModal: React.FC<ComponentProps> = ({ isModalOpen, handleModalClose, captureImage }): JSX.Element => {
    const { resolution, isDetected, WebCamRef } = useWebcamContext()
    const { width, height } = resolution;
    return (
        <Modal
            title="Add Image"
            open={isModalOpen}
            centered
            width={`calc(${width}px + 45px)`}
            onCancel={handleModalClose}
            footer={
                <div>
                    <Button type="primary" disabled={!isDetected} onClick={captureImage}>Capture</Button>
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
import Uploader from "../../components/uploader/uploader";
import { Modal, UploadFile, Button } from "antd";
import { RegisterHeading, RegisterLabel, RegisterWrapper, RegisterInput, RegisterButton } from "./register.style";
import FaceCam from "../../components/facecam/facecam";
import { useRef, useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { useWebcamContext } from "../../hooks/useWebcam";
const Register = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const NameRef = useRef<any>("");
    const { setWebcamStarted, isDetected, WebCamRef } = useWebcamContext();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const captureImage = () => {
        const imageSrc = WebCamRef.getScreenshot();
        const uuid = crypto.randomUUID();
        setFileList([
            ...fileList,
            {
                uid: uuid,
                name: uuid + '.png',
                status: 'done',
                url: imageSrc,
            }
        ])
        handleModalClose();
    }
    const handleModalOpen = () => {
        setWebcamStarted(true);
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setWebcamStarted(false)
        setIsModalOpen(false)
    }
    const onRegister = () => {
        const Name = NameRef.current.input.value;
        console.log(Name);

    }
    return (
        <RegisterWrapper>

            <RegisterHeading>
                Register your face
            </RegisterHeading>
            <div>
                <RegisterLabel>
                    <div>Upload Images <span className="text">( Max 10 )</span></div>
                    <div ><Button icon={<CameraOutlined />} onClick={handleModalOpen} disabled={fileList.length >= 10}>Capture</Button></div>
                </RegisterLabel>
                <Uploader fileList={fileList} setFileList={setFileList} />
            </div>
            <div>
                <RegisterLabel>
                    Name
                </RegisterLabel>
                <RegisterInput placeholder="Muhammad Zain" ref={NameRef} />
                <RegisterButton type="primary" onClick={onRegister}>Register</RegisterButton>
            </div>
            <Modal
                title="Add Image"
                open={isModalOpen}
                centered
                width={690}
                onCancel={handleModalClose}
                footer={
                    <div>
                        <Button type="primary" disabled={!isDetected} onClick={captureImage}>Capture</Button>
                    </div>
                }
            >
                <div style={{ height: 500, margin: 'auto' }}>
                    <FaceCam />
                </div>
            </Modal>
        </RegisterWrapper>
    )
}

export default Register;
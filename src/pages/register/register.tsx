import Uploader from "../../components/uploader/uploader";
import { Modal, UploadFile, Button } from "antd";
import { RegisterHeading, RegisterLabel, RegisterWrapper, RegisterInput, RegisterButton } from "./register.style";
import FaceCam from "../../components/facecam/facecam";
import { useRef, useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { useWebcamContext } from "../../hooks/useWebcam";
const Register = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setWebcamStarted, isDetected } = useWebcamContext();

    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ]);
    const captureImage = () => {

    }
    const handleModalOpen = () => {
        setWebcamStarted(true);
        setIsModalOpen(true);
    }
    return (
        <RegisterWrapper>

            <RegisterHeading>
                Register your face
            </RegisterHeading>
            <div>
                <RegisterLabel>
                    <div>Upload Images <span className="text">( Max 10 )</span></div>
                    <div ><Button icon={<CameraOutlined />} onClick={handleModalOpen}>Capture</Button></div>
                </RegisterLabel>
                <Uploader fileList={fileList} setFileList={setFileList} />
            </div>
            <div>
                <RegisterLabel>
                    Name
                </RegisterLabel>
                <RegisterInput placeholder="Muhammad Zain" />
                <RegisterButton type="primary">Register</RegisterButton>
            </div>


            <Modal
                title="Add Image"
                open={isModalOpen}
                centered
                width={690}
                onCancel={() => {
                    setWebcamStarted(false)
                    setIsModalOpen(false)
                }}
                footer={
                    <div>
                        <Button type="primary" disabled={!isDetected} onClick={captureImage}>Capture</Button>
                    </div>
                }
            >
                <div style={{ height: 500, margin: 'auto' }}>
                    <FaceCam key={IsWeb} />
                </div>
            </Modal>
        </RegisterWrapper>
    )
}

export default Register;
import { UploadFile } from "antd";
import { RegisterHeading, RegisterLabel, RegisterWrapper, RegisterInput, RegisterButton } from "./register.style";
import { useRef, useState } from "react";
import { useWebcamContext } from "../../hooks/useWebcam";
import UploadImages from "./upload-images";
import CamModal from "./cam-modal";
const Register = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const NameRef = useRef<any>("");
    const { setWebcamStarted, WebCamRef } = useWebcamContext();
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
            <UploadImages fileList={fileList} handleModalOpen={handleModalOpen} setFileList={setFileList} />
            <div>
                <RegisterLabel>
                    Name
                </RegisterLabel>
                <RegisterInput placeholder="Muhammad Zain" ref={NameRef} />
                <RegisterButton type="primary" onClick={onRegister}>Register</RegisterButton>
            </div>
            <CamModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} captureImage={captureImage} />
        </RegisterWrapper>
    )
}

export default Register;
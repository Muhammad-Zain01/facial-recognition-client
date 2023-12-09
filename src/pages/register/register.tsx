import { UploadFile, Button } from "antd";
import { RegisterHeading, RegisterLabel, RegisterWrapper, RegisterInput, RegisterButton } from "./register.style";
import { useRef, useState } from "react";
import { useWebcamContext } from "../../hooks/useWebcam";
import UploadImages from "./upload-images";
import CamModal from "./cam-modal";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import RegisterModal from "./register-modal";
import { Upload } from '../../API/request'

const Register = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [registerState, setRegisterState] = useState(0)
    const NameRef = useRef<any>("");
    const { setWebcamStarted, WebCamRef } = useWebcamContext();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const navigate = useNavigate()
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
        setRegisterModal(true)
        setRegisterState(0)
        const name = NameRef.current.input.value;
        const id = crypto.randomUUID();
        fileList.map(item => {
            const image = item?.url
            // Upload()
        })
    }

    return (
        <RegisterWrapper>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>Back</Button>
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
            <RegisterModal modalOpen={registerModal} setModalOpen={setRegisterModal} state={registerState} />
        </RegisterWrapper>
    )
}

export default Register;
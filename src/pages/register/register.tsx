import { UploadFile, Button, message } from "antd";
import { RegisterHeading, RegisterLabel, RegisterWrapper, RegisterInput, RegisterButton } from "./register.style";
import { useEffect, useRef, useState } from "react";
import { useWebcamContext } from "../../hooks/useWebcam";
import CamModal from "./cam-modal";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import UploadImages from "./upload-images";
import RegisterModal from "./register-modal";
import { UploadImage, RegisterUser } from '../../API/request'
const Register = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [registerState, setRegisterState] = useState(0)
    const [percent, setPercent] = useState(0)
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
    const Reset = () => {
        setRegisterModal(false)
        setRegisterState(0)
        setPercent(0)
        setFileList([])
    }
    const onRegister = () => {
        const name = NameRef.current.input.value;
        if (name == '') {
            return message.error('Please enter your name');
        }
        if (fileList.length == 0) {
            return message.error('Please Upload your Images');
        }

        setRegisterModal(true)
        const length = fileList.length
        fileList.map(async (item, index) => {
            const img = item?.url
            const response = await UploadImage({ id: name, name, img })
            if (response?.Status === 1) {
                setPercent(Math.round(((index + 1) / length) * 100))
            } else if (response?.Status === 0) {
                message.error('Error Uploading')
                setRegisterState(2);
            }
        })

    }
    const startRegister = async () => {
        setRegisterState(4)
        const name = NameRef.current.input.value;
        const response = await RegisterUser(name)
        if (response?.Status) {
            return setRegisterState(3)
        }
        return setRegisterState(2)
    }
    useEffect(() => {
        if (percent == 100) {
            setRegisterState(1);
        }
        console.log(percent);
    }, [percent])
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
            <CamModal
                isModalOpen={isModalOpen}
                handleModalClose={handleModalClose}
                captureImage={captureImage}
            />
            <RegisterModal
                modalOpen={registerModal}
                reset={Reset}
                state={registerState}
                percent={percent}
                startRegister={startRegister}
            />
        </RegisterWrapper>
    )
}

export default Register;
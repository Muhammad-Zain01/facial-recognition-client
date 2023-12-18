import React, { useState } from "react"
import UIBox from "../../components/ui-box/ui-box"
import { HomePageBox, HomePageContainer, HomePageHeading, HomePageHeadingContainer } from "./home.style"
import GithubButton from "../../components/github-button/github-button"
import CamModal from "../register/cam-modal"
import { useWebcamContext } from "../../hooks/useWebcam"
import { CheckUser } from '../../API/request'
import ShowName from "../../components/show-name/show-name"
const Home: React.FC = (): JSX.Element => {
    const [checkModal, setCheckModal] = useState(false);
    const [name, setName] = useState<string>('No User Detected');
    const [nameModal, setNameModal] = useState<boolean>(false)
    
    const { setWebcamStarted, WebCamRef } = useWebcamContext();
    const CheckUserImage = async () => {
        const image = WebCamRef.getScreenshot();
        const response = await CheckUser(image);
        if (response?.Status) {
            setName(response?.user)
        }else{
            setName("No User Detected")
        }
    }
    const OpenCheckModal = () => {
        setCheckModal(true)
        setWebcamStarted(true)
    }
    const handleModalClose = () => {
        setCheckModal(false)
        setWebcamStarted(false)
    }
    return (
        <HomePageContainer>
            <GithubButton />
            <HomePageHeadingContainer>
                <HomePageHeading>Facial Recognition</HomePageHeading>
            </HomePageHeadingContainer>
            <HomePageBox className="container">
                <UIBox href="register" onClick={() => {}}>
                    Register Face
                </UIBox>
                <UIBox href={false} onClick={OpenCheckModal}>
                    Check Face
                </UIBox>
                <CamModal
                    title="Check Image"
                    buttonText="Check"
                    isModalOpen={checkModal}
                    handleModalClose={handleModalClose}
                    captureImage={CheckUserImage}
                    extra={
                        <>
                            {
                                name &&
                                <span style={{
                                    border: '1px solid #d9d9d9',
                                    borderRadius: 4,
                                    color: "#565656",
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    boxShadow: "none",
                                    padding: 10,
                                    fontWeight: 'bold'
                                }}>
                                    {name}
                                </span>
                            }
                        </>
                    }
                />
                <ShowName name={name} setModal={setNameModal} isOpen={nameModal} />
            </HomePageBox>
        </HomePageContainer>
    )
}
export default Home;
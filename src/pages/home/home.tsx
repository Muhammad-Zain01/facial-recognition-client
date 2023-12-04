import React from "react"
import UIBox from "../../components/ui-box/ui-box"
import { HomePageBox, HomePageContainer, HomePageHeading, HomePageHeadingContainer } from "./home.style"
const Home: React.FC = (): JSX.Element => {
    return (
        <HomePageContainer>
            <HomePageHeadingContainer>
                <HomePageHeading>Facial Recognition</HomePageHeading>
            </HomePageHeadingContainer>
            <HomePageBox className="container">
                <UIBox href="register">
                    Register Face
                </UIBox>
                <UIBox href="check">
                    Check Face
                </UIBox>
            </HomePageBox>
        </HomePageContainer>
    )
}
export default Home;
import styled from "styled-components";
import { Typography } from "antd";

export const HomePageContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 700px;
    flex-direction: column;
    align-items: center;
`
export const HomePageHeadingContainer = styled.div`
    margin-bottom: 30px;
`
export const HomePageHeading = styled(Typography.Title)`
    font-weight: 800;
    font-size: 50px !important;
`
export const HomePageBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
import styled from "styled-components";
import { Typography, Button, Input } from "antd";
export const RegisterWrapper = styled.div`
    width: 40%;
    margin: auto;
`

export const RegisterHeading = styled(Typography.Title)`
    font-size: 40px !important;
    font-weight: 700 !important;
    padding: 10px 0px;
`

export const RegisterLabel = styled(Typography.Title)`
    font-size: 18px !important;
    padding: 10px 0px !important;
    display: flex;
    justify-content: space-between;
    .text{
        color: grey;
        font-size: 14px !important;
        font-weight: 300;
    }
`
export const RegisterInput = styled(Input)`
    padding: 10px;
`
export const RegisterButton = styled(Button)`
    height: 40px;
    font-size: 15px;
    margin-top: 20px;
    width: 100%;
`
export const SpinWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    height: 100%;
    align-items: center;
`
export const ModalContent = styled.div`
    margin: auto;
    height: ${props => props.$hg};
`
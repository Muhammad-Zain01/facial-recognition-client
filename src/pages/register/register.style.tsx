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
    span{
        color: grey;
        font-size: 14px !important;
        font-weight: 300 !important;
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

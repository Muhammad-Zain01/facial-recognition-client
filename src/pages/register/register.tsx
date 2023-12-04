import Uploader from "../../components/uploader/uploader";
import { Typography, Input, Button } from "antd";
import { RegisterHeading, RegisterLabel, RegisterWrapper, RegisterInput, RegisterButton } from "./register.style";

const Register = () => {
    return (
        <RegisterWrapper>
            <RegisterHeading>
                Register your face
            </RegisterHeading>
            <div>
                <RegisterLabel>
                    Upload Images <span>( Max 10 )</span>
                </RegisterLabel>
                <Uploader />
            </div>
            <div>
                <RegisterLabel>
                    Name
                </RegisterLabel>
                <RegisterInput placeholder="Muhammad Zain" />
                <RegisterButton type="primary">Register</RegisterButton>
            </div>
        </RegisterWrapper>
    )
}

export default Register;
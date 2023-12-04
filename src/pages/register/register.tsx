import Uploader from "../../components/uploader/uploader";
import { Typography } from "antd";
const Register = () => {
    return (
        <div className="container">
            <div>
                <Typography.Title style={{ fontSize: 18, padding: "10px 0px" }}>
                    Upload Images <span>( Max 10 )</span>
                </Typography.Title>
                <Uploader />
            </div>
        </div>
    )
}

export default Register;
import { RegisterLabel } from "./register.style";
import { Button } from "antd";
import Uploader from "../../components/uploader/uploader";
import { CameraOutlined } from "@ant-design/icons";
import type { UploadFile } from 'antd/es/upload/interface';

type ComponentProps = {
    handleModalOpen: () => void;
    fileList: UploadFile[];
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}
const UploadImages: React.FC<ComponentProps> = ({ fileList, handleModalOpen, setFileList }) => {
    return (
        <div>
            <RegisterLabel>
                <div>Upload Images <span className="text">( Max 10 )</span></div>
                <div ><Button icon={<CameraOutlined />} onClick={handleModalOpen} disabled={fileList.length >= 10}>Capture</Button></div>
            </RegisterLabel>
            <Uploader fileList={fileList} setFileList={setFileList} />
        </div>
    )
}
export default UploadImages;
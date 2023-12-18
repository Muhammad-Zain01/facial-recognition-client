import { RegisterLabel } from "./register.style";
import Uploader from "../../components/uploader/uploader";
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
            </RegisterLabel>
            <Uploader fileList={fileList} captureModal={handleModalOpen} setFileList={setFileList} />
        </div>
    )
}
export default UploadImages;
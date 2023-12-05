import { Spin } from "antd";
import { SpinnerWrapper } from "./spinner.style";

const Spinner = () => {
    return (
        <SpinnerWrapper>
            <Spin size="large" />
        </SpinnerWrapper>
    )
}
export default Spinner;
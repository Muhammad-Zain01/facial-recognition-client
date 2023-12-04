import React from "react";
import { UIBoxWrapper, UIBoxImage, UIBoxChildren } from "./ui-box.style";
import { useNavigate } from "react-router-dom";
type ComponentProps = {
    children: React.ReactNode;
    href: String;
}
const UIBox: React.FC<ComponentProps> = ({ href, children }): JSX.Element => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${href}`)
    }
    return (
        <UIBoxWrapper onClick={handleClick}>
            <UIBoxImage src="/face.jpg" alt="face" />
            <UIBoxChildren>{children}</UIBoxChildren>
        </UIBoxWrapper>
    )
}
export default UIBox;
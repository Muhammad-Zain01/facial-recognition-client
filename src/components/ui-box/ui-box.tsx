import React from "react";
import { UIBoxWrapper, UIBoxImage, UIBoxChildren } from "./ui-box.style";
import { useNavigate } from "react-router-dom";
type ComponentProps = {
    children: React.ReactNode;
    href: string | boolean;
    onClick: () => void;
}
const UIBox: React.FC<ComponentProps> = ({ href, onClick, children }): JSX.Element => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (href) { navigate(`/${href}`) }
        if (onClick) { onClick() }
    }
    return (
        <UIBoxWrapper onClick={handleClick}>
            <UIBoxImage src={`/${href ? 'register.png' : 'check.png'}`} alt="face" />
            <UIBoxChildren>{children}</UIBoxChildren>
        </UIBoxWrapper>
    )
}
export default UIBox;
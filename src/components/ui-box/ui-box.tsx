import React from "react";
import { UIBoxWrapper, UIBoxImage, UIBoxChildren } from "./ui-box.style";
type ComponentProps = {
    children: React.ReactNode
}
const UIBox: React.FC<ComponentProps> = ({ children }): JSX.Element => {
    return (
        <UIBoxWrapper>
            <UIBoxImage src="/face.jpg" alt="face" />
            <UIBoxChildren>{children}</UIBoxChildren>
        </UIBoxWrapper>
    )
}
export default UIBox;
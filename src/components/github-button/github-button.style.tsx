import styled from "styled-components";

export const GithubButtonWrapper = styled.div`
    position: absolute;
    top: 45px; 
    right: 30px;
    @media only screen and (max-width: 805px) {
        top: 45px; 
        right: unset;
        display: flex;
        justify-content: center;
    }
`
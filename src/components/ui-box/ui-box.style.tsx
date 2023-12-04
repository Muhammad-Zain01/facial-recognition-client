import styled from 'styled-components'

export const UIBoxWrapper = styled.div`
    width: 33%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #46464624;
    border-radius: 0.5rem;
    padding: 40px 20px;
    transition: 0.2s ease-in-out;
    &:hover{
        border-color: #68686889;
    }
`
export const UIBoxImage = styled.img`
    width: 70%;
`
export const UIBoxChildren = styled.div`
    font-size: 30px;
    font-weight: 600;
`
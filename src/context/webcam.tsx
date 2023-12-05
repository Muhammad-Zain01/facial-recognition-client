import { createContext, useReducer, useRef } from "react";

type ContextState = {
    isDetected: Boolean;
    WebcamStarted: Boolean;
    WebCamRef: any;
    setIsDetected?: (value: Boolean) => void
    setWebcamStarted?: (value: Boolean) => void
    setWebCamRef?: (value: any) => void
}
const initialState: ContextState = {
    isDetected: false,
    WebcamStarted: false,
    WebCamRef: false
}
const defaultValues: ContextState = {
    ...initialState,
    setIsDetected: (value: Boolean) => { },
    setWebcamStarted: (value: Boolean) => { },
    setWebCamRef: (value: any) => { },
}
export const WebCamContext = createContext(defaultValues);
const WebcamReducer = (state, action) => {
    switch (action.type) {
        case "SET_DETECTED":
            return {
                ...state,
                isDetected: action.payload
            }
        case "SET_WEBCAM":
            return {
                ...state,
                WebcamStarted: action.payload
            }
        case "SET_WEBCAM_REF":
            return {
                ...state,
                WebCamRef: action.payload
            }
    }
}
type Props = {
    children: React.ReactNode
}
export const WebcamProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(WebcamReducer, initialState)
    const setIsDetected = (value: Boolean): void => dispatch({ type: "SET_DETECTED", payload: value })
    const setWebcamStarted = (value: Boolean): void => dispatch({ type: "SET_WEBCAM", payload: value })
    const setWebCamRef = (ref: any): void => dispatch({ type: "SET_WEBCAM_REF", payload: ref })
    const value = { ...state, setIsDetected, setWebcamStarted, setWebCamRef }
    return (
        <WebCamContext.Provider value={value}>
            {children}
        </WebCamContext.Provider>
    )
}
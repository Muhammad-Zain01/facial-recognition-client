import { createContext, useReducer } from "react";

type Resolution = {
    width: number,
    height: number
}
type ContextState = {
    isDetected: Boolean;
    WebcamStarted: Boolean;
    WebCamRef: any;
    resolution: Resolution;
}
type CominedState = {
    isDetected: Boolean;
    WebcamStarted: Boolean;
    WebCamRef: any;
    resolution: Resolution;
    setIsDetected: (value: Boolean) => void
    setWebcamStarted: (value: Boolean) => void
    setWebCamRef: (value: any) => void;
    setResolution: (value: Resolution) => void
}

const initialState: ContextState = {
    isDetected: false,
    WebcamStarted: false,
    WebCamRef: false,
    resolution: {
        width: 640,
        height: 480,
    }
}

const defaultValues: CominedState = {
    ...initialState,
    setIsDetected: () => { },
    setWebcamStarted: () => { },
    setWebCamRef: () => { },
    setResolution: () => { }
}

export const WebCamContext = createContext(defaultValues);
const WebcamReducer = (state: any, action: any) => {
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
        case "SET_RESOLUTION":
            return {
                ...state,
                resolution: action.payload
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
    const setResolution = (value: Resolution): void => dispatch({ type: "SET_RESOLUTION", payload: value })
    const value = { ...state, setIsDetected, setWebcamStarted, setWebCamRef, setResolution }
    return (
        <WebCamContext.Provider value={value}>
            {children}
        </WebCamContext.Provider>
    )
}
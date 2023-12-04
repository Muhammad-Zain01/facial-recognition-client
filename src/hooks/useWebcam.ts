import { useContext } from "react";
import { WebCamContext } from "../context/webcam";
export const useWebcamContext = () => useContext(WebCamContext)
import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import _debounce from 'lodash/debounce';
import { useWebcamContext } from '../../hooks/useWebcam';

type View = {
  position: string;
  width?: string;
  height?: string
}
const FaceCam: React.FC = () => {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const intervalId = useRef<any>(null);
  const { resolution, WebcamStarted, setIsDetected, setWebCamRef } = useWebcamContext();
  let MainWidth = resolution.width;
  const width = window && window?.innerWidth;
  let View: View = { position: 'absolute' };
  if (width < 716) {
    MainWidth = width - 76
  }

  if (width < 400) {
    View = {
      ...View,
      width: 'calc(100% - 41px)',
      height: 'unset'
    }
  }

  const loadModels = async () => {
    try {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      console.log('Models loaded successfully');
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };
  const handleWebcamStream = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      setWebCamRef(webcamRef.current)
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      startFaceDetection(video, videoWidth, videoHeight)
    }
  };

  const startFaceDetection = (video: any, videoWidth: number, videoHeight: number) => {
    const context = canvasRef.current.getContext('2d');
    intervalId.current = requestAnimationFrame(
      _debounce(async function detect() {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
        setIsDetected(detections.length > 0);

        if (canvasRef.current.width > 0 && canvasRef.current.height > 0) {
          const resizedDetections = faceapi.resizeResults(detections, { width: videoWidth, height: videoHeight });
          context.clearRect(0, 0, videoWidth, videoHeight);
          faceapi.draw.drawDetections(context, resizedDetections);
        }

        intervalId.current = requestAnimationFrame(detect);
      }, 1000) // Debounce time in milliseconds
    );
  };
  const stopFaceDetection = () => {
    if (intervalId.current) {
      cancelAnimationFrame(intervalId.current);
    }
  };


  useEffect(() => {
    loadModels()
  }, []);

  useEffect(() => {
    if (!WebcamStarted) {
      stopFaceDetection();
    } else {
      handleWebcamStream();
    }
  }, [WebcamStarted])


  return (
    <div style={{ margin: 'auto' }}>
      <Webcam
        audio={false}
        height={resolution.height}
        width={MainWidth}
        videoConstraints={{ width: MainWidth, height: resolution.height }}
        style={View}
        onLoadedMetadata={handleWebcamStream}
        ref={webcamRef}
      />
      <canvas style={View} ref={canvasRef} />
    </div>
  );

}

export default FaceCam;
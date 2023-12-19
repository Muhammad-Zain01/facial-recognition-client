import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import { useWebcamContext } from '../../hooks/useWebcam';

const FaceCam: React.FC = () => {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const intervalId = useRef<any>(null);
  const { resolution, WebcamStarted, setIsDetected, setWebCamRef } = useWebcamContext();
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
    intervalId.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
      if (detections.length > 0) { setIsDetected(true); }
      else { setIsDetected(false) }
      const resizedDetections = faceapi.resizeResults(detections, { width: videoWidth, height: videoHeight });
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    }, 100);
  };

  const stopFaceDetection = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
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
      <Webcam videoConstraints={resolution} style={{ position: 'absolute' }} onLoadedMetadata={handleWebcamStream} ref={webcamRef} />
      <canvas style={{ position: 'absolute' }} ref={canvasRef} />
    </div>
  );

}

export default FaceCam;
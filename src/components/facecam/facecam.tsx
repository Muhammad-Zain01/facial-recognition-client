import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import { useWebcamContext } from '../../hooks/useWebcam';

const FaceCam: React.FC = () => {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const intervalId = useRef<any>(null);
  const { WebcamStarted, setIsDetected } = useWebcamContext();
  const loadModels = async () => {
    const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  };
  const handleWebcamStream = async () => {
    console.log("STARTED ==> ", webcamRef.current.video.readyState)
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
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
  const startFaceDetection = (video, videoWidth, videoHeight) => {
    intervalId.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
      if (detections.length > 0) { setIsDetected(true) }
      else { setIsDetected(false) }
      const resizedDetections = faceapi.resizeResults(detections, { width: videoWidth, height: videoHeight });
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    }, 100);
  };
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  };

  const stopFaceDetection = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };
  const stopWebcam = () => {
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (!WebcamStarted) {
      stopFaceDetection();
      stopWebcam();
    }
  }, [WebcamStarted])
  useEffect(() => {
    loadModels().then(() => {
      if (WebcamStarted) {
        handleWebcamStream();
      }
    })
  }, []);

  return (
    <div style={{ margin: 'auto' }}>
      <Webcam style={{ position: 'absolute' }} onLoadedMetadata={handleWebcamStream} ref={webcamRef} />
      <canvas style={{ position: 'absolute' }} ref={canvasRef} />
    </div>
  );

}

export default FaceCam;
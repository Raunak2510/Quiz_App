import React, { useEffect, useRef } from 'react';

import styles from './camera-streaming.module.scss'; 

const CameraStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: {
        width: {
          min: 300,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 300,
          ideal: 1080,
          max: 1440,
        },
      },
    };

    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    function getLocalAudio() {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          window.localStream = stream;
          window.localAudio.srcObject = stream;
          window.localAudio.autoplay = true;
        })
        .catch((err) => {
          console.error(`you got an error: ${err}`);
        });
    }

    startStream();
    getLocalAudio();

    return () => {
      if(videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.videoContainer}>
      <video ref={videoRef} autoPlay playsInline className={styles.video}></video>
    </div>
  );
};

export default CameraStream;

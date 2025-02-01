import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

// import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

const VisualTryOn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dress, setDress] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunks = useRef([]);

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/dresses/${id}`);
        setDress(response.data);
      } catch (err) {
        console.error('Error fetching dress:', err);
      }
    };
    fetchDress();
  }, [id]);

  useEffect(() => {
    if (!isWebcamActive) return;

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    // Set up dress image
    const dressImg = new Image();
    if (dress?.image) {
      dressImg.src = dress.image;
    }

    pose.onResults((results) => {
      if (!results.poseLandmarks) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the video frame
      ctx.save();
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get body landmarks
      const shoulders = {
        left: results.poseLandmarks[11],
        right: results.poseLandmarks[12]
      };
      const hips = {
        left: results.poseLandmarks[23],
        right: results.poseLandmarks[24]
      };

      // Calculate dress dimensions and position
      const shoulderWidth = Math.abs(shoulders.right.x - shoulders.left.x) * canvas.width;
      const bodyHeight = Math.abs(shoulders.left.y - hips.left.y) * canvas.height;
      const dressWidth = shoulderWidth * 1.5;
      const dressHeight = bodyHeight * 1.2;
      const dressX = (shoulders.left.x * canvas.width + shoulders.right.x * canvas.width) / 2 - dressWidth / 2;
      const dressY = shoulders.left.y * canvas.height - dressHeight * 0.1;

      // Apply dress with proper blending
      ctx.globalAlpha = 0.9;
      ctx.drawImage(dressImg, dressX, dressY, dressWidth, dressHeight);
      ctx.globalAlpha = 1.0;

      ctx.restore();
    });

    if (video) {
      const camera = new Camera(video, {
        onFrame: async () => {
          await pose.send({ image: video });
        },
        width: 640,
        height: 480
      });
      camera.start();
    }

    return () => {
      pose.close();
    };
  }, [isWebcamActive, dress]);

  const startWebcam = async () => {
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          const canvas = canvasRef.current;
          canvas.width = 640;
          canvas.height = 700;
          setIsWebcamActive(true);
          setLoading(false);

          // Set up media recorder
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.current.push(e.data);
            }
          };

          recorder.onstop = () => {
            const blob = new Blob(chunks.current, { type: 'video/webm' });
            chunks.current = [];
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'virtual-try-on.webm';
            a.click();
            URL.revokeObjectURL(url);
          };
        };
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setLoading(false);
    }
  };

  // const stopWebcam = () => {
  //   // Stop all tracks from the stream
  //   if (videoRef.current && videoRef.current.srcObject) {
  //     const stream = videoRef.current.srcObject;
  //     stream.getTracks().forEach(track => track.stop());
  //     videoRef.current.srcObject = null;
  //   }

  //   // Stop recording if it's active
  //   if (recording && mediaRecorder && mediaRecorder.state !== 'inactive') {
  //     mediaRecorder.stop();
  //   }

  //   // Reset states
  //   setIsWebcamActive(false);
  //   setRecording(false);
  //   setMediaRecorder(null);
  //   chunks.current = [];

  //   // Clear canvas
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const ctx = canvas.getContext('2d');
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   }
  // };

  const toggleRecording = () => {
    if (!mediaRecorder) return;

    if (!recording) {
      mediaRecorder.start();
      setRecording(true);
    } else {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Virtual Try-On</h2>
      
      <div style={styles.tryOnSection}>
        <div style={styles.buttonSection}>
          {!isWebcamActive ? (
            <button
              onClick={startWebcam}
              style={styles.startButton}
              disabled={loading}
            >
              {loading ? 'Starting Camera...' : 'Start Virtual Try-On'}
            </button>
          ) : (
            <>
              {/* <button
                onClick={stopWebcam}
                style={styles.stopButton}
              >
                Stop Camera
              </button> */}
              <button
                onClick={toggleRecording}
                style={recording ? styles.stopRecordButton : styles.recordButton}
              >
                {recording ? 'Stop Recording' : 'Record Video'}
              </button>
            </>
          )}
          <button
            onClick={() => navigate(`/dress/${id}`)}
            style={styles.backButton}
          >
            Back to Dress
          </button>
        </div>

        <div style={styles.videoContainer}>
          <video
            ref={videoRef}
            style={styles.video}
            autoPlay
            playsInline
          />
          <canvas
            ref={canvasRef}
            style={styles.canvas}
          />
          {loading && (
            <div style={styles.loading}>
              Starting camera...
            </div>
          )}
        </div>

        {dress && (
          <div style={styles.dressPreview}>
            <h3>Selected Dress</h3>
            <img 
              src={dress.image} 
              alt={dress.name} 
              style={styles.dressImage}
              onError={(e) => {
                console.error('Error loading dress preview image');
                e.target.style.display = 'none';
              }}
            />
            <p style={styles.dressName}>{dress.name}</p>
          </div>
        )}
      </div>

      <div style={styles.instructions}>
        <h3>How to use Virtual Try-On:</h3>
        <ol>
          <li>Click "Start Virtual Try-On" to activate your camera</li>
          <li>Stand back to ensure your full body is visible</li>
          <li>The dress will automatically fit to your body</li>
          <li>Use "Record Video" to save a clip of your try-on</li>
          <li>Click "Stop Camera" when you're done</li>
        </ol>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  tryOnSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  buttonSection: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  videoContainer: {
    width: '640px',
    height: '480px',
    position: 'relative',
    backgroundColor: '#f8f9fa',
    border: '2px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'none',
  },
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    '&:disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
    }
  },
  stopButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#d32f2f',
      transform: 'translateY(-2px)',
    }
  },
  recordButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#1976D2',
      transform: 'translateY(-2px)',
    }
  },
  stopRecordButton: {
    backgroundColor: '#FF9800',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#F57C00',
      transform: 'translateY(-2px)',
    }
  },
  backButton: {
    backgroundColor: '#757575',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    '&:hover': {
      backgroundColor: '#616161',
      transform: 'translateY(-2px)',
    }
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '25px',
    fontSize: '1.1rem',
  },
  dressPreview: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  dressImage: {
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  dressName: {
    marginTop: '1rem',
    color: '#333',
    fontSize: '1.1rem',
  },
  instructions: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    '& h3': {
      color: '#333',
      marginBottom: '1rem',
    },
    '& ol': {
      paddingLeft: '1.5rem',
      '& li': {
        marginBottom: '0.5rem',
        color: '#666',
      }
    }
  }
};

export default VisualTryOn;

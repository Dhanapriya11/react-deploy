// import React, { useRef, useEffect, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";

// const VisualTryOn = () => {
//   const [cameraActive, setCameraActive] = useState(false);
//   const videoRef = useRef(null);
//   const [pose, setPose] = useState(null);

//   // Load 3D dress model
//   const DressModel = () => {
//     const { scene } = useGLTF("C:/Users/Dhanapriya/OneDrive/Desktop/study/virtual-try-on/public/white_grace.glb"); // Load 3D dress model
//     return <primitive object={scene} position={[0, -1, 0]} scale={1.2} />;
//   };

//   useEffect(() => {
//     if (cameraActive) {
//       startCamera();
//       loadPoseModel();
//     }
//   }, [cameraActive]);

//   // Start Camera
//   const startCamera = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = stream;
//     videoRef.current.play();
//   };

//   // Load Pose Detection Model
//   const loadPoseModel = async () => {
//     const model = posedetection.SupportedModels.BlazePose;
//     const detector = await posedetection.createDetector(model);
    
//     const detectPose = async () => {
//       if (videoRef.current) {
//         const poses = await detector.estimatePoses(videoRef.current);
//         if (poses.length > 0) {
//           setPose(poses[0]); // Store detected pose
//         }
//       }
//       requestAnimationFrame(detectPose);
//     };
//     detectPose();
//   };

//   return (
//     <div className="relative">
//       {!cameraActive ? (
//         <button
//           onClick={() => setCameraActive(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Start Visual Try-On
//         </button>
//       ) : (
//         <div className="relative">
//           <video ref={videoRef} className="w-full h-auto" />
          
//           {/* Overlay 3D Model */}
//           {pose && (
//             <Canvas className="absolute top-0 left-0 w-full h-full">
//               <ambientLight intensity={0.5} />
//               <DressModel />
//             </Canvas>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VisualTryOn;

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from '@/components/Model';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

function CameraController({ targetPosition }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(...targetPosition));
  const currentPos = useRef(camera.position.clone());

  useFrame(() => {
    const delta = 0.05;
    currentPos.current.lerp(target.current, delta);
    camera.position.copy(currentPos.current);

    const distance = currentPos.current.distanceTo(target.current);
    if (distance < 0.01) {
      currentPos.current.copy(target.current);
    }

    camera.lookAt(0, 0, 0);
  }, [targetPosition]);

  useEffect(() => {
    target.current.set(...targetPosition);
  }, [targetPosition]);

  return null;
}

export default function Home() {
  const [cameraPosition, setCameraPosition] = useState([2, 1, 2]);

  const handleCameraChange = (position) => {  
    setCameraPosition(position);
  };

  return (
    <div className="w-screen h-screen bg-gray-600">
      <div className='h-[5%] flex justify-between'>
        <div className="h-full flex px-8 py-2 justify-between w-1/4">
          <button
            className="bg-gray-700 py-1 px-2 rounded-sm text-white hover:bg-gray-500"
            onClick={() => handleCameraChange([2, 1, 2])}
          >
            Vinkel 1
          </button>
          <button
            className="bg-gray-700 py-1 px-2 rounded-sm text-white hover:bg-gray-500"
            onClick={() => handleCameraChange([-3.5, 0.7 , 1])}
          >
            Vinkel 2
          </button>
          <button
            className="bg-gray-700 py-1 px-2 rounded-sm text-white hover:bg-gray-500"
            onClick={() => handleCameraChange([2, 2, 4])}
          >
            Vinkel 3
          </button>
          <button
            className="bg-gray-700 py-1 px-2 rounded-sm text-white hover:bg-gray-500"
            onClick={() => handleCameraChange([-4,2,2])}
          >
            Vinkel 4
          </button>
          <button
            className="bg-gray-700 py-1 px-2 rounded-sm text-white hover:bg-gray-500"
            onClick={() => handleCameraChange([-2, 1, -3])}
          >
            Vinkel 5
          </button>
        </div>
        <div className='h-full flex px-8 py-2 w-1/4 justify-end'>
          <button className="bg-gray-700 py-1 px-2 rounded-sm text-white hover:bg-gray-500 mr-3">BMW</button>
          <button className="bg-gray-700 py-1 px-2 rounded-sm text-white hover:bg-gray-500">Mclaren f1</button>
        </div>
      </div>
      <div className="h-[95%]">
        <Canvas camera={{ position: cameraPosition, fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Model />
          <OrbitControls
            enableZoom={true}
            maxDistance={4}
            minDistance={2}
            target={[0, 0, 0]}
          />
          <Environment preset="sunset" />
          <CameraController targetPosition={cameraPosition} />
        </Canvas>
      </div>
    </div>
  );
}

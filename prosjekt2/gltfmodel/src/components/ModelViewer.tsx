import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, SpotLight, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

interface ModelViewerProps {
  modelUrl: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  const { scene } = useLoader(GLTFLoader, modelUrl);

  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <primitive object={scene} />
      </Suspense>

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default ModelViewer;

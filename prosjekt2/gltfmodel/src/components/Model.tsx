import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ model }) {
  let modelPath;

  if (model === 'bmw') {
    modelPath = '/bmw/scene.gltf';
  } else if (model === 'mclaren') {
    modelPath = '/Mclaren f1/scene.gltf';
  }

  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <primitive object={gltf.scene} scale={0.5} />
  );
}

export default Model;

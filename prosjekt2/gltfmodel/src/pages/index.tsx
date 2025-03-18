import ModelViewer from '@/components/ModelViewer';

const Home: React.FC = () => {
  const modelUrl = '/bmw/scene.gltf';

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ModelViewer modelUrl={modelUrl} />
    </div>
  );
};

export default Home;

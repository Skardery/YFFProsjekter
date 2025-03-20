import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useRef } from 'react'

function Model() {
  const gltf = useLoader(GLTFLoader, '/bmw/scene.gltf')

  return (
    <primitive object={gltf.scene} scale={0.5} />
  )
}

export default Model

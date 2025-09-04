import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productApi";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url)
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(ref.current)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    // Center the model
    ref.current.position.sub(center)

    // Adjust camera distance
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = 45 // match your camera fov
    const cameraZ = maxDim / (2 * Math.tan((fov * Math.PI) / 360))
    ref.current.parent.position.set(0, 0, 0) // reset parent pos

    // Access camera via Drei's `useThree`
    const { camera, controls } = ref.current.parent.__r3f
    if (camera) {
      camera.position.set(0, 0, cameraZ * 1.5) // add some margin
      camera.near = cameraZ / 100
      camera.far = cameraZ * 100
      camera.updateProjectionMatrix()
    }

    if (controls) {
      controls.target.copy(center)
      controls.update()
    }
  }, [scene])

  return <primitive ref={ref} object={scene} />
}


export default function Viewer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Viewer */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="w-full h-[500px]">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} />
              <OrbitControls enableZoom />
              <Model url={product.model_url} />
            </Canvas>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2 text-lg">{product.category}</p>
          <p className="text-indigo-600 font-bold text-2xl mb-4">${product.price}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import SceneManager from './SceneManager'
import SpaceScene from "./scenes/SpaceScene";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

export default function App() {

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Canvas className='bg-black h-screen' camera={{ fov: 70 }}>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Routes>
              <Route path="/project/:sceneId" element={<SceneManager />} />
              <Route path="/" element={<SpaceScene />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  )
}
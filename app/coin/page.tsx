'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useCylinder, usePlane, Triplet } from '@react-three/cannon';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// Main Canvas Scene
export default function Page() {
  return (
    <div className="h-dvh w-dvw">
      <CoinflipApp />
    </div>
  );
}

// chatgpt

// Coin component with physics
const Coin: React.FC = () => {
  const textureTop = useTexture('/baphomet.jpg');
  const textureBottom = useTexture('/blueeyeswhitedragon.webp');
  // Apply physics to the coin (cylinder)
  const [coinRef, api] = useCylinder(() => ({
    mass: 0.01,
    position: [0, 0, 0] as Triplet,
    args: [0.2, 0.2, 0.03, 32], // Cylinder shape for the coin
    rotation: [Math.PI, 0, 0] as Triplet, // Initial rotation
  }));

  const flipCoin = () => {
    // setOutcome(null); // Reset outcome when flipping the coin
    // Reset the position and apply forces
    console.log('flipCoin');
    // api.position.set(0, 0, 0); // Reset coin's position
    api.velocity.set(0, 0, 8); // Apply upward velocity to simulate flip
    const min = 15;
    const max = 35;
    // Math.floor(Math.random() * (max - min + 1) + min)
    api.angularVelocity.set(
      Math.floor(Math.random() * (max - min + 1) + min) * (Math.random() < 0.5 ? -1 : 1),
      Math.floor(Math.random() * (max - min + 1) + min) * (Math.random() < 0.5 ? -1 : 1), // Randomize spin on Y axis
      0, // Randomize spin on Z axis
    );
  };

  // useEffect(() => {
  //   // Subscribe to the coin's rotation and determine the outcome after it lands
  //   const unsubscribe = api.rotation.subscribe(([x]) => {
  //     // Determine the outcome based on the X rotation (coin flip axis)
  //     const newOutcome = x % (2 * Math.PI) < Math.PI ? 'Heads' : 'Tails';
  //     setOutcome(newOutcome);
  //   });

  //   return () => unsubscribe(); // Clean up the subscription on unmount
  // }, [api.rotation]);

  return (
    <>
      {/* Coin Mesh */}
      <mesh ref={coinRef} receiveShadow castShadow onClick={() => flipCoin()}>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 32]} />
        <meshStandardMaterial color="#ff44ff" attach="material-0" />
        <meshStandardMaterial map={textureTop} attach="material-1" />
        <meshStandardMaterial map={textureBottom} attach="material-2" />
      </mesh>

      {/* Show the outcome after the flip
      {outcome && (
        <mesh position={[0, 0, 0]}>
          <meshBasicMaterial color="white" />
        </mesh>
      )} */}
    </>
  );
};

// Ground component with physics
const Ground: React.FC = () => {
  const [ref] = usePlane(() => ({
    mass: 10,
    rotation: [0, 0, 0] as Triplet, // Flat ground
    position: [0, 0, 0] as Triplet,
    type: 'Static',
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      {/* <shadowMaterial opacity={0.3} />
       */}
      <meshStandardMaterial side={THREE.FrontSide} />
    </mesh>
  );
};

const CoinflipApp = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={1} castShadow />
      <Physics gravity={[0, 0, -9.8]}>
        {/* Simulate Earth's gravity */}
        <Coin />
        <Ground />
      </Physics>
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

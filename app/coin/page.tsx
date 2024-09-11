'use client';

import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
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

//  we can use a random start rotation for the coin to make it more random

// Coin component with physics
const Coin: React.FC = () => {
  const textureTop = useTexture('/baphomet.jpg');
  const textureBottom = useTexture('/blueeyeswhitedragon.webp');
  // Apply physics to the coin (cylinder)
  const coinSize = 0.3;
  const [coinRef, api] = useCylinder(() => ({
    mass: 0.01,
    position: [0, 0, 0] as Triplet,
    args: [coinSize, coinSize, 0.03, 32], // Cylinder shape for the coin
    rotation: [Math.PI / 2, 0, 0] as Triplet, // Initial rotation
  }));

  const { viewport } = useThree();

  // Create invisible "walls" for the screen bounds
  const [leftWallRef] = usePlane(() => ({
    position: [-viewport.width / 2, 0, 0],
    rotation: [0, Math.PI / 2, 0], // rotate the plane to face the coin
  }));

  const [rightWallRef] = usePlane(() => ({
    position: [viewport.width / 2, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
  }));

  const [topWallRef] = usePlane(() => ({
    position: [0, viewport.height / 2, 0],
    rotation: [Math.PI / 2, 0, 0], // rotate the plane to face the coin from the top
  }));

  const [bottomWallRef] = usePlane(() => ({
    position: [0, -viewport.height / 2, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  React.useEffect(() => {
    // You can dynamically update walls if the window resizes
  }, [viewport.width, viewport.height]);

  const flipCoin = () => {
    console.log('flipCoin');
    api.position.set(0, 0, 0); // Reset coin's position
    api.velocity.set(0, 0, randomFloat(7, 10)); // Apply upward velocity to simulate flip
    api.angularVelocity.set(
      randomFloat(15, 35) * (Math.random() < 0.5 ? -1 : 1), // Randomize spin on X axis
      randomFloat(15, 35) * (Math.random() < 0.5 ? -1 : 1), // Randomize spin on Y axis
      0,
    );
  };

  return (
    <group>
      {/* Coin Mesh */}
      <mesh ref={coinRef} receiveShadow castShadow onClick={() => flipCoin()}>
        <cylinderGeometry args={[coinSize, coinSize, 0.03, 32]} />
        <meshStandardMaterial color="#ff44ff" attach="material-0" />
        <meshStandardMaterial map={textureTop} attach="material-1" />
        <meshStandardMaterial map={textureBottom} attach="material-2" />
      </mesh>

      <mesh ref={leftWallRef} visible={false} />
      <mesh ref={rightWallRef} visible={false} />
      <mesh ref={topWallRef} visible={false} />
      <mesh ref={bottomWallRef} visible={false} />
    </group>
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

function randomFloat(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

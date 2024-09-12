'use client';

import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, useCylinder, usePlane, Triplet } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import { IconButton } from '../components/Button';
import Image from 'next/image';
import { Mesh } from 'three';

export default function Page() {
  const [flipCoin, setFlipCoin] = React.useState(false);

  return (
    <div className="relative h-dvh w-dvw">
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-b from-green-200 to-green-500">
        {flipCoin ? (
          <div className="absolute left-0 top-0 h-full w-full">
            <CoinFlip setFlipCoin={setFlipCoin} />
          </div>
        ) : (
          <IconButton onClick={() => setFlipCoin(true)}>
            <div className="">
              <Image src="/AnubisCoin_Front.webp" width="1000" height="1000" alt="Coin with Anubis displayed" />
            </div>
          </IconButton>
        )}
      </div>
    </div>
  );
}

const Coin: React.FC = () => {
  const textureFront = useTexture('/AnubisCoin_Front.webp');
  const textureBack = useTexture('/AnubisCoin_Back.webp');
  const coinSize = 0.4;

  const [coinRef, api] = useCylinder<Mesh>(() => ({
    mass: 0.1,
    position: [0, 0, 0] as Triplet,
    args: [coinSize, coinSize, 0.04, 32], // Cylinder shape for the coin
    rotation: [((Math.random() < 0.5 ? -1 : 1) * Math.PI) / 2, Math.PI / 2, 0] as Triplet, // Initial rotation
  }));

  const flipCoin = React.useCallback(() => {
    const randomSpinX = randomFloat(2.5, 7) * (Math.random() < 0.5 ? -1 : 1);
    const randomSpinY = randomFloat(2.5, 7) * (Math.random() < 0.5 ? -1 : 1);
    const randomSpinZ = randomFloat(0.5, 1.5) * (Math.random() < 0.5 ? -1 : 1);
    const zImpulse = randomFloat(0.85, 1.0);
    api.applyImpulse([0, 0, zImpulse], [0, 0, 0]);
    api.applyTorque([randomSpinX, randomSpinY, randomSpinZ]);
  }, [api]);

  const { viewport } = useThree();

  // Create invisible "walls" for the screen bounds
  const [leftWallRef] = usePlane<Mesh>(() => ({
    position: [-viewport.width / 2, 0, 0],
    rotation: [0, Math.PI / 2, 0], // rotate the plane to face the coin
  }));

  const [rightWallRef] = usePlane<Mesh>(() => ({
    position: [viewport.width / 2, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
  }));

  const [topWallRef] = usePlane<Mesh>(() => ({
    position: [0, viewport.height / 2, 0],
    rotation: [Math.PI / 2, 0, 0], // rotate the plane to face the coin from the top
  }));

  const [bottomWallRef] = usePlane<Mesh>(() => ({
    position: [0, -viewport.height / 2, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  React.useEffect(() => {
    // You can dynamically update walls if the window resizes
  }, [viewport.width, viewport.height]);

  React.useEffect(() => {
    flipCoin();
  }, [flipCoin]);

  return (
    <group>
      {/* Coin Mesh */}
      <mesh
        ref={coinRef}
        receiveShadow
        castShadow
        onClick={(event) => {
          flipCoin();
          event.stopPropagation();
        }}
      >
        <cylinderGeometry args={[coinSize, coinSize, 0.04, 32]} />
        <meshStandardMaterial color="#68563f" attach="material-0" />
        <meshStandardMaterial map={textureFront} attach="material-1" />
        <meshStandardMaterial map={textureBack} attach="material-2" />
      </mesh>

      <mesh ref={leftWallRef} visible={false} />
      <mesh ref={rightWallRef} visible={false} />
      <mesh ref={topWallRef} visible={false} />
      <mesh ref={bottomWallRef} visible={false} />
    </group>
  );
};

// Ground component with physics
const Ground = ({ onClick }: { onClick: () => void }) => {
  const [ref] = usePlane<Mesh>(() => ({
    mass: 10,
    rotation: [0, 0, 0] as Triplet,
    position: [0, 0, -0.5] as Triplet,
    type: 'Static',
  }));

  return (
    <mesh ref={ref} receiveShadow onClick={onClick}>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial transparent opacity={0.3} />
    </mesh>
  );
};

const CoinFlip = ({ setFlipCoin }: { setFlipCoin: (active: boolean) => void }) => {
  return (
    <Canvas shadows gl={{ alpha: true }} className="h-dvh w-dvw border-none bg-transparent text-transparent">
      <ambientLight intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={1} castShadow />
      <Physics gravity={[0, 0, -9.8]}>
        {/* Simulate Earth's gravity */}
        <Coin />
        <Ground onClick={() => setFlipCoin(false)} />
      </Physics>
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

function randomFloat(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(4));
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getQrMatrix } from "@/lib/qr";
import { BurgerPlate, Drink, Phone, QrCard, TableTop } from "./parts";

interface SceneProps {
  /** Lighter scene for phones: no shadows, lower pixel ratio. */
  simple?: boolean;
  /** Disable parallax and idle motion. */
  reducedMotion?: boolean;
  paused?: boolean;
  tableNumber?: number;
  className?: string;
}

const QR_TARGET = "https://qrserve.app/restaurant/demo/table/5";

function Rig({ children, reducedMotion }: { children: React.ReactNode; reducedMotion?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.lookAt(0, -0.25, 0);
  }, [camera]);

  // Track the pointer across the whole window so the parallax feels alive
  // even when the cursor is over the headline.
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const idle = reducedMotion ? 0 : Math.sin(t * 0.45) * 0.05;
    const targetY = -0.38 + pointer.current.x * 0.22 + idle;
    const targetX = 0.02 + pointer.current.y * 0.08;
    const k = 1 - Math.exp(-delta * 3.2);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
  });

  const scale = THREE.MathUtils.clamp(Math.min(size.width / (size.width < 640 ? 500 : 800), size.height / 700), 0.45, 1.1);

  return (
    <group scale={scale} position={[0, 0, 0]}>
      <group ref={group}>{children}</group>
    </group>
  );
}

function Content({ simple, reducedMotion, tableNumber = 5 }: Pick<SceneProps, "simple" | "reducedMotion" | "tableNumber">) {
  const matrix = useMemo(() => getQrMatrix(QR_TARGET), []);
  const floatSpeed = reducedMotion ? 0 : 1.4;

  return (
    <Rig reducedMotion={reducedMotion}>
      <TableTop />
      <QrCard matrix={matrix} tableNumber={tableNumber} />

      <group position={[-1.15, 0, 1.0]} rotation={[0, 0.5, 0]}>
        <BurgerPlate />
      </group>
      <group position={[0.55, 0, 1.5]}>
        <Drink />
      </group>

      <Float speed={floatSpeed} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[0, 0.16]}>
        <group position={[1.4, 1.02, 0.55]} rotation={[-0.1, -0.5, 0.04]}>
          <Phone />
        </group>
      </Float>

      {!simple && (
        <ContactShadows position={[0, -1.6, 0]} opacity={0.28} scale={9} blur={2.8} far={3.2} frames={1} resolution={512} />
      )}
    </Rig>
  );
}

export default function QRScene({ simple, reducedMotion, paused, tableNumber, className }: SceneProps) {
  return (
    <Canvas
      className={className}
      shadows={!simple}
      dpr={simple ? [1, 1.5] : [1, 2]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 4.6, 9.4], fov: 32, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.4}
        castShadow={!simple}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-4, 2.5, -2]} intensity={14} color="#ffd84d" />

      {/* Offline studio lighting, so no HDR is fetched from a CDN. */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 6, 4]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#fff2b0" />
        <Lightformer form="rect" intensity={1} position={[6, 2, 1]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
      </Environment>

      <Content simple={simple} reducedMotion={reducedMotion} tableNumber={tableNumber} />
    </Canvas>
  );
}

"use client";

import { RoundedBox } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  CARD_H,
  CARD_W,
  PHONE_SCREEN_H,
  PHONE_SCREEN_W,
  QR_SIZE,
  createCardTexture,
  createPhoneTexture,
} from "./textures";

export const BRAND = {
  yellow: "#ffc700",
  red: "#e3261c",
  black: "#0a0a0a",
  cream: "#fff6d6",
};

/** Round bistro table: white top, black edge band, slim stem and base. */
export function TableTop() {
  return (
    <group>
      <mesh position={[0, -0.07, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.3, 2.3, 0.14, 72]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.17, 0]} castShadow>
        <cylinderGeometry args={[2.36, 2.36, 0.08, 72]} />
        <meshStandardMaterial color={BRAND.black} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.85, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 1.3, 32]} />
        <meshStandardMaterial color={BRAND.black} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
        <meshStandardMaterial color={BRAND.red} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.52, 0]} receiveShadow>
        <cylinderGeometry args={[0.9, 1.0, 0.1, 48]} />
        <meshStandardMaterial color={BRAND.black} roughness={0.35} metalness={0.3} />
      </mesh>
    </group>
  );
}

/** Table tent card carrying a real 3D QR code built from instanced modules. */
export function QrCard({ matrix, tableNumber }: { matrix: boolean[][]; tableNumber: number }) {
  const texture = useMemo(() => createCardTexture(tableNumber), [tableNumber]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const cell = QR_SIZE / matrix.length;
  const count = useMemo(() => matrix.reduce((sum, row) => sum + row.filter(Boolean).length, 0), [matrix]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    let i = 0;
    matrix.forEach((row, r) =>
      row.forEach((on, c) => {
        if (!on) return;
        m.makeTranslation(-QR_SIZE / 2 + cell * (c + 0.5), QR_SIZE / 2 - cell * (r + 0.5), 0);
        mesh.setMatrixAt(i++, m);
      }),
    );
    mesh.instanceMatrix.needsUpdate = true;
  }, [matrix, cell]);

  return (
    <group position={[-0.25, CARD_H / 2 + 0.06, -0.55]} rotation={[-0.14, 0, 0]}>
      <RoundedBox args={[CARD_W, CARD_H, 0.1]} radius={0.09} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.3}
          roughness={0.6}
          transparent
        />
      </mesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, 0.07]} castShadow>
        <boxGeometry args={[cell * 0.96, cell * 0.96, 0.06]} />
        <meshStandardMaterial color="#000000" roughness={0.4} metalness={0.1} />
      </instancedMesh>
      {/* Support leg */}
      <mesh position={[0, -0.08, -0.42]} rotation={[0.52, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 1.5, 0.05]} />
        <meshStandardMaterial color="#f1efe6" roughness={0.6} />
      </mesh>
    </group>
  );
}

/** Smartphone showing a miniature customer menu. */
export function Phone() {
  const texture = useMemo(() => createPhoneTexture(), []);
  return (
    <group>
      <RoundedBox args={[0.95, 1.9, 0.09]} radius={0.14} smoothness={4} castShadow>
        <meshStandardMaterial color="#0a0a0a" roughness={0.25} metalness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0, 0.047]}>
        <planeGeometry args={[PHONE_SCREEN_W, PHONE_SCREEN_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

const SESAME = Array.from({ length: 9 }, (_, i) => {
  const phi = i * 2.4;
  const theta = 0.25 + (i % 3) * 0.28;
  return { phi, theta };
});

/** Stylised burger on a plate. */
export function BurgerPlate() {
  const bun = "#e8a23b";
  return (
    <group>
      <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.82, 0.7, 0.05, 48]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.025, 12, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} />
      </mesh>
      <group position={[0, 0.05, 0]}>
        <mesh position={[0, 0.07, 0]} castShadow>
          <cylinderGeometry args={[0.43, 0.4, 0.14, 40]} />
          <meshStandardMaterial color={bun} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.44, 0.44, 0.12, 40]} />
          <meshStandardMaterial color="#4a2a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.275, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.8, 0.025, 0.8]} />
          <meshStandardMaterial color={BRAND.yellow} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.305, 0]}>
          <cylinderGeometry args={[0.41, 0.41, 0.035, 40]} />
          <meshStandardMaterial color={BRAND.red} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.34, 0]} scale={[1, 0.55, 1]}>
          <torusGeometry args={[0.42, 0.06, 12, 40]} />
          <meshStandardMaterial color="#3fa34d" roughness={0.7} />
        </mesh>
        <group position={[0, 0.36, 0]}>
          <mesh scale={[1, 0.75, 1]} castShadow>
            <sphereGeometry args={[0.46, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={bun} roughness={0.5} />
          </mesh>
          {SESAME.map(({ phi, theta }, i) => (
            <mesh
              key={i}
              position={[
                0.46 * Math.sin(theta) * Math.cos(phi) * 1.01,
                0.46 * Math.cos(theta) * 0.75 * 1.01,
                0.46 * Math.sin(theta) * Math.sin(phi) * 1.01,
              ]}
              scale={[1, 0.5, 1.6]}
              rotation={[0, -phi, 0]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#fff6d6" roughness={0.6} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/** Cold drink with a red straw. */
export function Drink() {
  return (
    <group>
      <mesh position={[0, 0.31, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.19, 0.62, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.28} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[0.215, 0.175, 0.5, 32]} />
        <meshStandardMaterial color="#7a4626" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.525, 0]}>
        <cylinderGeometry args={[0.218, 0.218, 0.03, 32]} />
        <meshStandardMaterial color="#f7e9d2" roughness={0.6} />
      </mesh>
      <mesh position={[0.05, 0.62, 0]} rotation={[0, 0, -0.16]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.72, 12]} />
        <meshStandardMaterial color={BRAND.red} roughness={0.4} />
      </mesh>
    </group>
  );
}

import * as THREE from 'three';
import { Drone } from './drone';

export function createDroneSwarm(scene: THREE.Scene, count: number): Drone[] {
  const drones: Drone[] = [];
  const gridSize = Math.ceil(Math.sqrt(count));
  const spacing = 0.5;
  const offset = (gridSize * spacing) / 2;

  // Create instance geometry and material for better performance
  const geometry = new THREE.SphereGeometry(0.15, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
  });

  for (let i = 0; i < count; i++) {
    const x = (i % gridSize) * spacing - offset;
    const y = Math.floor(i / gridSize) * spacing - offset;
    const z = 0;
    
    const position = new THREE.Vector3(x, y, z);
    const color = new THREE.Color(`hsl(${(i / count) * 360}, 70%, 50%)`);
    const drone = new Drone(position, color, geometry, material.clone());
    
    drones.push(drone);
    scene.add(drone.mesh);
  }

  return drones;
}
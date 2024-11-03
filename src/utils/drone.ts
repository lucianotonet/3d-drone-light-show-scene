import * as THREE from 'three';
import { gsap } from 'gsap';

export class Drone {
  mesh: THREE.Mesh;
  targetPosition: THREE.Vector3;
  initialPosition: THREE.Vector3;

  constructor(
    position: THREE.Vector3,
    color: THREE.Color,
    geometry: THREE.BufferGeometry,
    material: THREE.Material
  ) {
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = color;
    }
    
    this.targetPosition = position.clone();
    this.initialPosition = position.clone();
  }

  update(time: number, index: number) {
    const offset = index * 0.0001;
    this.mesh.position.y += Math.sin(time + offset) * 0.001;
  }

  setTarget(position: THREE.Vector3, duration: number = 1) {
    this.targetPosition.copy(position);
    gsap.to(this.mesh.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration,
      ease: "power2.inOut"
    });
  }

  setColor(color: THREE.Color) {
    if (this.mesh.material instanceof THREE.MeshBasicMaterial) {
      this.mesh.material.color = color;
    }
  }
}
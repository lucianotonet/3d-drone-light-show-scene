import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { Drone } from './drone';

export class DroneAPI {
  private drones: Drone[];
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private initialCameraPosition: {
    position: THREE.Vector3;
    target: THREE.Vector3;
  };

  constructor(
    drones: Drone[],
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    initialCameraPosition: { position: THREE.Vector3; target: THREE.Vector3 }
  ) {
    this.drones = drones;
    this.camera = camera;
    this.controls = controls;
    this.initialCameraPosition = initialCameraPosition;
  }

  update() {
    const time = Date.now() * 0.001;
    this.drones.forEach((drone, i) => drone.update(time, i));
  }

  resetCamera(duration: number = 2) {
    gsap.to(this.camera.position, {
      x: this.initialCameraPosition.position.x,
      y: this.initialCameraPosition.position.y,
      z: this.initialCameraPosition.position.z,
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        this.camera.lookAt(this.initialCameraPosition.target);
      }
    });
    
    gsap.to(this.controls.target, {
      x: this.initialCameraPosition.target.x,
      y: this.initialCameraPosition.target.y,
      z: this.initialCameraPosition.target.z,
      duration,
      ease: "power2.inOut"
    });
  }

  resetFormation(duration: number = 2) {
    this.drones.forEach(drone => {
      drone.setTarget(drone.initialPosition, duration);
    });
  }

  formSphere(radius: number = 10, duration: number = 2) {
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    this.drones.forEach((drone, i) => {
      const y = 1 - (i / (this.drones.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const x = Math.cos(theta) * r * radius;
      const z = Math.sin(theta) * r * radius;
      
      drone.setTarget(new THREE.Vector3(x, y * radius, z), duration);
    });
  }

  formDoubleHelix(radius: number = 10, height: number = 20, duration: number = 2) {
    const turns = 3;
    this.drones.forEach((drone, i) => {
      const angle = (i / this.drones.length) * Math.PI * 2 * turns;
      const y = (i / this.drones.length) * height - height / 2;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      
      drone.setTarget(new THREE.Vector3(x1, y, z1), duration);
    });
  }

  formCube(size: number = 10, duration: number = 2) {
    const edgeCount = Math.cbrt(this.drones.length);
    const spacing = size / edgeCount;
    const offset = size / 2;

    this.drones.forEach((drone, i) => {
      const x = (i % edgeCount) * spacing - offset;
      const y = (Math.floor(i / edgeCount) % edgeCount) * spacing - offset;
      const z = (Math.floor(i / (edgeCount * edgeCount))) * spacing - offset;
      
      drone.setTarget(new THREE.Vector3(x, y, z), duration);
    });
  }

  resetAll(duration: number = 2) {
    this.resetCamera(duration);
    this.resetFormation(duration);
  }
}
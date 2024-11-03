# Drone Light Show Simulator

An interactive 3D drone light show simulator built with Vue 3, Three.js, and GSAP. This application simulates a swarm of 8,000 drones that can form various patterns and formations in a night sky environment.

## Features

- 8,000 individually controlled drones
- Smooth animations and transitions
- Interactive 3D camera controls
- Multiple formation patterns
- Dark sky environment with depth perception
- Responsive design

## Technical Stack

- Vue 3 with TypeScript
- Three.js for 3D rendering
- GSAP for smooth animations
- OrbitControls for camera manipulation

## Camera Controls

The scene supports full 3D navigation:

- **Left Mouse Button**: Rotate the camera around the scene
- **Right Mouse Button**: Pan the camera
- **Mouse Wheel**: Zoom in/out
- **Reset**: Use the API to reset camera to initial position

## API Reference

The DroneShow component exposes several methods for controlling the drone swarm and camera:

### Camera Controls

```typescript
// Reset camera to initial position
droneShow.value.resetCamera(duration: number = 2);
```

### Formation Controls

```typescript
// Reset drones to initial grid formation
droneShow.value.resetFormation(duration: number = 2);

// Form a sphere
droneShow.value.formSphere(radius: number = 10, duration: number = 2);

// Create a double helix pattern
droneShow.value.formDoubleHelix(
  radius: number = 10,
  height: number = 20,
  duration: number = 2
);

// Reset both camera and formation
droneShow.value.resetAll(duration: number = 2);
```

## Usage Example

```vue
<script setup lang="ts">
import DroneShow from './components/DroneShow.vue';
import { ref } from 'vue';

const droneShow = ref();

// Example: Create a sequence of formations
const runSequence = async () => {
  // Form a sphere
  droneShow.value.formSphere(15, 2);
  
  // Wait 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Create a double helix
  droneShow.value.formDoubleHelix(10, 20, 2);
  
  // Wait 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Reset everything
  droneShow.value.resetAll(2);
};
</script>

<template>
  <DroneShow ref="droneShow" />
  <button @click="runSequence">Run Animation Sequence</button>
</template>
```

## Performance Considerations

- The application renders 8,000 drones with individual control
- Uses efficient Three.js rendering techniques
- Implements smooth animations with GSAP
- Responsive to window resizing
- Optimized for modern browsers

## Future Enhancements

- Text formation capabilities
- Custom formation patterns
- Color wave animations
- Multiple swarm behaviors
- Music synchronization
- More complex choreographies

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```
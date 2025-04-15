# Proxima Journey - Development Plan

## Project Overview
The goal is to build a **visual simulation of interstellar travel** to demonstrate space journeys, from visualizations to user interaction (sliders for control), and potentially integrate with backend systems for physics, AI models, and mission planning later on.

---

## Features & Development Steps

### 1. **Initialize Project Structure**
- ✅ Set up a Next.js project with TypeScript.
- ✅ Use React Three Fiber (`@react-three/fiber`) for 3D rendering.
- ✅ Create basic layout with **`SimulationCanvas.tsx`** for the 3D view.
- ✅ Implement a simple moving object (ship) and stars background.

---

### 2. **Basic 3D Scene Setup**
- ✅ Create a **starfield** using `Stars` from `@react-three/drei`.
- ✅ Create a **simple moving ship** (cyan sphere) in the scene.
- ✅ Set up **camera movement** and basic rendering with `OrbitControls`.

---

### 3. **Add Camera Movement**
- ✅ Animate the camera movement so that it feels like the ship is traveling through space.
  - Ship moves forward.
  - Adjust the scene to give a sense of scale (depth, stars).
  - Implement a manual camera control button icon, to let the user move around the scene if they want to. 
  
---

### 4. **Add Sliders for Control**
- 🟩 Add **speed, distance, and travel time sliders**:
  - Control the **ship’s movement** and **speed**.
  - Set the **destination** and **total journey time**.
  - Change the **camera speed** based on user input.
  - Make the camera control automatic when the sliders are set by the user and when they click to start the journey.(Might need to move this sub-point to a different parent-point in future)

---

### 5. **Space Warp Effects**
- 🟩 Add **motion blur or streaks** to simulate faster-than-light travel (e.g., hyperspace).
- 🟩 Implement a **camera motion effect** to show dramatic speed changes.
  
---

### 6. **Add Destination (Star) and Planets**
- 🟩 Add a **distant star (Proxima Centauri)** or planet as a destination.
- 🟩 Visualize **distance** between the ship and the target.
- 🟩 Show **progress** toward the destination as the user adjusts speed or time.

---

### 7. **Backend (Optional for Later)**
- 🟩 Integrate **Python backend** for more realistic space physics.
- 🟩 Plan for **AI models** to simulate mission strategies, failure detection, or planning.
- 🟩 Store user progress and settings in **Firestore** or a similar database.
  
---

### 8. **Future Enhancements**
- 🟩 Add **multiple ships** or **different spacecrafts**.
- 🟩 Implement **dynamic star systems** and **travel to other stars**.
- 🟩 Implement **simulation pauses** and **time dilation** for deeper educational purposes.

---

## Status

### ✅ Done:
- Initial project setup and dependencies.
- Created basic 3D scene with a moving object and stars.

### 🔲 Next:
- Add control sliders for speed, distance, and time.
- Add camera effects and smoother animations.

---

## Notes:
- The project will be built step-by-step, starting with visual effects and later integrating physics models.
- Focus on keeping the UI clean and intuitive, with sliders to control the simulation.
- Use educational aspects to explain space travel and related concepts in a simple manner.

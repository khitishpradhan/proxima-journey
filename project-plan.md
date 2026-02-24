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
  - ✅ Ship moves forward.
  - ✅ Adjust the scene to give a sense of scale (depth, stars).
  - ✅ Implement a manual camera control button icon, to let the user move around the scene if they want to. 
  
---

### 4. <strike>**Add Sliders for Control**</strike> **Destination, Travel Time and Simulation** 
- ✅ Add **Destination** Selector (dropdown), default to Proxima Centauri(4.246 light-years).
  - ✅ Add a **Speed Slider** (% of speed of light) .
    - ✅ Range from 1% to 99.9%.
  - ✅ Automatically **calculate travel time** based on the speed and destination.
  - ✅ Define and Add a **Simulated Time Scale**.
    - Eg.  **8.493 years real travel → 30 seconds of animation**
    - ✅ UI shows **simulated year counter** updating in real time.
    - ✅ UI shows **real year counter** updating in real time.
    - ✅ UI shows **real time counter** updating in real time. (animation time)
  - ✅ Add **Star Journey** button that starts the simulation of the space travel(Only created a placeholder function with basic setup, for simulating we need 2 points start(earth) and destination(proxima)).
  - ✅ **Auto Camera mode activates** whenever the journey starts.

---

### 5. **Space Warp Effects**
- Add **motion blur or streaks** to simulate faster-than-light travel (e.g., hyperspace).
- Implement a **camera motion effect** to show dramatic speed changes.
  
---

### 6. **Add Destination (Star) and Planets**
- 🟩 Add a **distant star (Proxima Centauri)** or planet as a destination.
  - Add Earth, Proxima Centauri, and Earth's Sun destination points.
  - Add 3D models for them.
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

## BrainStorming and Notes by/for self

**These are just brainstorming notes, somethings might not even make sense here, these are just things to pique the curiosity of myself and future contributors**

🔮 Simulation Enhancements :

- ⏯️ Pause/Resume simulation
- ⚙️ User-adjustable time scale (e.g., speed up/down simulation)
- 🌀 Add star distortion / warp effects at higher speeds
- 🕒 Relativity effects (time dilation UI, like “1 year for ship = X years for Earth”)
- 🌍 Earth clock vs ship clock
- Smooth fade-out after journey completion.
- Add a timeline or progress bar.
- Let users speed up/down the sim (e.g., 2x, 4x).

🧪 Destination System🪐 Add more destination objects with :
- Distance
- Image
- Description
- Real-world metadata

🌍 Future Plans only for Earth (Little Ambitious ones) :
- Integrating  Google Earth, or Map view when a user pin points on the Earth.
- View of a Launch Simulation with location specific POV, with information about each stages.
- View of Sun(location specific POV)

🌌 Future Plans for other planets :
- Creating Solar system with SUN, planets and moons(later stage.)
  - Planets being in the relative position to the SUN, according to close to real-time data.
- Having planets and moons as destinations.

## Status

### ✅ Done:
- Initial project setup and dependencies.
- Created basic 3D scene with a moving object and stars.
- Camera Movement, Automatic(w.r.t ship), Manual(Free Roam).
- Creating low poly 3D model of our Solar System.
- Add camera effects and smoother animations.(Focus)

### 🔲 Next:
- Add Destination (Star) and Planets.
- Enhance Sun Quality. (Shaders)
- Enhance Earth Quality
- Space Warp Effects.

---

## Notes:
- The project will be built step-by-step, starting with visual effects and later integrating physics models.
- Focus on keeping the UI clean and intuitive, with sliders to control the simulation.
- Use educational aspects to explain space travel and related concepts in a simple manner.

# iPhone Duo — Interactive Fluid Foldable Architecture

A faithful, photorealistic interactive web demonstration of the **iPhone Duo** foldable concept, inspired by speculative Apple design leaks, MKBHD concepts, and fluid foldable mechanics.

![iPhone Duo Preview](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)

---

## Key Highlights & Physical Mechanics

### 1. Dual-Panel Hardware & Centering
- **Aerospace-Grade Finishes**: Natural Titanium, Space Black, Silver, and Desert Titanium with metallic edge reflections, antenna bands, action button, and volume toggles.
- **Hinge Axis**: Precision cylindrical titanium hinge spine with mechanical specular reflections and engraved Apple California text.
- **Center-Tracking Offset**: Throughout the fold from 180° to 0°, the container dynamically adjusts horizontal offset so the device remains visually centered at all times without drifting.
- **Fold Direction**: The **LEFT** leaf folds toward the **RIGHT** leaf around the central hinge seam.

### 2. The Signature Inner Screen Animation
- **Stationary Right Side**: Right-side widgets, apps, and dock remain rock-solid sharp, visible, stationary, and un-shifted at all times.
- **Left Content Rise**: While partially open, the left-side content sits lower, partially clipped below the display edge. As the device unfolds to 180°, the left interface smoothly rises into exact alignment with the right display.
- **Continuous Blur & Shading**: The left panel begins softly blurred and dimmed; blur and darkness attached to the left leaf clear gradually as the hinge flattens.
- **Clean Alignment**: At 180°, both panels achieve 1:1 seamless alignment. No diagonal dark stripes or abrupt swaps.
- **Frame-Rate-Independent Timeline**: Driven by a single `requestAnimationFrame` loop with damped lerp physics for ProMotion smoothness.

### 3. Screen Layout & Interactive Apps
- **Left Screen**: Large photo memory widget ("Memories • 1 Year Ago Today"), companion Now Playing Music widget, and upcoming Calendar review widget.
- **Right Screen**: Two compact 2x2 widgets (Cupertino Weather + Apple Fitness Activity Concentric Rings) above a 4-column app grid, framed by a vertical frosted glass dock.
- **7 Fully Functional Apps**:
  1. **Home Screen**: Widgets, 4-column app grid, and vertical dock.
  2. **Photos**: Interactive gallery, memory video playback, and lightbox viewer with favorite toggles.
  3. **Notes**: Rich notes list and editor with persistent state across folding.
  4. **Camera**: Viewfinder, 0.5x/1x/2x/5x zoom toggles, shutter flash, and optional live sensor.
  5. **Settings**: Finish switcher, dynamic wallpapers, dark/light mode, and Duo hardware specifications.
  6. **Split View**: Dual-app multitasking with Notes on the left and Safari on the right.
  7. **StandBy**: 90° halfway fold bedstand mode with giant clock, weather, and ambient red night mode.

---

## Controls & Keyboard Shortcuts

| Shortcut / Control | Action |
|---|---|
| **Space** | Play / Pause continuous folding animation |
| **← / →** | Fine adjustment of hinge angle (±3°) |
| **↓ / ↑** | Step fold toward closed (0°) or open (180°) |
| **1** | Jump to Fully Closed (0°) |
| **2** | Jump to Halfway Flex (90°) |
| **3** | Jump to Fully Open (180°) |
| **F** | Cycle Titanium Finishes |
| **R** | Reset device angle to 180° and front view |
| **L** | Lock / Unlock display |
| **Drag Canvas** | 3D Orbit rotate device in space |
| **?** | Open Keyboard Shortcuts modal |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/<username>/iphone-duo.git
cd iphone-duo

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Disclaimer
*This project is an independent conceptual prototype created for educational and design demonstration purposes. Not an official Apple product.*

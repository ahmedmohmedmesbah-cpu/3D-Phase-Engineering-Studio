# 3D Phase Engineering Studio — 3D Viewer (Free, GitHub Pages)

This folder contains a ready-to-publish website that lets visitors rotate and zoom your 3D models directly in the browser using **Three.js**.

## Quick Start (5–10 minutes)

1) Create a free GitHub account (if you don't have one): https://github.com
2) Create a new repository named exactly: `YOUR-USERNAME.github.io`  
   Example: if your username is `ahmedmesbah`, repo must be `ahmedmesbah.github.io`.
3) Upload these files and folders to the repository root:
   - `index.html`
   - `style.css`
   - `assets/logo.svg`
   - `models/` (keep this folder; put your .glb files inside it)
4) Go to **Settings → Pages → Build and deployment** and set:
   - Source: `Deploy from a branch`
   - Branch: `main` and `/ (root)`
5) Visit `https://YOUR-USERNAME.github.io` in 1–2 minutes.

## How to show your own 3D model

- Export your project from SolidWorks/Blender as **.glb** (recommended) or .gltf.
- Copy your file into the `models/` folder and rename it to **project.glb**.  
- Refresh the website. Your model will load.
- File too big? Aim for 5–30 MB if possible for quick loading (reduce texture resolution, simplify meshes).

## No model yet? Test instantly

- Click **Open local .glb/.gltf** on the top bar and choose any model from your computer.  
  (This does not upload the file anywhere; it only loads in your browser.)  
- If no model is present, a demo cube is shown so you can test the viewer.

## Controls

- Left mouse: rotate
- Right mouse: pan
- Mouse wheel: zoom
- **Reset view** button: frames the current model
- On mobile: one finger to rotate, two fingers to pan/zoom

## Tips for SolidWorks → glTF/GLB

- Export via a tool like Blender (import STEP/IGES → export glTF/GLB), or use a SolidWorks glTF/GLB plugin.
- Keep scale real-world (mm or m). The viewer will frame the object automatically.

## Brand

The site header shows: **3D Phase Engineering Studio**. To change it, edit the text in `<header class="topbar">` inside `index.html`.

## Add more pages later (optional)

- You can add `about.html`, `contact.html`, or a portfolio grid page and link to `index.html` as the 3D viewer.
- For multiple models, keep `models/` and change `loader.load('models/project.glb', ...)` to the filename you want, or create duplicates of this page per model.

## Troubleshooting

- **Page loads but no model:** check the filename is `models/project.glb` and the case matches exactly.
- **Model is very dark or too small:** the viewer auto-frames, but materials from CAD can need tweaking. Try re-exporting, removing unneeded materials, or applying a basic material in Blender before export.
- **Big files load slowly:** simplify mesh, reduce textures, or compress using Draco (advanced).

---

Made for Ahmed to be simple and 100% free.

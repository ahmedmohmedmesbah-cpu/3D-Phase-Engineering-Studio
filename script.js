// Load Three.js modules from CDN
const threeScript = document.createElement('script');
threeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
document.head.appendChild(threeScript);

threeScript.onload = () => {
  const orbitScript = document.createElement('script');
  orbitScript.src = 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';
  document.head.appendChild(orbitScript);

  const gltfScript = document.createElement('script');
  gltfScript.src = 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/GLTFLoader.js';
  document.head.appendChild(gltfScript);

  gltfScript.onload = initSite;
};

function initSite() {
  if (!document.getElementById('project-modal')) {
    document.body.insertAdjacentHTML('beforeend', `
      <dialog id="project-modal" aria-labelledby="modal-title">
        <div class="modal-content">
          <h2 id="modal-title" style="display:none;">Project Details</h2>
          <button class="modal-close" aria-label="Close modal">×</button>
          <div class="modal-tabs">
            <button class="tab-button active" data-tab="3d">3D View</button>
            <button class="tab-button" data-tab="gallery">Photo Gallery</button>
          </div>
          <div class="tab-content active" id="3d-tab">
            <canvas id="three-canvas"></canvas>
          </div>
          <div class="tab-content" id="gallery-tab">
            <div class="photo-gallery"></div>
          </div>
          <p id="project-description"></p>
        </div>
      </dialog>
    `);
  }

  const modal = document.getElementById('project-modal');
  const canvas = document.getElementById('three-canvas');
  const closeBtn = modal.querySelector('.modal-close');
  const tabButtons = modal.querySelectorAll('.tab-button');
  const tabContents = modal.querySelectorAll('.tab-content');
  const description = modal.querySelector('#project-description');

  fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
      const grid = document.querySelector('.projects-grid');
      grid.innerHTML = projects.map(project => `
        <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="View ${project.title}">
          <div class="card-image">
            <img src="${project.cover}" alt="${project.title}" loading="lazy">
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        </article>
      `).join('');
    });

  let scene, camera, renderer, controls;
  function init3DViewer() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1A1A1A);
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
  }

  async function loadModel(modelPath) {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(modelPath);
    scene.add(gltf.scene);
  }

  function loadGallery(project) {
    const gallery = modal.querySelector('.photo-gallery');
    gallery.innerHTML = project.images.map(img => `<img src="${img}" alt="${project.title} image">`).join('');
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(button.dataset.tab + '-tab').classList.add('active');
    });
  });

  document.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (card) openModal(card.dataset.projectId);
  });
  document.addEventListener('keydown', e => {
    const card = e.target.closest('.project-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openModal(card.dataset.projectId);
    }
  });

  async function openModal(projectId) {
    const projects = await (await fetch('data/projects.json')).json();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    description.textContent = project.description;
    modal.showModal();
    if (project.model) {
      init3DViewer();
      await loadModel(project.model);
      tabButtons[0].click();
    }
    if (project.images) loadGallery(project);
    closeBtn.focus();
  }

  closeBtn.addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
}


/* ============================================
   TechX Forum — Clean 3D Neon Grid Background
   Replicating the clean minimal grid aesthetic 
   ============================================ */

(function () {
    'use strict';

    let scene, camera, renderer, particles, clock;
    let mouseX = 0, mouseY = 0;
    let isVisible = true;
    let animationId;

    const CONFIG = {
        gridSize: 30, // Distance across the grid
        step: 1.5, // Distance between points
        cameraZ: 15,
        rotationSpeed: 0.0001,
        colorPrimary: new THREE.Color(0x00D1FF), // Cyan
        colorSecondary: new THREE.Color(0xD100FF), // Magenta
        colorDim: new THREE.Color(0x111122), // Dim gray for base grid
        bgColor: 0x000000 // Pure black
    };

    function init() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // Check WebGL support
        try {
            const testCanvas = document.createElement('canvas');
            const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
            if (!gl) throw new Error('No WebGL');
        } catch (e) {
            canvas.style.background = '#000000';
            return;
        }

        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(CONFIG.bgColor, 0.04);

        // Camera
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 2, CONFIG.cameraZ);
        camera.lookAt(0, 0, 0);

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: window.devicePixelRatio <= 1,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(CONFIG.bgColor, 1);

        clock = new THREE.Clock();

        createGrid();

        // Events
        window.addEventListener('resize', onResize);
        document.addEventListener('mousemove', onMouseMove);

        // Visibility observer to pause animation when scrolled out of view
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
            if (isVisible && !animationId) animate();
        }, { threshold: 0.1 });
        observer.observe(canvas);

        animate();
    }

    // Creates a texture of a small "+" sign to match the Spline cross grid
    function createCrossTexture() {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = '#ffffff';
        // Draw +
        const center = size / 2;
        const thickness = 4;
        const length = 24;

        // Vertical line
        ctx.fillRect(center - thickness / 2, center - length / 2, thickness, length);
        // Horizontal line
        ctx.fillRect(center - length / 2, center - thickness / 2, length, thickness);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    function createGrid() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];

        // Build a 3D grid of points
        for (let x = -CONFIG.gridSize; x <= CONFIG.gridSize; x += CONFIG.step) {
            for (let y = -CONFIG.gridSize; y <= CONFIG.gridSize; y += CONFIG.step) {
                for (let z = -CONFIG.gridSize; z <= CONFIG.gridSize; z += CONFIG.step) {

                    // Add some organic noise/scatter to the grid so it's not perfectly rigid
                    const px = x + (Math.random() - 0.5) * 0.2;
                    const py = y + (Math.random() - 0.5) * 0.2;
                    const pz = z + (Math.random() - 0.5) * 0.2;

                    // Only place points within a spherical radius to make it look like a field
                    const dist = Math.sqrt(px * px + py * py + pz * pz);
                    if (dist < CONFIG.gridSize) {
                        positions.push(px, py, pz);

                        // Randomly assign colors (mostly dim, some cyan, some magenta)
                        const rand = Math.random();
                        if (rand > 0.98) {
                            colors.push(CONFIG.colorPrimary.r, CONFIG.colorPrimary.g, CONFIG.colorPrimary.b); // Cyan highlight
                        } else if (rand > 0.96) {
                            colors.push(CONFIG.colorSecondary.r, CONFIG.colorSecondary.g, CONFIG.colorSecondary.b); // Magenta highlight
                        } else {
                            colors.push(CONFIG.colorDim.r, CONFIG.colorDim.g, CONFIG.colorDim.b); // Hidden/dim base
                        }
                    }
                }
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            map: createCrossTexture(),
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);
    }

    function animate() {
        if (!isVisible) {
            animationId = null;
            return;
        }
        animationId = requestAnimationFrame(animate);

        const elapsed = clock.getElapsedTime();

        // Smoothly rotate the entire grid field
        if (particles) {
            particles.rotation.y = elapsed * CONFIG.rotationSpeed * 500;
            particles.rotation.z = Math.sin(elapsed * 0.2) * 0.05;

            // Subtle interactive tilt based on mouse position
            particles.rotation.x = (mouseY * 0.0002) + Math.cos(elapsed * 0.1) * 0.05;
        }

        // Camera gentle float
        camera.position.x += (mouseX * 0.005 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.005 - camera.position.y) * 0.05 + Math.sin(elapsed * 0.5) * 0.01;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(e) {
        mouseX = (e.clientX - window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2);
    }

    // Initialize once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

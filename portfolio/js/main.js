// Function to initialize a 3D scene for a project
function initProject(canvasElement) {
    const canvas = canvasElement;
    const imageName = canvas.getAttribute('data-image');
    const imagePath = `../images/${imageName}`; // Adjust path based on folder structure

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 50, 100);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    // Create a cube to represent the project
    const geometry = new THREE.BoxGeometry(40, 40, 40);
    const textureLoader = new THREE.TextureLoader();

    // Load the project image as texture
    textureLoader.load(
        imagePath,
        function (texture) {
            const material = new THREE.MeshLambertMaterial({ map: texture });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
        },
        undefined,
        function (err) {
            console.error(`Error loading texture for ${imageName}:`, err);
        }
    );

    // Handle window resize for each canvas
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }, false);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

// Initialize all project canvases
document.addEventListener('DOMContentLoaded', () => {
    const projectCanvases = document.querySelectorAll('.project-canvas');
    projectCanvases.forEach(canvas => {
        initProject(canvas);
    });
});

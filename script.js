/* --- DASHBOARD & CHAT --- */
function toggleDashboard() {
    document.getElementById('dashboard').classList.toggle('show');
}

function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    if (!input.value.trim()) return;
    const userMsg = document.createElement('p');
    userMsg.textContent = 'You: ' + input.value;
    chatBox.appendChild(userMsg);

    const botMsg = document.createElement('p');
    botMsg.textContent = 'Assistant: Thank you! We will respond shortly.';
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = '';
}

/* --- SERVICE SELECTION & PRICING --- */
const prices = {
    "TikTok followers": 850,
    "TikTok likes": 600,
    "TikTok views": 300,
    "TikTok comments": 1200,
    "Instagram followers": 300,
    "Instagram likes": 150,
    "Instagram views": 150,
    "Instagram comments": 100
};

const customSelect = document.querySelector(".custom-select");
const selectedDiv = customSelect.querySelector(".selected");
const optionsDiv = customSelect.querySelector(".options");
const quantityInput = document.getElementById("quantity");
const priceText = document.getElementById("price");

selectedDiv.addEventListener("click", () => {
    optionsDiv.style.display = optionsDiv.style.display === "flex" ? "none" : "flex";
});

optionsDiv.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
        selectedDiv.textContent = option.dataset.value;
        optionsDiv.style.display = "none";
        updateLogoAndPrice();
    });
});

function changeQty(val) {
    quantityInput.value = Math.max(1, (+quantityInput.value || 0) + val);
    updateLogoAndPrice();
}

function updateLogoAndPrice() {
    const service = selectedDiv.textContent;
    const quantity = +quantityInput.value || 0;
    const total = (quantity / 1000) * prices[service];
    priceText.innerText = `₨ ${total.toFixed(0)}`;

    if (service.startsWith("Instagram")) {
        priceText.classList.add("instagram");
        document.querySelector(".instagram-logo").style.display = "flex";
        document.querySelector(".tiktok-logo").style.display = "none";
    } else {
        priceText.classList.remove("instagram");
        document.querySelector(".instagram-logo").style.display = "none";
        document.querySelector(".tiktok-logo").style.display = "flex";
    }
}

function makeOrder() {
    const service = selectedDiv.textContent;
    const quantity = quantityInput.value;
    const total = (quantity / 1000) * prices[service];
    const msg = `Order: ${service}\nQuantity: ${quantity}\nTotal Price: ₨ ${total.toFixed(0)}`;
    window.location.href = `https://wa.me/923159180748?text=${encodeURIComponent(msg)}`;
}

updateLogoAndPrice();

/* --- THREE.JS BACKGROUND --- */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 5, 300);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '0';
document.body.appendChild(renderer.domElement);

/* Stars */
const starGeo = new THREE.BufferGeometry();
const starCount = 1200;
const starPos = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 200;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0x00ffff, size: 0.15, transparent: true, opacity: 0.6 })
);
scene.add(stars);

/* Neon cube behind panel */
const neonCube = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 1),
    new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, transparent: true, opacity: 0.15 })
);
neonCube.position.set(0, 5, 0);
scene.add(neonCube);

/* Lights */
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const pointLight = new THREE.PointLight(0x00ffff, 2, 50);
pointLight.position.set(0, 10, 20);
scene.add(pointLight);

/* Mouse movement for subtle camera rotation */
let mx = 0, my = 0;
window.addEventListener("mousemove", e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* Animation loop */
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0008;
    neonCube.rotation.y += 0.002;

    scene.rotation.y += mx * 0.002;
    scene.rotation.x += my * 0.002;

    renderer.render(scene, camera);
}
animate();

/* Handle window resize */
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
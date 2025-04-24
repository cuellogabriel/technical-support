// Smooth Scroll para navegación
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});



// Envío de formulario de contacto
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    const mailtoLink = `mailto:robertogabrielcuello@gmail.com?subject=Consulta de ${data.nombre} ${data.apellido}&body=Email: ${data.email}%0D%0ATeléfono: ${data.telefono}%0D%0AConsulta: ${data.mensaje}`;
    window.location.href = mailtoLink;
    
    alert('Tu consulta ha sido enviada correctamente.');
    contactForm.reset();
});

// Ajuste del footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    footer.innerHTML = `
        <div class="footer-container" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(0, 0, 0, 0.0); color: white;">
            <div class="social-icons" style="display: flex; gap: 10px;">
                <a href="#" target="_blank"><img src="../pictures/facebook1.png" alt="Facebook" width="30"></a>
                <a href="#" target="_blank"><img src="../pictures/instagramweb.webp" alt="Instagram" width="30"></a>
            </div>
            <div class="footer-text" style="text-align: center; flex-grow: 1; color : #1eec63; font-size: 30px;">
                © 2025 Clases de Informática y Programación Web
            </div>
            <div class="payment-icons" style="display: flex; gap: 10px;">
                <a href="#" target="_blank"><img src="../pictures/mercadopago1.png" alt="Mercado Pago" width="30"></a>
                <a href="#" target="_blank"><img src="../pictures/cuentadni1.jpg" alt="Cuenta DNI" width="30"></a>
            </div>
        </div>
    `;
});

// Cursor particulas. 
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

let points = [];
let material = new THREE.PointsMaterial({
  color: 0xffcc00,
  size: 0.15,
  transparent: true,
  opacity: 0.9,
});

function addPoint(x, y) {
  const vector = new THREE.Vector3(
    (x / window.innerWidth) * 2 - 1,
    -(y / window.innerHeight) * 2 + 1,
    0
  );
  vector.unproject(camera);
  vector.z = 0;
  points.push(vector);
  if (points.length > 100) points.shift();

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  scene.clear(); // borrar puntos anteriores
  let pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
}

document.addEventListener("mousemove", (e) => {
  addPoint(e.clientX, e.clientY);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let mouse = { x: width / 2, y: height / 2 };
let particles = [];

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function getRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;  // Slightly lower opacity
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;  // Smaller size
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.life = 100;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = getRandomColor();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 1;
    this.opacity -= 0.015;  // Faster fading
    if (this.life <= 0) {
      particles.splice(particles.indexOf(this), 1);
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  let particle = new Particle(mouse.x, mouse.y);
  particles.push(particle);
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  createParticles();
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

gsap.registerPlugin(ScrollTrigger);

// Animación para el ST
gsap.to(".intro-symbol", {
    scale: 15,
    ease: "none",
    scrollTrigger: {
        trigger: ".intro-container",
        start: "top top",
        end: "300%",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
            // Mostrar la siguiente sección dentro de la ST
            if (self.progress > 0.2) {
                document.querySelector(".next-section").classList.add("visible");
            }
            // Mostrar el contenido dentro de la ST
            if (self.progress > 0.5) {
                document.querySelector(".content").classList.add("visible");
            }
            // Escalar el contenido dentro de la ST
            if (self.progress > 0.3) {
                document.querySelector(".info-container").classList.add("visible");
            }
        }
    }
});



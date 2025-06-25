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

// Toggle accordion menu on mobile
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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
            <div class="footer-text" style="text-align: center; flex-grow: 1; color : #1eec63;">
                © 2025 Clases de Informática y Programación Web
            </div>
            <div class="payment-icons" style="display: flex; gap: 10px;">
                <a href="#" target="_blank"><img src="../pictures/mercadopago1.png" alt="Mercado Pago" width="30"></a>
                <a href="#" target="_blank"><img src="../pictures/cuentadni1.jpg" alt="Cuenta DNI" width="30"></a>
            </div>
        </div>
    `;
});

//Efecto de particulas del cursor 
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



// servicios del carousel
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.servicio-item');
  let index = 0;

  function mostrarServicio(i) {
    items.forEach(item => item.classList.remove('activo'));
    items[i].classList.add('activo');
  }

  document.querySelector('.flecha.arriba').addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    mostrarServicio(index);
  });

  document.querySelector('.flecha.abajo').addEventListener('click', () => {
    index = (index + 1) % items.length;
    mostrarServicio(index);
  });

  mostrarServicio(index);
});



// estilos cambiando entre si
 document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    window.location.href = 'versionwhite.html'; // ir a la versión blanco y negro
  });


  //btn-detalle
 const btnDetalles = document.querySelector('.btn-detalles');
const modal = document.getElementById('modal-detalle');
const cerrarModal = document.getElementById('cerrar-modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');

btnDetalles.addEventListener('click', () => {
  const servicioActivo = document.querySelector('.servicio-item.activo');
  const titulo = servicioActivo.querySelector('h3').innerText;
  const descripcion = servicioActivo.getAttribute('data-detalle');

  modalTitulo.textContent = titulo;
  modalDescripcion.textContent = descripcion;

  modal.style.display = 'flex';
});

cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal si se hace click fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

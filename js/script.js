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
  const respuesta = document.getElementById('form-respuesta');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        respuesta.textContent = "✅ Tu consulta fue enviada correctamente.";
        contactForm.reset();
      } else {
        respuesta.textContent = "❌ Ocurrió un error al enviar tu consulta. Probá más tarde.";
        respuesta.style.color = "red";
      }
    } catch (error) {
      respuesta.textContent = "❌ No se pudo enviar el formulario. Revisa tu conexión.";
      respuesta.style.color = "red";
    }
  });

// Ajuste del footer
// Ajuste del footer con modal para Política de Privacidad y Términos
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  footer.innerHTML = `
    <div class="footer-container" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 10px;">
      <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; flex-wrap: wrap;">
        <div class="social-icons">
          <a href="#" target="_blank"><img src="../pictures/facebook1.png" alt="Facebook"></a>
          <a href="#" target="_blank"><img src="../pictures/instagramweb.webp" alt="Instagram"></a>
        </div>
        <div class="footer-text" style="text-align: center; flex-grow: 1; color: #1eec63;">
          &copy; 2025 Servicios de soporte - ayuda y clases particulares. En este 2025 estamos con vos
        </div>
        <div class="payment-icons" style="display: flex; gap: 10px;">
          <a href="#" target="_blank"><img src="../pictures/mercadopago1.png" alt="Mercado Pago" width="30"></a>
          <a href="#" target="_blank"><img src="../pictures/cuentadni1.jpg" alt="Cuenta DNI" width="30"></a>
        </div>
      </div>

      <div style="margin-top: 10px;">
        <button id="legal-toggle" style="background: none; color: #1eec63; border: none; cursor: pointer; text-decoration: underline;">
          Política de Privacidad y Términos
        </button>
      </div>
    </div>

    <!-- Modal para Política de Privacidad y Términos -->
    <div id="legal-modal" style="
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      justify-content: center;
      align-items: center;
      z-index: 9999;
    ">
      <div style="
        background: #222;
        padding: 20px;
        border-radius: 8px;
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        color: white;
        position: relative;
        box-shadow: 0 0 15px rgba(0,0,0,0.8);
        font-size: 14px;
        text-align: left;
      ">
        <button id="legal-close" style="
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 28px;
          color: #1eec63;
          cursor: pointer;
          font-weight: bold;
          line-height: 1;
        ">&times;</button>

        <h3 style="color: #1eec63;">Política de Privacidad</h3>
        <p>En Tech Companion valoramos la privacidad de nuestros visitantes. Este sitio web no utiliza cookies ni tecnologías de rastreo.</p>
        <p>Los datos que usted proporcione a través del formulario de contacto o por mensaje de WhatsApp (como nombre, correo electrónico o número de teléfono) serán utilizados exclusivamente para responder a su consulta o coordinar clases/servicios solicitados. No compartimos esta información con terceros.</p>
        <p>Los pagos pueden realizarse mediante Mercado Pago, Cuenta DNI, transferencia bancaria o en efectivo. No almacenamos información financiera en este sitio.</p>
        <p>Si tiene preguntas sobre esta política o desea que eliminemos sus datos, puede escribirnos a <strong>myceosuport@gmail.com</strong>.</p>

        <h3 style="color: #1eec63; margin-top: 20px;">Términos y Condiciones</h3>
        <p>Tech Companion ofrece clases personalizadas, soporte técnico, desarrollo web y otros servicios relacionados con informática y tecnología. Al contratar un servicio, el usuario acepta los siguientes términos:</p>
        <ul>
          <li>Los pagos pueden realizarse por Mercado Pago, Cuenta DNI, transferencia o efectivo.</li>
          <li>Los servicios no tienen una política de devolución fija, pero en caso de reclamo justificado, se evaluará cada caso para ofrecer una solución adecuada.</li>
          <li>La calidad y duración de cada clase o servicio será acordada previamente con el cliente.</li>
          <li>El contacto puede realizarse por correo electrónico o WhatsApp. Al hacerlo, el usuario acepta que Tech Companion lo contacte para coordinar servicios.</li>
        </ul>
        <p>Ante cualquier duda o reclamo, podés escribirnos a <strong>tu-email@gmail.com</strong>.</p>
      </div>
    </div>
  `;

  // Abrir 
  document.getElementById('legal-toggle').addEventListener('click', () => {
    const modal = document.getElementById('legal-modal');
    modal.style.display = 'flex';
  });

  // Cerrar  X
  document.getElementById('legal-close').addEventListener('click', () => {
    const modal = document.getElementById('legal-modal');
    modal.style.display = 'none';
  });

  // Cerrar modal si clickeo fuera
  document.getElementById('legal-modal').addEventListener('click', (e) => {
    if (e.target.id === 'legal-modal') {
      e.target.style.display = 'none';
    }
  });
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

//presentacion
 const overlay = document.getElementById("introOverlay");
  const sound = document.getElementById("portalSound");

  overlay.addEventListener("click", () => {
    sound.play();
    overlay.classList.add("fadeOut");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 1000); // espera para mostrar el sitio
  });



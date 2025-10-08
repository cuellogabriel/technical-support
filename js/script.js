document.addEventListener('DOMContentLoaded', function() {

  // Toggle accordion menu on mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scroll for nav links
  const navLinksAnchors = document.querySelectorAll('.nav-links a');
  navLinksAnchors.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if(targetElement){
        const yOffset = -150; 
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        console.warn(`No se encontró el elemento con id: ${targetId}`);
      }
    });
  });

  // --- LÓGICA PARA MÚLTIPLES MODALES ---
  // Abrir modales
  document.querySelectorAll('[id^="btn-"]').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.id.replace('btn-', 'modal-');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  });

  // Cerrar modales con el botón 'x'
  document.querySelectorAll('.cerrar-modal').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal-id');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Cerrar modales al hacer clic fuera del contenido
  document.querySelectorAll('.modal-detalle').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Envío de formulario de contacto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const respuesta = document.getElementById('form-respuesta');
    const spinnerContainer = contactForm.querySelector('.spinner-container');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // --- LÓGICA DE VALIDACIÓN INTEGRADA ---
    const campos = {
      nombre: { elemento: contactForm.querySelector('#nombre'), regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/, errorMsg: 'El nombre debe contener solo letras y espacios (mín. 2).' },
      apellido: { elemento: contactForm.querySelector('#apellido'), regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/, errorMsg: 'El apellido debe contener solo letras y espacios (mín. 2).' },
      email: { elemento: contactForm.querySelector('#email'), regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMsg: 'Por favor ingresa un email válido.' },
      telefono: { elemento: contactForm.querySelector('#telefono'), regex: /^\d{8,12}$/, errorMsg: 'El teléfono debe tener entre 8 y 12 dígitos.' },
      mensaje: { elemento: contactForm.querySelector('#mensaje'), regex: /[\s\S]{10,}/, errorMsg: 'El mensaje debe tener al menos 10 caracteres.' },
    };

    for (const key in campos) {
      let campo = campos[key];
      let errorElem = document.createElement('div');
      errorElem.className = 'error-message';
      errorElem.style.display = 'none';
      campo.elemento.insertAdjacentElement('afterend', errorElem);
      campo.errorElem = errorElem;
    }

    function validarCampo(campo) {
      const val = campo.elemento.value.trim();
      if (!campo.regex.test(val)) {
        campo.errorElem.textContent = campo.errorMsg;
        campo.errorElem.style.display = 'block';
        return false;
      } else {
        campo.errorElem.style.display = 'none';
        return true;
      }
    }

    function validarFormulario() {
      let esValido = true;
      for (const key in campos) {
        if (!validarCampo(campos[key])) esValido = false;
      }
      return esValido;
    }

    contactForm.addEventListener('input', () => {
      submitButton.disabled = !validarFormulario();
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validarFormulario()) {
        respuesta.textContent = 'Por favor corrige los errores antes de enviar.';
        respuesta.style.color = 'red';
        return;
      }

      submitButton.style.display = 'none';
      spinnerContainer.style.display = 'flex';
      respuesta.textContent = '';

      try {
        const formData = new FormData(contactForm);
        const res = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          respuesta.textContent = "✅ Tu consulta fue enviada correctamente.";
          respuesta.style.color = "green";
          contactForm.reset();
          submitButton.disabled = true;
          for (const key in campos) {
            campos[key].errorElem.style.display = 'none';
          }
        } else {
          respuesta.textContent = "❌ Ocurrió un error al enviar tu consulta. Probá más tarde.";
          respuesta.style.color = "red";
        }
      } catch (error) {
        respuesta.textContent = "❌ No se pudo enviar el formulario. Revisa tu conexión.";
        respuesta.style.color = "red";
      } finally {
        submitButton.style.display = 'block';
        spinnerContainer.style.display = 'none';
      }
    });

    submitButton.disabled = true; // Deshabilitar al inicio
  }

    // --- FOOTER DINÁMICO Y MODALES ---
    const footer = document.querySelector('footer');
  footer.innerHTML = `
    <div class="footer-container">
      <div class="social-icons">
        <a href="https://www.facebook.com/profile.php?id=61578005793210" target="_blank"><img src="../pictures/facebook1.png" alt="Facebook"></a>
        <a href="https://www.instagram.com/techcompanion_it/" target="_blank"><img src="../pictures/instagramweb.webp" alt="Instagram"></a>
      </div>
      <div class="footer-center">
        <div class="footer-text">
          &copy; 2025 Servicios de soporte - ayuda y clases particulares. En este 2025 estamos con vos
        </div>
        <div class="legal-link">
          <button id="legal-toggle" style="background: none; color: #1eec63; border: none; cursor: pointer; text-decoration: underline;">Política de Privacidad y Términos</button>
        </div>
      </div>
      <div class="payment-icons">
        <a href="#" id="mercadoPagoBtn"><img src="../pictures/mercadopago1.png" alt="Mercado Pago" width="30"></a>
        <a href="#" id="cuentaDniBtn"><img src="../pictures/cuentadni1.jpg" alt="Cuenta DNI" width="30"></a>
      </div>
    </div>

    <!-- Modal Política de Privacidad -->
    <div id="legal-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); justify-content: center; align-items: center; z-index: 9999;">
      <div style="background: #222; padding: 20px; border-radius: 8px; max-width: 800px; width: 90%; max-height: 80vh; overflow-y: auto; color: white; position: relative; box-shadow: 0 0 15px rgba(0,0,0,0.8); font-size: 14px; text-align: left;">
        <button id="legal-close" style="position: absolute; top: 10px; right: 15px; background: transparent; border: none; font-size: 28px; color: #1eec63; cursor: pointer; font-weight: bold; line-height: 1;">&times;</button>

        <h3 style="color: #1eec63;">Política de Privacidad</h3>
        <p>En Tech Companion valoramos la privacidad de nuestros visitantes. Este sitio web no utiliza cookies ni tecnologías de rastreo.</p>
        <p>Los datos que usted proporcione a través del formulario de contacto o por mensaje de WhatsApp (como nombre, correo electrónico o número de teléfono) serán utilizados exclusivamente para responder a su consulta o coordinar clases/servicios solicitados. No compartimos esta información con terceros.</p>
        <p>Los pagos pueden realizarse mediante Mercado Pago, Cuenta DNI, transferencia bancaria o en efectivo. No almacenamos información financiera en este sitio.</p>
        <p>Si tiene preguntas sobre esta política o desea que eliminemos sus datos, puede escribirnos a <strong>myceosuport@gmail.com</strong>.</p>

        <h3 style="color: #1eec63; margin-top: 20px;">Términos y Condiciones</h3>
        <ul>
          <li>Los pagos pueden realizarse por Mercado Pago, Cuenta DNI, transferencia o efectivo.</li>
          <li>Los servicios no tienen una política de devolución fija, pero en caso de reclamo justificado, se evaluará cada caso para ofrecer una solución adecuada.</li>
          <li>La calidad y duración de cada clase o servicio será acordada previamente con el cliente.</li>
          <li>El contacto puede realizarse por correo electrónico o WhatsApp. Al hacerlo, el usuario acepta que Tech Companion lo contacte para coordinar servicios.</li>
        </ul>
        <p>Ante cualquier duda o reclamo, podés escribirnos a <strong>myceosuport@gmail.com</strong>.</p>
      </div>
    </div>

    <!-- Modal Mercado Pago -->
    <div id="modalMP" class="custom-modal">
      <div class="modal-content">
        <span class="close" onclick="cerrarModal('modalMP')">&times;</span>
        <h3 style="color: #1eec63;">Alias Mercado Pago</h3>
        <p id="aliasMP">techcompanion.it</p>
        <button onclick="copiarAlias('aliasMP')">Copiar Alias</button>
      </div>
    </div>

    <!-- Modal Cuenta DNI -->
    <div id="modalDNI" class="custom-modal">
      <div class="modal-content">
        <span class="close" onclick="cerrarModal('modalDNI')">&times;</span>
        <h3 style="color: #1eec63;">Alias Cuenta DNI</h3>
        <p id="aliasDNI">techcompanion.it</p>
        <button onclick="copiarAlias('aliasDNI')">Copiar Alias</button>
      </div>
    </div>
  `;

  // Agregar estilos
  const estiloModal = document.createElement('style');
  estiloModal.innerHTML = `
    .custom-modal {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6);
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .custom-modal .modal-content {
      background: #222;
      padding: 20px;
      border-radius: 8px;
      max-width: 400px;
      width: 90%;
      color: white;
      text-align: center;
      position: relative;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    }
    .custom-modal .close {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 28px;
      color: #1eec63;
      cursor: pointer;
    }
    .custom-modal button {
      margin-top: 10px;
      padding: 8px 12px;
      background-color: #1eec63;
      color: #000;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .custom-modal button:hover {
      background-color: #00c95c;
    }
  `;
  document.head.appendChild(estiloModal);

  // Abrir modal legal
  document.getElementById('legal-toggle').addEventListener('click', () => {
    document.getElementById('legal-modal').style.display = 'flex';
  });

  // Cerrar modal legal
  document.getElementById('legal-close').addEventListener('click', () => {
    document.getElementById('legal-modal').style.display = 'none';
  });

  // Cerrar modal legal haciendo clic fuera
  document.getElementById('legal-modal').addEventListener('click', (e) => {
    if (e.target.id === 'legal-modal') {
      e.target.style.display = 'none';
    }
  });

  // Abrir modales de alias
  document.getElementById('mercadoPagoBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('modalMP').style.display = 'flex';
  });
  document.getElementById('cuentaDniBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('modalDNI').style.display = 'flex';
  });

// Cerrar modales de alias al hacer clic en la X
setTimeout(() => {
  document.querySelectorAll('.custom-modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.custom-modal');
      if (modal) modal.style.display = 'none';
    });
  });
}, 0);

  // Copiar alias
  window.copiarAlias = function(id) {
    const alias = document.getElementById(id).innerText;
    navigator.clipboard.writeText(alias);
    alert('Alias copiado: ' + alias);
  };

  // Cerrar alias si se hace clic fuera
  ['modalMP', 'modalDNI'].forEach(modalId => {
    const modal = document.getElementById(modalId);
    modal.addEventListener('click', (e) => {
      if (e.target.id === modalId) {
        modal.style.display = 'none';
      }
    });
  });
});

// --- FUNCIÓN PRINCIPAL DE INICIALIZACIÓN ---
function main() {
  // --- INTRO ANIMATION ---
  const overlay = document.getElementById("introOverlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      overlay.classList.add("fadeOut");
      setTimeout(() => {
        overlay.style.display = "none";
        document.body.style.overflow = 'auto';
      }, 1000);
    });
  } else {
    // Si no hay intro, habilitamos el scroll de inmediato.
    document.body.style.overflow = 'auto';
  }
}

document.addEventListener('DOMContentLoaded', main);

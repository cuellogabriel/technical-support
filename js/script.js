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


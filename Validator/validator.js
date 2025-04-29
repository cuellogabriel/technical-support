// Envío de formulario de contacto con validaciones
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validaciones
    if (!validarCampos(data)) {
        return;
    }

    // Envío del correo con mailto
    const mailtoLink = `mailto:robertogabrielcuello@gmail.com?subject=Consulta de ${data.nombre} ${data.apellido}&body=Email: ${data.email}%0D%0ATeléfono: ${data.telefono}%0D%0AConsulta: ${data.mensaje}`;
    window.location.href = mailtoLink;

    alert('Tu consulta ha sido enviada correctamente.');
    contactForm.reset();
});

// Función para validar campos
function validarCampos(data) {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Campos llenos
    for (const key in data) {
        if (data.hasOwnProperty(key) && !data[key].trim()) {
            alert(`El campo "${key}" es obligatorio.`);
            return false;
        }
    }

    // Validar email
    if (!emailRegex.test(data.email)) {
        alert('Por favor, ingresa un email válido.');
        return false;
    }

    // Validar teléfono (solo números y mínimo 8 dígitos)
    if (!/^\d{8,}$/.test(data.telefono)) {
        alert('El teléfono debe contener solo números y al menos 8 dígitos.');
        return false;
    }

    return true;
}
function validarCampos(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nombreApellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const telefonoRegex = /^\d{10,}$/; // al menos 10 dígitos

    //  Validar campos vacíos
    for (const key in data) {
        if (!data[key].trim()) {
            alert(`El campo "${key}" es obligatorio.`);
            return false;
        }
    }

    //  Validar nombre
    if (!nombreApellidoRegex.test(data.nombre)) {
        alert('El nombre solo debe contener letras y espacios.');
        return false;
    }

    //  Validar apellido
    if (!nombreApellidoRegex.test(data.apellido)) {
        alert('El apellido solo debe contener letras y espacios.');
        return false;
    }

    //  Validar email
    if (!emailRegex.test(data.email)) {
        alert('Por favor, ingresa un email válido.');
        return false;
    }

    //  Validar teléfono
    if (!telefonoRegex.test(data.telefono)) {
        alert('El teléfono debe tener al menos 10 números y sin caracteres especiales.');
        return false;
    }

    //  Validar mensaje
    if (data.mensaje.length < 10) {
        alert('El mensaje debe tener al menos 10 caracteres.');
        return false;
    }

    return true;
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const btnEnviar = form.querySelector('button[type="submit"]');
  const respuesta = document.getElementById('form-respuesta');

  // Campos y sus validadores
  const campos = {
    nombre: {
      elemento: form.querySelector('#nombre'),
      regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMsg: 'El nombre debe contener solo letras y espacios.',
      minLength: 1,
    },
    apellido: {
      elemento: form.querySelector('#apellido'),
      regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMsg: 'El apellido debe contener solo letras y espacios.',
      minLength: 1,
    },
    email: {
      elemento: form.querySelector('#email'),
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMsg: 'Por favor ingresa un email válido.',
      minLength: 1,
    },
    telefono: {
      elemento: form.querySelector('#telefono'),
      regex: /^\d{8,12}$/,
      errorMsg: 'El teléfono debe tener entre 8 y 12 dígitos.',
      minLength: 8,
    },
    mensaje: {
      elemento: form.querySelector('#mensaje'),
      regex: /[\s\S]{10,}/, // mínimo 10 caracteres
      errorMsg: 'El mensaje debe tener al menos 10 caracteres.',
      minLength: 10,
    },
  };

  // Crear contenedor para mensajes debajo de cada campo si no existe
  for (const key in campos) {
    let campo = campos[key];
    let errorElem = document.createElement('div');
    errorElem.className = 'error-message';
    errorElem.style.color = 'red';
    errorElem.style.fontSize = '0.9rem';
    errorElem.style.marginTop = '0.2rem';
    errorElem.style.display = 'none';
    campo.elemento.insertAdjacentElement('afterend', errorElem);
    campo.errorElem = errorElem;
  }

  // Función para validar un campo y mostrar/ocultar error
  function validarCampo(campo) {
    const val = campo.elemento.value.trim();
    if (val.length < campo.minLength || !campo.regex.test(val)) {
      campo.errorElem.textContent = campo.errorMsg;
      campo.errorElem.style.display = 'block';
      return false;
    } else {
      campo.errorElem.textContent = '';
      campo.errorElem.style.display = 'none';
      return true;
    }
  }

  // Validar todos los campos 
  function validarFormulario() {
    let todoOk = true;
    for (const key in campos) {
      const campoValido = validarCampo(campos[key]);
      if (!campoValido) todoOk = false;
    }
    return todoOk;
  }

  // Actualizar estado del botón 
  function actualizarEstadoBoton() {
    if (validarFormulario()) {
      btnEnviar.disabled = false;
      respuesta.textContent = '';
    } else {
      btnEnviar.disabled = true;
    }
  }
  for (const key in campos) {
    campos[key].elemento.addEventListener('input', () => {
      validarCampo(campos[key]);
      actualizarEstadoBoton();
    });
  }

  // Validación final y envío
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      btnEnviar.disabled = true;
      respuesta.textContent = 'Por favor corrige los errores antes de enviar.';
      respuesta.style.color = 'red';
      return;
    }

    btnEnviar.disabled = true;
    respuesta.textContent = 'Enviando...';
    respuesta.style.color = 'black';

    const data = {};
    for (const key in campos) {
      data[key] = campos[key].elemento.value.trim();
    }

    try {
      const res = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        respuesta.textContent = '✅ Consulta enviada correctamente.';
        respuesta.style.color = 'green';
        form.reset();
        //esactivar botón hasta que usuario escriba algo
        btnEnviar.disabled = true;

        // Ocultar mensajes de error  desp reset
        for (const key in campos) {
          campos[key].errorElem.style.display = 'none';
        }
      } else {
        respuesta.textContent = '❌ Ocurrió un error al enviar. Intentá nuevamente.';
        respuesta.style.color = 'red';
        btnEnviar.disabled = false;
      }
    } catch (err) {
      respuesta.textContent = '❌ No se pudo conectar al servidor. Intentalo más tarde.';
      respuesta.style.color = 'red';
      btnEnviar.disabled = false;
    }
  });

  // Inicializar estado botón (desactivado)
  btnEnviar.disabled = true;
});
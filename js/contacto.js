/*--------------------------------------------------------------
# GESTIÓN DEL FORMULARIO DE CONTACTO - SPORT SHOP (Optimizado)
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            
            // 1. Resetear estados previos de mensajes personalizados
            resetearMensajesEstado();

            // 2. VALIDACIÓN NATIVA
            if (!contactForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Opcional: Mostrar un mensaje general de error si hay campos vacíos
                const errorMsg = document.getElementById('form-error');
                if (errorMsg) errorMsg.classList.remove('d-none');
            } else {
                // Si todo es correcto, simulamos el envío
                e.preventDefault();
                ejecutarEnvioSimulado(contactForm);
            }

            // 3. ACTIVACIÓN VISUAL DE BOOTSTRAP
            contactForm.classList.add('was-validated');
            
        }, false);
    }
});

/**
 * Simula el proceso de envío de datos a un servidor
 */
function ejecutarEnvioSimulado(form) {
    const loadingMsg = document.getElementById('form-loading');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    // Buscamos nuestro nuevo botón con clase global
    const submitBtn = form.querySelector('.btn-sport'); 
    
    // 1. Preparar interfaz
    if (loadingMsg) loadingMsg.classList.remove('d-none');
    if (errorMsg) errorMsg.classList.add('d-none');
    
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7'; // Feedback visual de bloqueo
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>ENVIANDO...';

    // 2. Simulación de espera de red (2 segundos)
    setTimeout(() => {
        // Ocultar mensaje de carga
        if (loadingMsg) loadingMsg.classList.add('d-none');
        
        // 3. Mostrar éxito (En el formulario y opcionalmente en Modal)
        if (successMsg) successMsg.classList.remove('d-none');

        const modalElement = document.getElementById('successModal');
        if (modalElement) {
            const myModal = new bootstrap.Modal(modalElement);
            myModal.show();
        }

        // 4. Limpiar y resetear
        form.reset();
        form.classList.remove('was-validated');
        
        // Restaurar botón original
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = 'ENVIAR CONSULTA';
        
        // Ocultar el mensaje de éxito tras unos segundos
        setTimeout(() => {
            if (successMsg) successMsg.classList.add('d-none');
        }, 5000);
        
    }, 2000);
}

/**
 * Limpia los mensajes de alerta antes de un nuevo intento
 */
function resetearMensajesEstado() {
    const mensajes = ['form-loading', 'form-error', 'form-success'];
    mensajes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('d-none');
    });
}
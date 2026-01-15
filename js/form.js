/*--------------------------------------------------------------
# GESTIÓN DEL FORMULARIO DE CONTACTO - SPORT SHOP
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            
            // 1. VALIDACIÓN
            // checkValidity() comprueba si todos los campos 'required' están rellenos
            if (!contactForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                // Si el formulario es válido, cancelamos el envío real para simularlo
                e.preventDefault();
                ejecutarEnvioSimulado(contactForm);
            }

            // 2. ACTIVACIÓN VISUAL
            // Esta clase de Bootstrap activa los estilos :invalid e :valid (colores rojo/verde)
            contactForm.classList.add('was-validated');
            
        }, false);
    }
});

/**
 * Simula el proceso de envío de datos a un servidor
 * @param {HTMLFormElement} form - El elemento formulario
 */
function ejecutarEnvioSimulado(form) {
    const loadingMsg = document.getElementById('form-loading');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // 1. Preparar interfaz (Bloquear botón y mostrar spinner)
    loadingMsg.classList.remove('d-none');
    submitBtn.disabled = true;

    // 2. Simulación de espera de red (2 segundos)
    setTimeout(() => {
        // Ocultar mensaje de carga
        loadingMsg.classList.add('d-none');
        
        // 3. Lanzar Modal de Éxito
        const modalElement = document.getElementById('successModal');
        if (modalElement) {
            const myModal = new bootstrap.Modal(modalElement);
            myModal.show();
        }

        // 4. Limpiar formulario para futuros envíos
        form.reset();
        
        // Eliminamos la validación visual para que no aparezca todo en verde tras resetear
        form.classList.remove('was-validated');
        
        // Reactivar el botón de envío
        submitBtn.disabled = false;
        
    }, 2000);
}
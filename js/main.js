// Cambio de color del logo y el menú
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');
    const heroSection = document.querySelector('#sportshop');

    // Solo ejecutamos si ambos elementos existen
    if (header && heroSection) {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // isIntersecting es true cuando el video se ve
                if (!entry.isIntersecting) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }, {
            // Umbral: 0 significa que en cuanto el primer píxel del video desaparece, cambia.
            threshold: 0,
            rootMargin: "-10% 0px 0px 0px" // Cambia un poco antes de que termine el video
        });

        headerObserver.observe(heroSection);
    } else {
        console.warn("Navegación dinámica: No se encontró el id='sportshop'");
    }
});

// Inicialización de AOS (Animate On Scroll)

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 50, // Dispara la animación 50px antes de llegar al elemento
    mirror: false
  });

  // Forzar recálculo después de cargar todo
  window.addEventListener('load', function() {
    AOS.refresh();
  });
});

/**
* SportShop JS - Versión Blindada
*/
(function() {
  "use strict";

  /**
   * 1. Inicialización de AOS
   */
  function initAOS() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
   * 2. Inicialización de Isotope y Filtros
   */
  function initIsotope() {
    // Buscamos el contenedor
    let container = document.querySelector('.isotope-container');
    
    if (container) {
      // Usamos imagesLoaded para asegurarnos de que las fotos están ahí
      imagesLoaded(container, function() {
        let isotope = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry',
          filter: '*'
        });

        // Configuración de los filtros
        let filters = document.querySelectorAll('.frontshop-filters li');

        filters.forEach(function(el) {
          el.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Gestión de clases activas
            filters.forEach(f => f.classList.remove('filter-active'));
            this.classList.add('filter-active');

            // Aplicar el filtro
            isotope.arrange({
              filter: this.getAttribute('data-filter')
            });

            // Refrescar AOS al terminar la animación
            isotope.on('arrangeComplete', function() {
              AOS.refresh();
            });
          }, false);
        });
      });
    }
  }

  // Ejecutar todo cuando la ventana esté totalmente cargada
  window.addEventListener('load', () => {
    initAOS();
    initIsotope();
  });

})();

/**
 * Inicialización de GLightbox
 */
const lightbox = GLightbox({
  selector: '.glightbox'
});
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
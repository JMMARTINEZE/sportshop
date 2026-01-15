/**
 * SportShop JS - Versión Profesional Blindada
 * Todo el control de la web en un único motor encapsulado.
 */
(function() {
    "use strict";

    /*--------------------------------------------------------------
    # 1. INICIALIZACIÓN DE AOS (Animaciones)
    --------------------------------------------------------------*/
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 50
            });
        }
    }

    /*--------------------------------------------------------------
    # 2. CONTROL DE NAVEGACIÓN (Header Scroll)
    --------------------------------------------------------------*/
    function initHeaderScroll() {
        const header = document.querySelector('#header');
        const heroSection = document.querySelector('#sportshop');

        if (header && heroSection) {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            }, {
                threshold: 0,
                rootMargin: "-10% 0px 0px 0px"
            });

            headerObserver.observe(heroSection);
        }
    }

    /*--------------------------------------------------------------
    # 3. ISOTOPE Y FILTROS DE TIENDA
    --------------------------------------------------------------*/
    function initIsotope() {
        let container = document.querySelector('.isotope-container');
        
        if (container && typeof Isotope !== 'undefined') {
            // Esperamos a que las imágenes carguen para evitar solapamientos
            imagesLoaded(container, function() {
                let isotope = new Isotope(container, {
                    itemSelector: '.isotope-item',
                    layoutMode: 'masonry',
                    filter: '*'
                });

                let filters = document.querySelectorAll('.frontshop-filters li');

                filters.forEach(el => {
                    el.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Clase activa
                        filters.forEach(f => f.classList.remove('filter-active'));
                        this.classList.add('filter-active');

                        // Filtrar
                        isotope.arrange({
                            filter: this.getAttribute('data-filter')
                        });

                        // Refrescar AOS al mover elementos
                        isotope.on('arrangeComplete', () => {
                            AOS.refresh();
                        });
                    });
                });
            });
        }
    }

    /*--------------------------------------------------------------
    # 4. GLIGHTBOX (Galería de imágenes)
    --------------------------------------------------------------*/
    function initGLightbox() {
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.glightbox'
            });
        }
    }

    /*--------------------------------------------------------------
    # 5. LANZADOR GLOBAL (Eventos de carga)
    --------------------------------------------------------------*/
    
    // Ejecución rápida al cargar el DOM (Interacción y Header)
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderScroll();
        initGLightbox();
    });

    // Ejecución tras carga total (Layouts complejos y Animaciones)
    window.addEventListener('load', () => {
        initAOS();
        initIsotope();
    });

})();
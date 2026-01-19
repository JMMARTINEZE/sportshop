/**
 * SportShop JS - Product Detail
 * Control unificado de interacciones.
 */
(function() {
    "use strict";

    /*--------------------------------------------------------------
    # 1. CONTROL DE CANTIDAD (+/-)
    --------------------------------------------------------------*/
    function initQuantitySelector() {
        const qtyContainer = document.querySelector('.product-detail .input-group');
        if (!qtyContainer) return;

        const input = qtyContainer.querySelector('input');
        const btnMinus = qtyContainer.querySelector('button:first-child');
        const btnPlus = qtyContainer.querySelector('button:last-child');

        btnMinus.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) input.value = value - 1;
        });

        btnPlus.addEventListener('click', () => {
            let value = parseInt(input.value);
            input.value = value + 1;
        });

        input.addEventListener('change', () => {
            if (isNaN(input.value) || input.value < 1) {
                input.value = 1;
            }
        });
    }

    /*--------------------------------------------------------------
    # 2. SELECCIÓN DE TALLAS
    --------------------------------------------------------------*/
    function initSizeSelector() {
        const sizeInputs = document.querySelectorAll('input[name="size"]');
        sizeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const selectedSize = e.target.nextElementSibling.textContent;
                console.log(`Talla seleccionada: ${selectedSize}`);
            });
        });
    }

    /*--------------------------------------------------------------
    # 3. CONTROL DE AUDIO
    --------------------------------------------------------------*/
    function initProductAudio() {
        const btn = document.getElementById('btnPlaySound');
        const audio = document.getElementById('productSound');

        if (btn && audio) {
            btn.addEventListener('click', () => {
                audio.currentTime = 0;
                audio.play();
                btn.classList.add('playing');

                audio.onended = () => {
                    btn.classList.remove('playing');
                };
            });
        }
    }

    /*--------------------------------------------------------------
    # 4. GALERÍA SINCRONIZADA (SWIPER + GLIGHTBOX)
    --------------------------------------------------------------*/
    function initProductGallery() {
        // Validamos que existan los contenedores para evitar errores en consola
        if (!document.querySelector('.thumb-swiper')) return;

        // 1. Inicializar miniaturas
        const swiperThumbs = new Swiper(".thumb-swiper", {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });

        // 2. Inicializar principal vinculado a miniaturas
        const swiperMain = new Swiper(".main-swiper", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiperThumbs,
            },
        });

        // 3. Inicializar Glightbox
        const lightbox = GLightbox({
            selector: '.glightbox'
        });
    }

    /*--------------------------------------------------------------
    # 5. LANZADOR GLOBAL
    --------------------------------------------------------------*/
    document.addEventListener('DOMContentLoaded', () => {
        initQuantitySelector();
        initSizeSelector();
        initProductAudio();
        initProductGallery(); // Swiper y Glightbox juntos
    });

})();
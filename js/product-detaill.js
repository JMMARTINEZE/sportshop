/**
 * SportShop JS - Product Detail
 * Control de interacciones en la página de producto.
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

        // Evitar que el usuario escriba letras o números negativos manualmente
        input.addEventListener('change', () => {
            if (isNaN(input.value) || input.value < 1) {
                input.value = 1;
            }
        });
    }

    /*--------------------------------------------------------------
    # 2. SELECCIÓN DE TALLAS (Log)
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
    # 3. INTERCAMBIO DE IMAGEN PRINCIPAL
    --------------------------------------------------------------*/
    function initGallerySwitcher() {
        const mainImg = document.querySelector('.main-img-container img');
        const mainLink = document.querySelector('.main-img-container');
        const thumbnails = document.querySelectorAll('.product-gallery .row .glightbox');

        if (!mainImg || thumbnails.length === 0) return;

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function(e) {
                // Solo cambiamos la imagen si el usuario hace click, 
                // pero dejamos que GLightbox se encargue del zoom.
                const newSrc = this.querySelector('img').src;
                const newHref = this.getAttribute('href');

                // Pequeño efecto de transición suave
                mainImg.style.opacity = '0';
                
                setTimeout(() => {
                    mainImg.src = newSrc;
                    mainLink.setAttribute('href', newHref);
                    mainImg.style.opacity = '1';
                }, 200);
            });
        });
    }

    /*--------------------------------------------------------------
    # 4. LANZADOR GLOBAL
    --------------------------------------------------------------*/
    document.addEventListener('DOMContentLoaded', () => {
        initQuantitySelector();
        initSizeSelector();
        initGallerySwitcher();
    });

})();
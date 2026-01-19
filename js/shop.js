/**
 * SportShop JS - Tienda Versión 2.1
 * Gestión de filtrado dinámico, búsqueda, ordenación y paginación.
 */
(function() {
    "use strict";

    /*--------------------------------------------------------------
    # 1. VARIABLES DE ESTADO Y ELEMENTOS
    --------------------------------------------------------------*/
    const CONFIG = {
        itemsPerPage: 6,
        activeClass: 'active',
        highlightClasses: ['text-danger', 'fw-bold']
    };

    let currentPage = 1;

    // Elementos del DOM
    const searchInput = document.getElementById('shopSearch');
    const filters = document.querySelectorAll('.filter-item');
    const productsContainer = document.getElementById('products-container');
    const noResults = document.getElementById('no-results');
    const paginationContainer = document.getElementById('pagination');
    const clearBtn = document.querySelector('.btn-clear-filters');
    const sortSelect = document.getElementById('sortSelect');
    const yearSpan = document.getElementById('current-year');

    /*--------------------------------------------------------------
    # 2. INICIALIZACIÓN
    --------------------------------------------------------------*/
    function init() {
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        
        checkURLParams();
        setupEventListeners();
        updateUI(); // Carga inicial
    }

    /*--------------------------------------------------------------
    # 3. LÓGICA PRINCIPAL (Filtrado, Ordenación y UI)
    --------------------------------------------------------------*/
    
    function updateUI() {
        const products = Array.from(document.querySelectorAll('.product-item'));
        const activeFilterBtn = document.querySelector('.filter-item.active');
        if (!activeFilterBtn) return;

        const activeFilter = activeFilterBtn.getAttribute('data-filter');
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

        // 1. FILTRADO LÓGICO
        const filteredItems = products.filter(item => {
            const type = item.getAttribute('data-type');
            const category = item.getAttribute('data-category');
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            
            const matchesFilter = (activeFilter === 'all' || type === activeFilter || category === activeFilter);
            const matchesSearch = title.includes(searchTerm);
            
            return matchesFilter && matchesSearch;
        });

        // 2. ORDENACIÓN (Sobre los items filtrados)
        const sortedItems = sortProducts(filteredItems);

        // 3. REORGANIZACIÓN FÍSICA EN EL DOM
        // Ocultamos todos primero
        products.forEach(item => item.style.display = 'none');
        
        if (productsContainer) {
            // Re-inyectamos en el orden correcto (appendChild no duplica, mueve)
            sortedItems.forEach(item => productsContainer.appendChild(item));
        }

        // 4. CONTROL DE RESULTADOS VACÍOS
        if (noResults) noResults.classList.toggle('d-none', sortedItems.length > 0);

        // 5. PAGINACIÓN Y VISIBILIDAD
        const totalPages = Math.ceil(sortedItems.length / CONFIG.itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;

        const start = (currentPage - 1) * CONFIG.itemsPerPage;
        const end = start + CONFIG.itemsPerPage;
        
        sortedItems.slice(start, end).forEach(item => {
            item.style.display = 'block';
        });

        renderPagination(totalPages);
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    function sortProducts(products) {
        const sortValue = sortSelect ? sortSelect.value : 'default';
        if (sortValue === 'default') return products;

        return [...products].sort((a, b) => {
            if (sortValue.includes('price')) {
                const priceA = parseFloat(a.getAttribute('data-price')) || 0;
                const priceB = parseFloat(b.getAttribute('data-price')) || 0;
                return sortValue === 'price-low' ? priceA - priceB : priceB - priceA;
            }
            if (sortValue === 'name-az') {
                const nameA = a.querySelector('.card-title').textContent.toLowerCase().trim();
                const nameB = b.querySelector('.card-title').textContent.toLowerCase().trim();
                return nameA.localeCompare(nameB);
            }
            return 0;
        });
    }

    /*--------------------------------------------------------------
    # 4. COMPONENTES AUXILIARES
    --------------------------------------------------------------*/

    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link ${i === currentPage ? 'bg-danger border-danger text-white' : 'text-danger'}" href="#">${i}</a>`;
            
            li.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                updateUI();
                window.scrollTo({ top: productsContainer.offsetTop - 100, behavior: 'smooth' });
            });
            paginationContainer.appendChild(li);
        }
    }

    function applyActiveStyles(targetElement) {
        filters.forEach(f => f.classList.remove(CONFIG.activeClass, ...CONFIG.highlightClasses));
        targetElement.classList.add(CONFIG.activeClass, ...CONFIG.highlightClasses);
    }

    function checkURLParams() {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        if (cat) {
            const target = document.querySelector(`.filter-item[data-filter="${cat}"]`);
            if (target) applyActiveStyles(target);
        }
    }

    /*--------------------------------------------------------------
    # 5. EVENT LISTENERS
    --------------------------------------------------------------*/
    function setupEventListeners() {
        // Filtros
        filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                applyActiveStyles(filter);
                currentPage = 1;
                updateUI();
            });
        });

        // Buscador
        searchInput?.addEventListener('input', () => {
            currentPage = 1;
            updateUI();
        });

        // Selector Orden
        sortSelect?.addEventListener('change', () => {
            currentPage = 1;
            updateUI();
        });

        // Botón Limpiar
        clearBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            if (searchInput) searchInput.value = '';
            if (sortSelect) sortSelect.value = 'default';
            const allFilter = document.querySelector('.filter-item[data-filter="all"]');
            if (allFilter) applyActiveStyles(allFilter);
            currentPage = 1;
            updateUI();
        });
    }

    document.addEventListener('DOMContentLoaded', init);

})();
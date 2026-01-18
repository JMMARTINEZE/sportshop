function updateCounts() {
    const newsItems = document.querySelectorAll('.news-item');
    const filters = document.querySelectorAll('.filter-item');

    filters.forEach(filter => {
        const category = filter.getAttribute('data-filter');
        const countSpan = filter.querySelector('.filter-count');
        
        if (countSpan) {
            if (category === 'all') {
                // Cuenta todas las noticias que existen
                countSpan.textContent = newsItems.length;
            } else {
                // Cuenta solo las que coinciden con el data-category
                const count = document.querySelectorAll(`.news-item[data-category="${category}"]`).length;
                countSpan.textContent = count;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('newsSearch');
    const filters = document.querySelectorAll('.filter-item');
    const noResults = document.getElementById('no-results');
    const paginationContainer = document.getElementById('pagination');
    
    const itemsPerPage = 4; // Límite de artículos por página
    let currentPage = 1;

    updateCounts(); // Actualiza los contadores al cargar la página

    function updateUI() {
        const newsItems = Array.from(document.querySelectorAll('.news-item'));
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-item.active').getAttribute('data-filter');

        // 1. FILTRAR: Decidimos qué noticias cumplen los requisitos
        const filteredItems = newsItems.filter(item => {
            const category = item.getAttribute('data-category');
            const contentText = item.querySelector('.news-content').textContent.toLowerCase();
            const matchesFilter = (activeFilter === 'all' || category === activeFilter);
            const matchesSearch = contentText.includes(searchTerm);
            return matchesFilter && matchesSearch;
        });

        // 2. MOSTRAR/OCULTAR ERROR
        noResults.classList.toggle('d-none', filteredItems.length > 0);

        // 3. CALCULAR PAGINACIÓN
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;

        // 4. VISIBILIDAD: Ocultamos todos y solo mostramos los de la página actual
        newsItems.forEach(item => item.style.display = 'none');
        
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = filteredItems.slice(start, end);

        itemsToShow.forEach(item => {
            item.style.display = 'block';
        });

        renderPagination(totalPages);
        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return; // Si solo hay una página, no mostramos botones

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link ${i === currentPage ? 'bg-danger border-danger text-white' : 'text-danger'}" href="#">${i}</a>`;
            
            li.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                updateUI();
                window.scrollTo({ top: document.getElementById('main').offsetTop - 100, behavior: 'smooth' });
            });
            paginationContainer.appendChild(li);
        }
    }

    // Eventos
    filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            filters.forEach(f => f.classList.remove('active', 'text-danger', 'fw-bold'));
            filter.classList.add('active', 'text-danger', 'fw-bold');
            currentPage = 1; // Reiniciar a página 1 al cambiar categoría
            updateUI();
        });
    });

    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reiniciar a página 1 al buscar
        updateUI();
    });

    // Carga inicial
    updateUI();
});
document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter-item');
    const searchInput = document.getElementById('newsSearch');
    const noResults = document.getElementById('no-results');

    if (!searchInput) return;

    function filterNews() {
        // Volvemos a capturar los artículos por si el DOM cambió
        const newsItems = document.querySelectorAll('.news-item');
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        const activeFilterElement = document.querySelector('.filter-item.active');
        const activeFilter = activeFilterElement ? activeFilterElement.getAttribute('data-filter') : 'all';
        
        let hasItems = false;

        newsItems.forEach(item => {
            const category = item.getAttribute('data-category');
            // Capturamos TODO el texto de la noticia (título + descripción)
            const contentText = item.querySelector('.news-content').textContent.toLowerCase();
            
            const matchesFilter = (activeFilter === 'all' || category === activeFilter);
            // CORRECCIÓN AQUÍ: Usamos contentText que es la variable real
            const matchesSearch = contentText.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                item.style.display = 'block';
                hasItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Control del mensaje de "No resultados"
        if (noResults) {
            if (hasItems) {
                noResults.classList.add('d-none');
            } else {
                noResults.classList.remove('d-none');
            }
        }
        
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            filters.forEach(f => {
                f.classList.remove('active', 'text-danger', 'fw-bold');
                // Aseguramos que el texto vuelva a ser dark si no es el activo
                f.classList.add('text-dark');
            });
            filter.classList.remove('text-dark');
            filter.classList.add('active', 'text-danger', 'fw-bold');
            filterNews();
        });
    });

    searchInput.addEventListener('input', filterNews);
});
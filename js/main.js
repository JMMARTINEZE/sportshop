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
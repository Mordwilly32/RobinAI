document.addEventListener('DOMContentLoaded', () => {
    // Retraso para dar tiempo a que la página se cargue visualmente
    setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        const heroContentElements = document.querySelectorAll('.hero-content .animate-slide-up');

        // Muestra la barra de navegación
        if (navbar) {
            navbar.classList.add('visible');
        }

        // Muestra los elementos del contenido principal uno por uno
        heroContentElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 50); // Un pequeño retraso para asegurar que los estilos se apliquen
});

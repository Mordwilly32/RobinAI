document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        const heroContentElements = document.querySelectorAll('.hero-content .animate-slide-up, .content-section .animate-slide-up, .animate-fade-in');

        if (navbar) {
            navbar.classList.add('visible');
        }

        heroContentElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 150); // Delay animado
        });
    }, 50);
});

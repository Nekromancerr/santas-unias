/* assets/js/sliders.js */

/* =========================================
   SLIDER AUTOMÁTICO DE RESEÑAS
   ========================================= */

   function initReviewSliders() {
    // 1. Buscamos todos los contenedores de sliders en la página
    const sliders = document.querySelectorAll('.js-review-slider');

    // 2. Por cada slider que encontremos, iniciamos su propio ciclo
    sliders.forEach(sliderContainer => {
        const reviews = sliderContainer.querySelectorAll('.review__item');
        let currentIndex = 0;

        // Si hay menos de 2 reseñas, no tiene sentido rotar
        if (reviews.length < 2) return;

        // Función que cambia a la siguiente reseña
        const cycleReviews = () => {
            // Le sacamos la clase 'active' a la actual
            reviews[currentIndex].classList.remove('active');

            // Calculamos el índice de la siguiente (si llega al final, vuelve a 0)
            currentIndex = (currentIndex + 1) % reviews.length;

            // Le ponemos la clase 'active' a la nueva
            reviews[currentIndex].classList.add('active');
        };

        // Iniciamos el intervalo de cambio cada 5 segundos (5000ms)
        setInterval(cycleReviews, 5000);
    });
}

/* =========================================
   2. SLIDER DE FOTOS EN SERVICIOS (Con fundido encadenado)
   ========================================= */
   function initServiceSliders() {
    const serviceSliders = document.querySelectorAll('.js-service-slider');

    serviceSliders.forEach(sliderContainer => {
        const images = sliderContainer.querySelectorAll('.category__img');
        let currentIndex = 0;

        if (images.length < 2) return;

        setInterval(() => {
            // 1. A la foto vieja le sacamos el active y le ponemos previous
            const oldImage = images[currentIndex];
            oldImage.classList.remove('active');
            oldImage.classList.add('previous');
            
            // 2. Calculamos y mostramos la foto nueva
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');

            // 3. Después de 800 milisegundos (lo que dura el fundido en CSS), le sacamos el previous
            setTimeout(() => {
                oldImage.classList.remove('previous');
            }, 800);

        }, 3500); 
    });
}

// Arrancamos ambos motores cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    initReviewSliders();
    initServiceSliders();
});

/* =========================================
   3. ACORDEÓN DE INFO EN TARJETAS DE SERVICIOS
   ========================================= */
   document.addEventListener('DOMContentLoaded', () => {
    const categoryInfoBtns = document.querySelectorAll('.category__info-btn');

    categoryInfoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Buscamos la cajita de descripción que pertenece a este mismo botón
            const descContainer = btn.closest('.category__content').querySelector('.category__desc');
            
            // Nos fijamos si ya estaba abierta
            const estabaAbierta = descContainer.classList.contains('show');
            
            // 1. Cerramos TODAS las cajitas de todas las tarjetas para mantener el orden
            document.querySelectorAll('.category__desc').forEach(d => d.classList.remove('show'));
            document.querySelectorAll('.category__info-btn').forEach(b => b.classList.remove('active'));
            
            // 2. Si la que tocamos estaba cerrada, la abrimos
            if (!estabaAbierta) {
                descContainer.classList.add('show');
                btn.classList.add('active');
            }
        });
    });
});
/* assets/js/lightbox.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectamos el HTML del visor automáticamente al final de la página
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <button class="lightbox__close" aria-label="Cerrar">&times;</button>
            <button class="lightbox__btn lightbox__btn--prev" aria-label="Anterior">&#10094;</button>
            
            <div class="lightbox__content-wrapper">
                <img src="" class="lightbox__img" id="lightbox-img" alt="Imagen ampliada">
                <img src="img/logo-s.webp" alt="Logo Santas Uñas" class="logo-esquina logo-esquina--lightbox">
            </div>

            <button class="lightbox__btn lightbox__btn--next" aria-label="Siguiente">&#10095;</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // 2. Seleccionamos los elementos que acabamos de crear
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox__close');
    const prevBtn = document.querySelector('.lightbox__btn--prev');
    const nextBtn = document.querySelector('.lightbox__btn--next');

    // Variables para saber dónde estamos parados
    let currentImageArray = [];
    let currentIndex = 0;

    // 3. Le damos la función de "click" usando DELEGACIÓN DE EVENTOS 
    // (Esto permite que las fotos que se inyectan dinámicamente también abran el visor)
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery__img')) {
            const parentGrid = e.target.closest('.gallery__grid');
            currentImageArray = Array.from(parentGrid.querySelectorAll('.gallery__img'));
            currentIndex = currentImageArray.indexOf(e.target);

            updateLightboxImage();
            lightbox.classList.add('active');
            
            // NUEVO: Bloqueamos el scroll del fondo
    document.body.style.overflow = 'hidden'; 
    }
});

// 4. Funciones de control
function updateLightboxImage() {
    lightboxImg.src = currentImageArray[currentIndex].src;
}

function showNext() {
    // Si llega al final, vuelve a la primera (ciclo infinito)
    currentIndex = (currentIndex + 1) % currentImageArray.length;
    updateLightboxImage();
}

function showPrev() {
    // Si está en la primera, va a la última
    currentIndex = (currentIndex - 1 + currentImageArray.length) % currentImageArray.length;
    updateLightboxImage();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    
    // NUEVO: Devolvemos el scroll al fondo
    document.body.style.overflow = ''; 
}

// 5. Conectamos los clicks en los botones y en el fondo oscuro
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        // Cierra solo si hacés click en lo negro (fuera de la foto y botones)
        if (e.target === lightbox) closeLightbox();
    });

    // 6. Magia de Teclado (Flechas y ESC en PC)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return; // Solo funciona si el visor está abierto
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeLightbox();
    });

    // 7. Magia de Celular (Deslizar el dedo / Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX; // Dónde apoyó el dedo
    });

    lightbox.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX; // Dónde lo levantó
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Distancia mínima para que lo cuente como swipe
        if (touchEndX < touchStartX - swipeThreshold) showNext(); // Deslizó a la izquierda
        if (touchEndX > touchStartX + swipeThreshold) showPrev(); // Deslizó a la derecha
    }
});
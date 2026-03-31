/* assets/js/hero.js */

const heroImages = [
    'img/cap/capping-hero-1.webp',
    'img/cap/capping-hero-2.webp',
    'img/cap/capping-hero-3.webp',
    'img/cap/capping-hero-4.webp',
    'img/cap/capping-hero-5.webp',
    'img/cap/capping-hero-6.webp',
    'img/cap/capping-hero-7.webp',
    'img/cap/capping-hero-8.webp'
];

/* Se debe completar las rutas de img/ con imagenes existentes sino muestra una imagen transparente */

const sliderContainer = document.getElementById('hero-slider');
let currentIndex = 0;
const slides = []; // Acá guardaremos nuestras 8 fotos

if (sliderContainer && heroImages.length > 0) {
    // 1. Buscamos la capa oscura para poner las fotos detrás de ella
    const overlay = sliderContainer.querySelector('.hero__overlay');

    // 2. Pre-cargamos TODAS las imágenes de una vez
    heroImages.forEach((imgPath, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.style.backgroundImage = `url('${imgPath}')`;
        slideDiv.style.position = 'absolute';
        slideDiv.style.top = '0';
        slideDiv.style.left = '0';
        slideDiv.style.width = '100%';
        slideDiv.style.height = '100%';
        slideDiv.style.backgroundSize = 'cover';
        slideDiv.style.backgroundPosition = 'center';
        slideDiv.style.transition = 'opacity 1.2s ease-in-out'; // Fundido súper suave
        
        // La primera foto arranca prendida (opacity 1), las demás apagadas (opacity 0)
        slideDiv.style.opacity = index === 0 ? '1' : '0'; 
        
        // Las inyectamos en el HTML detrás de la capa oscura
        sliderContainer.insertBefore(slideDiv, overlay);
        
        // Las guardamos en nuestra lista
        slides.push(slideDiv); 
    });

    // 3. Arrancamos el reloj: cada 5 segundos hacemos el cambio
    if (slides.length > 1) {
        setInterval(() => {
            // Apagamos la foto que se está viendo ahora
            slides[currentIndex].style.opacity = '0';

            // Calculamos cuál es la foto que sigue
            currentIndex = (currentIndex + 1) % slides.length;

            // Prendemos la foto nueva
            slides[currentIndex].style.opacity = '1';
        }, 5000);
    }
}
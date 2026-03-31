/* assets/js/header.js */

/* =========================================
    MENU SHOW Y HIDDEN
    ========================================= */

// ========================
// Seleccionamos los elementos del DOM (Document Object Model)
// ========================

// Usamos 'const' porque estas referencias no van a cambiar.
const navMenu = document.getElementById('nav-menu');      // El menú entero (<nav>)
const navToggle = document.querySelector('.header__toggle'); // El botón hamburguesa
const navClose = document.querySelector('.nav__close');      // La 'X' de cerrar

// ========================
// MOSTRAR MENÚ
// ========================

// Validamos si la constante 'navToggle' existe (para evitar errores)
if (navToggle) {
    navToggle.addEventListener('click', () => {
        // Al hacer clic, añadimos la clase 'show-menu' al nav
        // CSS se encarga de la animación (right: 0)
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    });
}

// ========================
// OCULTAR MENÚ
// ========================

// Validamos si la constante 'navClose' existe
if (navClose) {
    navClose.addEventListener('click', () => {
        // Al hacer clic, quitamos la clase 'show-menu'
        // El menú vuelve a esconderse (right: -100%)
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    });
}

/* =========================================
    QUITAR MENÚ AL HACER CLICK EN UN LINK
    ========================================= */
// Seleccionamos TODOS los links del menú
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    // Cuando hagamos clic en cualquier link, quitamos la clase show-menu
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = '';
}

// Por cada link, agregamos un "escuchador" de clic
navLink.forEach(n => n.addEventListener('click', linkAction));

/* =========================================
   CERRAR MENÚ AL TOCAR FUERA DE ÉL
   ========================================= */
   document.addEventListener('click', (e) => {
    // Verificamos si el menú está abierto actualmente
    if (navMenu.classList.contains('show-menu')) {
        
        // Si el clic NO fue dentro del menú (navMenu) y NO fue en el botón hamburguesa (navToggle)
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    }
});

/* =========================================
   BOTÓN VOLVER ARRIBA
   ========================================= */
   const scrollTopBtn = document.getElementById('scroll-top');

   if (scrollTopBtn) {
       // Escucha cada vez que movemos la rueda del mouse o el dedo
       window.addEventListener('scroll', () => {
           // Si bajamos más de 500 píxeles, muestra el botón
           if (window.scrollY >= 500) {
               scrollTopBtn.classList.add('show-scroll');
           } else {
               scrollTopBtn.classList.remove('show-scroll');
           }
       });
   
       // Al hacer clic, sube suavemente al inicio (coordenada 0)
       scrollTopBtn.addEventListener('click', () => {
           window.scrollTo({
               top: 0,
               behavior: 'smooth'
           });
       });
   }

   /* =========================================
   ANIMACIONES DE SCROLL (Scroll Reveal)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Buscamos todas las cosas que tengan la clase "reveal"
    const reveals = document.querySelectorAll('.reveal');

    // Creamos el "Observador"
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento entra en la pantalla...
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Le pone la clase para que aparezca
                
                // Opcional: Si querés que la animación ocurra SOLO UNA VEZ (y no cada vez que subís y bajás),
                // dejá esta línea de abajo descomentada:
                observer.unobserve(entry.target); 
            }
        });
    }, {
        rootMargin: "0px 0px -50px 0px", // Activa la animación justo un poquito antes de tocar el borde inferior
        threshold: 0.1 // Se activa cuando al menos el 10% de la tarjeta ya es visible
    });

    // Le decimos al observador que vigile a cada uno de los elementos
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});
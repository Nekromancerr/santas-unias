/* assets/js/header.js */

// ==========================================
// 1. INYECCIÓN DEL HEADER Y FOOTER (Principio DRY)
// ==========================================

const headerHTML = `
    <header class="header">
        <div class="container header__container">
            <a href="index.html" class="header__logo">
                <img src="img/logo-s.webp" alt="Santas Uñas" class="header__img">
                <span class="header__title-text">antas uñas</span>
            </a>
            <button class="header__toggle" aria-label="Abrir menú">☰</button>
            <nav class="nav" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item"><a href="index.html#inicio" class="nav__link">Inicio</a></li>
                    <li class="nav__item"><a href="index.html#servicios" class="nav__link">Servicios</a></li>
                    <li class="nav__item"><a href="index.html#nosotras" class="nav__link">Nosotras</a></li>
                    <li class="nav__item"><a href="cursos.html" class="nav__link">Cursos</a></li>
                    <li class="nav__item"><a href="https://www.wonoma.com/es-AR/salon/santas-unas" class="nav__link nav__link--cta" target="_blank">Reserva Turno</a></li>
                </ul>
                <button class="nav__close" aria-label="Cerrar menú">✕</button>
            </nav>
        </div>
    </header>
`;

const footerHTML = `
    <footer class="footer">
        <div class="container footer__container">
            <div class="footer__info">
                <h3 class="footer__title">Santas Uñas</h3>
                <p class="footer__text">Tu lugar de confianza para dejar tus manos hermosas.</p>
                <div class="footer__social">
                    <a href="https://www.instagram.com/santas_unias/" target="_blank" class="footer__social-link" aria-label="Ir al Instagram de Santas Uñas"><i aria-hidden="true" class="fa-brands fa-instagram"></i></a>
                    <a href="https://api.whatsapp.com/send/?phone=3487728179" target="_blank" class="footer__social-link" aria-label="Enviar mensaje por WhatsApp"><i aria-hidden="true" class="fa-brands fa-whatsapp"></i></a>
                </div>
                <ul class="footer__contact">
                    <li><i aria-hidden="true" class="fa-solid fa-location-dot"></i> Almte. Brown 159, Zárate</li>
                    <li><i aria-hidden="true" class="fa-solid fa-envelope"></i> contacto@santasunas.com</li>
                </ul>
            </div>
            <div class="footer__map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.9113577321164!2d-59.025101199999995!3d-34.097411199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb0b686ad8ca35%3A0xdb1b1ae55e82a9a3!2sASC%2C%20Almte.%20Brown%20159%2C%20B2800%20Z%C3%A1rate%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1771436235479!5m2!1ses!2sar" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div class="footer__copy">
            <p>© 2026 Santas Uñas. Todos los derechos reservados.</p>
        </div>
    </footer>
`;

// Inyectamos el Header justo al principio del body
document.body.insertAdjacentHTML('afterbegin', headerHTML);

// Buscamos el main e inyectamos el Footer justo después de que termina
const mainElement = document.querySelector('main');
if (mainElement) {
    mainElement.insertAdjacentHTML('afterend', footerHTML);
}

// ==========================================
// 2. DETECTOR DE PESTAÑA Y SCROLLSPY (Intersection Observer)
// ==========================================
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav__link');

// Limpiamos cualquier clase active previa
navLinks.forEach(link => link.classList.remove('active'));

// CASO A: Estamos en una página interna (Cursos o Turnos)
if (!currentPath.includes('index.html') && currentPath !== '') {
    navLinks.forEach(link => {
        // Solo encendemos el link que coincida exactamente con el archivo actual
        if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        }
    });
} 
// CASO B: Estamos en el Inicio (index.html) -> Activamos el Scrollspy
else {
    // 1. Sumamos la sección #courses-promo a la lista de vigilancia
    const sections = document.querySelectorAll('#inicio, #servicios, #nosotras, #courses-promo');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -60% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // 2. Apagamos TODOS los links para limpiar el estado anterior
                navLinks.forEach(link => link.classList.remove('active'));

                // 3. Excepción a la regla: Si pasamos por la promo, encendemos la pestaña de la página Cursos
                if (currentId === 'courses-promo') {
                    const cursosLink = document.querySelector('.nav__link[href="cursos.html"]');
                    if (cursosLink) cursosLink.classList.add('active');
                } 
                // 4. Lógica normal: Para inicio, servicios o nosotras
                else {
                    const activeLink = document.querySelector(`.nav__link[href="index.html#${currentId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

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
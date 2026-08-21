/* assets/js/gallery.js */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. BASE DE DATOS ESTRUCTURADA
    // ==========================================
    // Ahora es un array de objetos para poder filtrar por autora
    const baseDeDatosFotos = [
        // --- Trabajos de Isis ---
        { src: "img/cap/capping-hero-6.webp", author: "isis" },
        { src: "img/cap/capping-hero-1.webp", author: "isis" },
        { src: "img/cap/capping-2.webp", author: "isis" },

        // --- Trabajos de Lola ---
        { src: "img/tra-lol/lola-1.webp", author: "lola" },
        { src: "img/tra-lol/lola-2.webp", author: "lola" },
        { src: "img/tra-lol/lola-3.webp", author: "lola" },
        { src: "img/tra-lol/lola-4.webp", author: "lola" },
        { src: "img/tra-lol/lola-5.webp", author: "lola" },
        { src: "img/tra-lol/lola-6.webp", author: "lola" },
        { src: "img/tra-lol/lola-7.webp", author: "lola" },
        { src: "img/tra-lol/lola-8.webp", author: "lola" },
        { src: "img/tra-lol/lola-9.webp", author: "lola" },
        { src: "img/tra-lol/lola-10.webp", author: "lola" },
        { src: "img/tra-lol/lola-11.webp", author: "lola" },

        // --- Trabajos de Jose (Resto de las imágenes) ---
        { src: "img/cap/cap-ser-1.webp", author: "jose" },
        { src: "img/cap/capping-1.webp", author: "jose" },
        { src: "img/cap/capping-3.webp", author: "jose" },
        { src: "img/cap/capping-4.webp", author: "jose" },
        { src: "img/cap/capping-5.webp", author: "jose" },
        { src: "img/cap/capping-8.webp", author: "jose" },
        { src: "img/cap/capping-9.webp", author: "jose" },
        { src: "img/cap/capping-10.webp", author: "jose" },
        { src: "img/cap/capping-11.webp", author: "jose" },
        { src: "img/cap/capping-12.webp", author: "jose" },
        { src: "img/cap/capping-14.webp", author: "jose" },
        { src: "img/cap/capping-15.webp", author: "jose" },
        { src: "img/cap/capping-16.webp", author: "jose" },
        { src: "img/cap/capping-18.webp", author: "jose" },
        { src: "img/cap/capping-curso.jpg", author: "jose" },
        { src: "img/cap/capping-hero-2.webp", author: "jose" },
        { src: "img/cap/capping-hero-3.webp", author: "jose" },
        { src: "img/cap/capping-hero-4.webp", author: "jose" },
        { src: "img/cap/capping-hero-5.webp", author: "jose" },
        { src: "img/cap/capping-hero-7.webp", author: "jose" },
        { src: "img/cap/capping-hero-8.webp", author: "jose" },
        { src: "img/cap/capping-ser-1.webp", author: "jose" },
        { src: "img/esc/esculpidas-1.webp", author: "jose" },
        { src: "img/esc/esculpidas-2.webp", author: "jose" },
        { src: "img/esc/esculpidas-3.webp", author: "jose" },
        { src: "img/esc/esculpidas-4.webp", author: "jose" },
        { src: "img/man/manicura-1.webp", author: "jose" },
        { src: "img/man/manicura-2.webp", author: "jose" },
        { src: "img/man/manicura-3.webp", author: "jose" },
        { src: "img/sof/soft-gel-1.webp", author: "jose" },
        { src: "img/sof/soft-gel-2.webp", author: "jose" },
        { src: "img/sof/soft-gel.webp", author: "jose" }
    ];

    // ==========================================
    // 2. ESTADO GLOBAL
    // ==========================================
    const MAX_FOTOS_PANTALLA = 15;
    const MIN_CAMBIOS = 2;
    const MAX_CAMBIOS = 4;

    const grid = document.getElementById('main-gallery-grid');
    const btnShowAll = document.getElementById('btn-show-all');
    const filterButtons = document.querySelectorAll('.tab-btn');
    
    let fotosEnPantalla = [];
    let rotacionAutomatica;
    let estadoGaleriaCompleta = false;
    let posicionesDisponibles = []; 
    let filtroActual = 'all'; // Estado del filtro seleccionado

    if (!grid) return;

    // ==========================================
    // 3. LÓGICA DE FILTRADO Y MATEMÁTICAS
    // ==========================================
    
    // Filtra la base de datos según el botón seleccionado
    function obtenerBaseFiltrada() {
        if (filtroActual === 'all') return baseDeDatosFotos;
        return baseDeDatosFotos.filter(foto => foto.author === filtroActual);
    }

    function obtenerFotoAleatoria() {
        const baseActual = obtenerBaseFiltrada();
        let disponibles = baseActual.map((_, index) => index);
        disponibles = disponibles.filter(index => !fotosEnPantalla.includes(index));
        
        // Si no hay fotos nuevas disponibles (ej: la chica tiene menos de 15 fotos), devolvemos -1
        if (disponibles.length === 0) return -1;
        
        const indiceAlAzar = Math.floor(Math.random() * disponibles.length);
        return disponibles[indiceAlAzar];
    }

    function mezclarPosiciones() {
        posicionesDisponibles = fotosEnPantalla.map((_, index) => index);
        posicionesDisponibles.sort(() => Math.random() - 0.5); 
    }

    function crearCuadroFoto(objetoFoto) {
        const div = document.createElement('div');
        div.className = 'gallery__item';
        div.innerHTML = `
            <img src="${objetoFoto.src}" alt="Trabajo de ${objetoFoto.author}" class="gallery__img" loading="lazy">
            <img src="img/logo-s.webp" alt="Logo Santas Uñas" class="logo-esquina" loading="lazy">
        `;
        return div;
    }

    // ==========================================
    // 4. RENDERIZADO Y ROTACIÓN
    // ==========================================
    
    function iniciarGaleria() {
        grid.innerHTML = ''; 
        fotosEnPantalla = [];
        clearInterval(rotacionAutomatica); // Limpiar siempre antes de reiniciar

        const baseActual = obtenerBaseFiltrada();
        const limite = Math.min(MAX_FOTOS_PANTALLA, baseActual.length);

        for (let i = 0; i < limite; i++) {
            const nuevoIndex = obtenerFotoAleatoria();
            if (nuevoIndex !== -1) {
                fotosEnPantalla.push(nuevoIndex);
                grid.appendChild(crearCuadroFoto(baseActual[nuevoIndex]));
            }
        }

        // Solo arrancamos la rotación si la chica elegida tiene MÁS fotos que el límite de la pantalla
        if (baseActual.length > limite && !estadoGaleriaCompleta) {
            mezclarPosiciones(); 
            arrancarRotacion();
            btnShowAll.style.display = 'inline-block';
        } else {
            btnShowAll.style.display = 'none';
        }
    }

    function cambiarUnaFoto() {
        if (estadoGaleriaCompleta) return; 

        if (posicionesDisponibles.length === 0) {
            mezclarPosiciones();
        }

        const baseActual = obtenerBaseFiltrada();
        const nuevaFotoIndex = obtenerFotoAleatoria();
        
        if (nuevaFotoIndex === -1) return; // Freno de seguridad

        const posicionA_Cambiar = posicionesDisponibles.pop();
        fotosEnPantalla[posicionA_Cambiar] = nuevaFotoIndex;

        const cuadritosHTML = grid.querySelectorAll('.gallery__item');
        const cuadroTarget = cuadritosHTML[posicionA_Cambiar];
        const imgTarget = cuadroTarget.querySelector('.gallery__img');

        cuadroTarget.classList.add('fade-out');

        const imagenTemporal = new Image();
        imagenTemporal.onload = () => {
            setTimeout(() => {
                imgTarget.src = imagenTemporal.src;
                imgTarget.alt = `Trabajo de ${baseActual[nuevaFotoIndex].author}`;
                cuadroTarget.classList.remove('fade-out');
            }, 400); 
        };
        imagenTemporal.src = baseActual[nuevaFotoIndex].src;
    }

    function arrancarRotacion() {
        clearInterval(rotacionAutomatica);
        rotacionAutomatica = setInterval(() => {
            let cantidadACambiar = Math.floor(Math.random() * (MAX_CAMBIOS - MIN_CAMBIOS + 1)) + MIN_CAMBIOS;
            for(let i=0; i<cantidadACambiar; i++) {
                setTimeout(cambiarUnaFoto, i * 1750); 
            }
        }, 6000);
    }

    // ==========================================
    // 5. MANEJO DE FILTROS (Avatares)
    // ==========================================
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cambio visual de botones
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Actualizar estado lógico y re-renderizar
            filtroActual = btn.getAttribute('data-filter');
            estadoGaleriaCompleta = false;
            btnShowAll.textContent = 'Ver galería completa';
            
            // Efecto suave al cambiar de filtro
            grid.style.opacity = '0';
            setTimeout(() => {
                iniciarGaleria();
                grid.style.opacity = '1';
            }, 400);
        });
    });

    // ==========================================
    // 6. BOTÓN ABRIR/CERRAR GALERÍA COMPLETA
    // ==========================================
    function toggleGaleriaCompleta() {
        grid.style.opacity = '0';
        setTimeout(() => {
            if (!estadoGaleriaCompleta) {
                clearInterval(rotacionAutomatica);
                grid.innerHTML = '';
                const baseActual = obtenerBaseFiltrada();
                baseActual.forEach(foto => grid.appendChild(crearCuadroFoto(foto)));
                btnShowAll.textContent = 'Cerrar galería completa'; 
                estadoGaleriaCompleta = true;
            } else {
                iniciarGaleria();
                btnShowAll.textContent = 'Ver galería completa';
                estadoGaleriaCompleta = false;
                document.getElementById('book-gen').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            grid.style.opacity = '1';
        }, 500); 
    }

    btnShowAll.addEventListener('click', toggleGaleriaCompleta);

    // ==========================================
    // 7. OPTIMIZACIÓN DE RENDIMIENTO
    // ==========================================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(rotacionAutomatica);
        } else {
            const baseActual = obtenerBaseFiltrada();
            if (!estadoGaleriaCompleta && baseActual.length > MAX_FOTOS_PANTALLA) {
                arrancarRotacion();
            }
        }
    });

    // Arrancar la primera vez
    iniciarGaleria();
});
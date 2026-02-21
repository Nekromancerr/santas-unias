/* assets/js/gallery.js */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. BASE DE DATOS DE FOTOS
    // ==========================================
    const baseDeDatosFotos = [
        // --- Capping ---
        "img/cap/cap-ser-1.webp", "img/cap/capping-1.webp", "img/cap/capping-2.webp",
        "img/cap/capping-3.webp", "img/cap/capping-4.webp", "img/cap/capping-5.webp",
        "img/cap/capping-8.webp", "img/cap/capping-9.webp", "img/cap/capping-10.webp",
        "img/cap/capping-11.webp", "img/cap/capping-12.webp", "img/cap/capping-14.webp",
        "img/cap/capping-15.webp", "img/cap/capping-16.webp", "img/cap/capping-18.webp",
        "img/cap/capping-curso.webp", "img/cap/capping-hero-1.webp", "img/cap/capping-hero-2.webp",
        "img/cap/capping-hero-3.webp", "img/cap/capping-hero-4.webp", "img/cap/capping-hero-5.webp",
        "img/cap/capping-hero-6.webp", "img/cap/capping-hero-7.webp", "img/cap/capping-hero-8.webp",
        "img/cap/capping-ser-1.webp",

        // --- Esculpidas ---
        "img/esc/esculpidas-1.webp", "img/esc/esculpidas-2.webp", 
        "img/esc/esculpidas-3.webp", "img/esc/esculpidas-4.webp",

        // --- Esmaltado ---
        "img/man/manicura-1.webp", "img/man/manicura-2.webp", "img/man/manicura-3.webp",

        // --- Soft Gel ---
        "img/sof/soft-gel-1.webp", "img/sof/soft-gel-2.webp", "img/sof/soft-gel.webp",

        // --- Trabajos Lola ---
        "img/tra-lol/lola-1.webp", "img/tra-lol/lola-2.webp", "img/tra-lol/lola-3.webp",
        "img/tra-lol/lola-4.webp", "img/tra-lol/lola-5.webp", "img/tra-lol/lola-6.webp",
        "img/tra-lol/lola-7.webp", "img/tra-lol/lola-8.webp", "img/tra-lol/lola-9.webp",
        "img/tra-lol/lola-10.webp", "img/tra-lol/lola-11.webp"
    ];

    // ==========================================
    // 2. PANEL DE CONFIGURACIÓN
    // ==========================================
    
    const MAX_FOTOS_PANTALLA = 15; // Cantidad de fotos en la grilla principal
    const MIN_CAMBIOS = 2;         // Mínimo de fotos que cambian a la vez
    const MAX_CAMBIOS = 4;         // Máximo de fotos que cambian a la vez

    const grid = document.getElementById('main-gallery-grid');
    const btnShowAll = document.getElementById('btn-show-all');
    
    let fotosEnPantalla = [];
    let rotacionAutomatica;
    let estadoGaleriaCompleta = false;
    let posicionesDisponibles = []; // El "Mazo de cartas"

    if (!grid) return;

    // ==========================================
    // 3. FUNCIONES DEL MAZO Y MATEMÁTICAS
    // ==========================================
    
    function obtenerFotoAleatoria() {
        let disponibles = baseDeDatosFotos.map((_, index) => index);
        disponibles = disponibles.filter(index => !fotosEnPantalla.includes(index));
        const indiceAlAzar = Math.floor(Math.random() * disponibles.length);
        return disponibles[indiceAlAzar];
    }

    // Mezcla las 15 posiciones para ir cambiándolas de a una sin repetir
    function mezclarPosiciones() {
        posicionesDisponibles = fotosEnPantalla.map((_, index) => index);
        posicionesDisponibles.sort(() => Math.random() - 0.5); 
    }

    function crearCuadroFoto(rutaFoto) {
        const div = document.createElement('div');
        div.className = 'gallery__item';
        div.innerHTML = `
            <img src="${rutaFoto}" alt="Trabajo Santas Uñas" class="gallery__img">
            <img src="img/logo-s.webp" alt="Logo Santas Uñas" class="logo-esquina">
        `;
        return div;
    }

    // ==========================================
    // 4. INICIO Y ROTACIÓN
    // ==========================================
    
    function iniciarGaleria() {
        grid.innerHTML = ''; 
        fotosEnPantalla = [];

        const limite = Math.min(MAX_FOTOS_PANTALLA, baseDeDatosFotos.length);

        for (let i = 0; i < limite; i++) {
            const nuevoIndex = obtenerFotoAleatoria();
            fotosEnPantalla.push(nuevoIndex);
            grid.appendChild(crearCuadroFoto(baseDeDatosFotos[nuevoIndex]));
        }

        if (baseDeDatosFotos.length > limite) {
            mezclarPosiciones(); 
            arrancarRotacion();
        } else {
            btnShowAll.style.display = 'none';
        }
    }

    function cambiarUnaFoto() {
        if (estadoGaleriaCompleta) return; 

        // Si ya repartimos todas las cartas, volvemos a mezclar el mazo
        if (posicionesDisponibles.length === 0) {
            mezclarPosiciones();
        }

        const posicionA_Cambiar = posicionesDisponibles.pop();
        const nuevaFotoIndex = obtenerFotoAleatoria();
        fotosEnPantalla[posicionA_Cambiar] = nuevaFotoIndex;

        const cuadritosHTML = grid.querySelectorAll('.gallery__item');
        const cuadroTarget = cuadritosHTML[posicionA_Cambiar];
        const imgTarget = cuadroTarget.querySelector('.gallery__img');

        cuadroTarget.classList.add('fade-out');

        const imagenTemporal = new Image();
        imagenTemporal.onload = () => {
            setTimeout(() => {
                imgTarget.src = imagenTemporal.src;
                cuadroTarget.classList.remove('fade-out');
            }, 400); 
        };
        imagenTemporal.src = baseDeDatosFotos[nuevaFotoIndex];
    }

    function arrancarRotacion() {
        // NUEVO: Limpiamos cualquier intervalo previo por seguridad antes de crear uno nuevo
        clearInterval(rotacionAutomatica);

        rotacionAutomatica = setInterval(() => {
            let cantidadACambiar = Math.floor(Math.random() * (MAX_CAMBIOS - MIN_CAMBIOS + 1)) + MIN_CAMBIOS;
            
            for(let i=0; i<cantidadACambiar; i++) {
                setTimeout(() => {
                    cambiarUnaFoto();
                }, i * 1750); 
            }
        }, 6000);
    }

    // ==========================================
    // 5. BOTÓN ABRIR/CERRAR GALERÍA COMPLETA
    // ==========================================
    const galleryFrame = document.getElementById('gallery-frame');

    function toggleGaleriaCompleta() {
        // 1. Primero, desvanecemos toda la grilla para que quede invisible
        grid.style.opacity = '0';

        // 2. Esperamos medio segundo (500ms) a que desaparezca por completo para hacer los cambios
        setTimeout(() => {
            
            if (!estadoGaleriaCompleta) {
                // --- ABRIR GALERÍA ---
                clearInterval(rotacionAutomatica);
                grid.innerHTML = '';
                baseDeDatosFotos.forEach(ruta => grid.appendChild(crearCuadroFoto(ruta)));
                btnShowAll.textContent = 'Cerrar galería completa'; 
                estadoGaleriaCompleta = true;
                
            } else {
                // --- CERRAR GALERÍA ---
                iniciarGaleria();
                btnShowAll.textContent = 'Ver galería completa';
                estadoGaleriaCompleta = false;
                
                // Como la página se acaba de acortar de golpe, scrolleamos suavemente 
                // de vuelta al título "Nuestro Book de Trabajos"
                document.getElementById('book-gen').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // 3. Una vez que las fotos ya cambiaron y la pantalla se acomodó, 
            // volvemos a mostrar la grilla suavemente
            grid.style.opacity = '1';

        }, 500); // Este es el medio segundo de espera
    }

    btnShowAll.addEventListener('click', toggleGaleriaCompleta);

    if (galleryFrame) {
        galleryFrame.addEventListener('click', (e) => {
            if (estadoGaleriaCompleta && (e.target === galleryFrame || e.target === grid)) {
                toggleGaleriaCompleta();
            }
        });
    }

    iniciarGaleria();
});
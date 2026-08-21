/* assets/js/modals.js */

// 1. Elementos del DOM
const modal = document.getElementById('price-modal');
const modalContent = document.querySelector('#price-modal .modal__content');
const modalTitle = document.getElementById('modal-title');
const modalList = document.getElementById('modal-list');
const closeBtn = document.getElementById('modal-close-btn');
const overlay = document.getElementById('modal-close-bg');
const openButtons = document.querySelectorAll('.open-modal-btn');

// Guardamos acá qué botón abrió el modal, para devolverle el foco al cerrar
let lastFocusedElement = null;

// 2. Cargamos los datos de servicios desde el JSON
// (separado del código para que se pueda actualizar precios sin tocar JS)
let serviceData = {};

async function loadServiceData() {
    try {
        const response = await fetch('data/services.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        serviceData = await response.json();
    } catch (err) {
        // Si falla la carga (ej: abriste el HTML como file:// en vez de servirlo),
        // lo dejamos loggeado en vez de fallar en silencio.
        console.error('No se pudieron cargar los datos de servicios (data/services.json):', err);
    }
}

// 3. Abrir el modal y cargar datos
function openModalFor(serviceKey, triggerButton) {
    const data = serviceData[serviceKey];

    if (!data) {
        console.warn(`No se encontró data-service="${serviceKey}" en services.json`);
        return;
    }

    // Actualizamos el título
    modalTitle.textContent = data.title;

    // Limpiamos la lista vieja y cargamos la nueva
    modalList.innerHTML = '';
    data.items.forEach(item => {
        const li = document.createElement('li');

        // Chequeamos si este servicio tiene una descripción en la base de datos
        const tieneDesc = Boolean(item.desc);

        // Aviso interno (no visible para el cliente) para los links que quedaron
        // pendientes de revisión en el JSON (item.reviewLink === true).
        // Descomentar la línea de abajo si querés que también se vea en pantalla
        // mientras terminás de cargar los links reales:
        // const reviewBadge = item.reviewLink ? ' <span style="color:#c0392b" title="Revisar link de reserva">⚠</span>' : '';

        li.innerHTML = `
            <div class="modal__item-main">
                <div class="modal__item-info">
                    <span class="modal__name">
                        ${item.name}
                        ${tieneDesc ? `<button class="modal__info-btn" aria-label="Ver detalles"><i aria-hidden="true" class="fa-solid fa-circle-info"></i></button>` : ''}
                    </span>
                    <span class="modal__price">${item.price}</span>
                </div>
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="button button--primary modal__btn-reservar">Reservar</a>
            </div>
            ${tieneDesc ? `
                <div class="modal__item-desc">
                    <div class="modal__item-desc-content">
                        ${item.desc}
                    </div>
                </div>` : ''}
        `;

        if (item.reviewLink) {
            li.dataset.reviewLink = 'true'; // marca interna, no se ve en pantalla
        }

        modalList.appendChild(li);
    });

    // Guardamos quién abrió el modal para devolverle el foco al cerrar
    lastFocusedElement = triggerButton;

    // Mostramos la ventana
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    // Bloqueamos el scroll de fondo
    document.body.style.overflow = 'hidden';

    // Foco accesible: lo mandamos al botón de cerrar
    closeBtn.focus();
}

openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceKey = button.getAttribute('data-service');
        openModalFor(serviceKey, button);
    });
});

// 4. Cerrar el modal
function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    // Devolvemos el scroll
    document.body.style.overflow = '';

    // Devolvemos el foco a quien abrió el modal
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal); // Cierra si tocás la zona oscura

// 5. Cerrar modal con la tecla ESC + trampa de foco (focus trap)
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    if (e.key === 'Tab') {
        const focusables = modalContent.querySelectorAll(
            'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

// ==========================================
// 6. MOTOR DE DELEGACIÓN DE EVENTOS (Ahorro de Memoria)
// ==========================================
modalList.addEventListener('click', (e) => {
    // Nos fijamos si el elemento clickeado (o un padre de él) es el botón de info
    const infoBtn = e.target.closest('.modal__info-btn');
    if (!infoBtn) return;

    // A partir del botón clickeado, buscamos a qué tarjeta (<li>) pertenece
    const li = infoBtn.closest('li');
    const descDiv = li.querySelector('.modal__item-desc');

    const estabaAbierta = descDiv.classList.contains('show');

    // 1. Cerramos TODAS las descripciones de la lista para mantener el orden
    modalList.querySelectorAll('.modal__item-desc').forEach(div => div.classList.remove('show'));
    modalList.querySelectorAll('.modal__info-btn').forEach(btn => btn.classList.remove('active'));

    // 2. Si la pestaña que tocamos estaba cerrada, la abrimos
    if (!estabaAbierta) {
        descDiv.classList.add('show');
        infoBtn.classList.add('active');
    }
});

// ==========================================
// 8. ANIMACIÓN DEL TÍTULO AL SCROLLEAR
// ==========================================
modalContent.addEventListener('scroll', () => {
    // Lectura del estado local del scroll dentro de la ventana emergente
    const scrollPosition = modalContent.scrollTop;

    // Lógica de adición/remoción de la clase compacta
    if (scrollPosition > 10) {
        modalTitle.classList.add('modal__title--compact');
    } else {
        modalTitle.classList.remove('modal__title--compact');
    }
});

// 7. Arrancamos: cargamos los datos apenas el script se ejecuta
loadServiceData();

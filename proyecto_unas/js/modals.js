/* assets/js/modals.js */

// 1. Nuestra "Base de Datos" local
const serviceData = {

    // Cada uno de estos bloques son ventanas emergentes.

    "retiro": {
        title: "Retiro",
        items: [
            { name: "Retiro",
            price: "$10.000",
            desc: `<strong> Remoción total de un servicio tanto nuestro, como de otro salón. </strong>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/101121-retirado#reservar" 
            }

        ]
    },

    "pedicura": {
        title: "Pedicura",
        items: [
            {name: "Esmaltado semipermanente pies", 
            price: "$24.000", 
            desc: `<strong>Nuestro servicio no incluye remoción de durezas plantares.</strong>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/101363-esmaltado-semipermanente-pies#reservar" }
        ]
    },

    "capping": {
        title: "Capping",
        items: [
            { name: "Capping Liso", 
            price: "$24.500", 
            desc: `<strong>Incluye deco en dos uñas</strong>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/33050-capping-liso#reservar" },
            { name: "Capping French", 
            price: "$25.000", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/91328-capping-french#reservar" },
            { name: "Capping cromo/ojo de gato", 
            price: "$26.500", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/96674-capping-cromo-en-todasojo-de-gato#reservar" },
            { name: "Capping Full mix/baby bommer", 
            price: "$27.000", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/91332-capping-full-mix-o-baby-bommer#reservar" }
        ]

    },

    "manicuria": {
        title: "Manicuria",
        items: [
            { name: "Semipermanente Liso", 
            price: "$20.000", 
            desc: `<strong>Incluye deco en dos uñas</strong>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/17084-semipermanente-liso#reservar" },
            { name: "Semipermanente French", 
            price: "$21.500", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/17085-semipermanente-french#reservar" },
            { name: "Semipermanente Semi Full",  
            price: "$23.000", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/17086-semipermanente-semi-full#reservar" }
        ]
    },

    "softgel": {
        title: "Soft Gel",
        items: [
            { name: "Soft gel", 
            price: "$26.000", 
            desc: `<strong>Incluye</strong>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/114377-soft-gel#reservar" }
        ]
    },

    "esculpidas": {
        title: "Uñas Esculpidas",
        items: [
            { name: "Esculpidas liso", 
            price: "$26.000", 
            desc: `<strong>Incluye deco en dos uñas</strong>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/33569-esculpidas-liso#reservar" },
            { name: "Esculpidas French", 
            price: "$27.000", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/91336-esculpidas-french#reservar" },
            { name: "Esculpidas Ojo de gato / Cromo en todas", 
            price: "$28.000", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/91337-esculpidas-ojo-de-gato-cromo-en-todas#reservar" },
            { name: "Esculpidas Full Mix / Baby Boomer", 
            price: "$30.000", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/91338-esculpidas-full-mix-baby-boomer#reservar" },
            { name: "Esculpidas Lisas con Isis", 
            price: "$26.000", 
            desc: `<strong>-Nuestro servicio incluye:</strong>
                    <ul>
                        <li>incluido</li>
                        <li>incluido</li>
                        <li>incluido</li>
                    </ul>`,
            link: "https://www.wonoma.com/es-AR/salon/santas-unas/servicio/121895-esculpidas-liso-con-isis/profesional/22964-isis-quimey#reservar"}
        ]
    },

};

// 2. Elementos del DOM
const modal = document.getElementById('price-modal');
const modalTitle = document.getElementById('modal-title');
const modalList = document.getElementById('modal-list');
const closeBtn = document.getElementById('modal-close-btn');
const overlay = document.getElementById('modal-close-bg');
const openButtons = document.querySelectorAll('.open-modal-btn');

// 3. Abrir el modal y cargar datos
openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Buscamos el nombre del servicio en el botón (ej: "esculpidas")
        const serviceKey = button.getAttribute('data-service');
        const data = serviceData[serviceKey]; // Buscamos los precios en nuestra "Base de datos"

        if (data) {
            // Actualizamos el título
            modalTitle.textContent = data.title;
            
            // Limpiamos la lista vieja y cargamos la nueva
            // Limpiamos la lista vieja y cargamos la nueva
            modalList.innerHTML = '';
            data.items.forEach(item => {
                const li = document.createElement('li');
                
                // Chequeamos si este servicio tiene una descripción en la base de datos
                const tieneDesc = item.desc ? true : false;

                // Armamos la nueva estructura
                li.innerHTML = `
                    <div class="modal__item-main">
                        <div class="modal__item-info">
                            <span class="modal__name">
                                ${item.name} 
                                ${tieneDesc ? `<button class="modal__info-btn" aria-label="Ver detalles"><i class="fa-solid fa-circle-info"></i></button>` : ''}
                            </span>
                            <span class="modal__price">${item.price}</span>
                        </div>
                        <a href="${item.link}" target="_blank" class="button button--primary modal__btn-reservar">Reservar</a>
                    </div>
                    ${tieneDesc ? `
                        <div class="modal__item-desc">
                            <div class="modal__item-desc-content">
                                ${item.desc}
                            </div>
                        </div>` : ''}
                `;
                
                // Si tiene descripción, le damos vida al botoncito de (i)
                if (tieneDesc) {
                    const infoBtn = li.querySelector('.modal__info-btn');
                    const descDiv = li.querySelector('.modal__item-desc');
                    
                    infoBtn.addEventListener('click', () => {
                        // 1. Nos fijamos si la pestaña que tocamos ya estaba abierta
                        const estabaAbierta = descDiv.classList.contains('show');

                        // 2. Buscamos TODAS las descripciones y botones de esta lista y los cerramos
                        const todasLasDesc = modalList.querySelectorAll('.modal__item-desc');
                        const todosLosBotones = modalList.querySelectorAll('.modal__info-btn');
                        
                        todasLasDesc.forEach(div => div.classList.remove('show'));
                        todosLosBotones.forEach(btn => btn.classList.remove('active'));

                        // 3. Si la pestaña que tocamos NO estaba abierta originalmente, la abrimos
                        // (Si ya estaba abierta, el paso 2 la cerró y se queda así)
                        if (!estabaAbierta) {
                            descDiv.classList.add('show');
                            infoBtn.classList.add('active');
                        }
                    });
                }

                modalList.appendChild(li);
            });

            // Mostramos la ventana
            modal.classList.add('active');
            
            // NUEVO: Bloqueamos el scroll
            document.body.style.overflow = 'hidden'; 
        }
    });
});

// 4. Cerrar el modal
function closeModal() {
    modal.classList.remove('active');
    
    // NUEVO: Devolvemos el scroll
    document.body.style.overflow = ''; 
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal); // Cierra si tocás la zona oscura

// 5. Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    // Si la tecla presionada es Escape y el modal está abierto (tiene la clase active)
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
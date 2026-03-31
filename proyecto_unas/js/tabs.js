/* assets/js/tabs.js */

document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleries = document.querySelectorAll('.personal-gallery');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isActive = btn.classList.contains('active');

            // 1. Apagamos todos los botones
            tabBtns.forEach(b => b.classList.remove('active'));

            // 2. Cerramos las galerías de forma segura
            galleries.forEach(g => {
                if (g.classList.contains('active')) {
                    g.classList.remove('active');
                    
                    // Solo animamos la salida si el usuario clickea el mismo botón para cerrar
                    if (isActive) {
                        g.classList.add('cerrando');
                        setTimeout(() => {
                            // Verificamos que la clase siga ahí antes de removerla (evita bugs por clics rápidos)
                            if (g.classList.contains('cerrando')) {
                                g.classList.remove('cerrando');
                            }
                        }, 500);
                    }
                } else {
                    // Fallback de seguridad: limpiamos clases fantasma si el usuario hace clics muy rápidos
                    g.classList.remove('cerrando');
                }
            });

            // 3. Si estábamos tocando un botón apagado, lo prendemos y abrimos su caja
            if (!isActive) {
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const targetBox = document.getElementById(targetId);
                
                targetBox.classList.remove('cerrando'); // Por si estaba a medio cerrar
                targetBox.classList.add('active');
            }
        });
    });

    // ==========================================
    // CERRAR GALERÍA TOCANDO EL AVATAR
    // ==========================================
    const avataresCaja = document.querySelectorAll('.personal-gallery__avatar');
    
    avataresCaja.forEach(avatar => {
        avatar.addEventListener('click', () => {
            // Hacemos que la chica vuelva al podio
            tabBtns.forEach(b => b.classList.remove('active'));

            // Le ponemos la animación de salida a la caja activa
            galleries.forEach(g => {
                if (g.classList.contains('active')) {
                    g.classList.remove('active');
                    g.classList.add('cerrando');
                    setTimeout(() => g.classList.remove('cerrando'), 500);
                }
            });
        });
    });
});

// ==========================================
// ABRIR BOOK AUTOMÁTICAMENTE DESDE EL INICIO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Leemos si la URL tiene un "#" al final (ej: "#book-isis")
    const hash = window.location.hash; 

    if (hash) {
        // 2. Le sacamos el "#" para que quede solo "book-isis"
        const targetId = hash.substring(1); 
        
        // 3. Buscamos el botón que corresponde a esa chica
        const targetButton = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
        
        if (targetButton) {
            // 4. Esperamos medio segundo a que cargue la página y simulamos el "Click"
            setTimeout(() => {
                targetButton.click();
                
                // 5. Scrolleamos la pantalla suavemente hasta la sección completa de las chicas
                document.querySelector('.personal-books').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
});
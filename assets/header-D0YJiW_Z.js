var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((()=>{var e=`
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
                    <li class="nav__item"><a href="turnos.html" class="nav__link nav__link--cta">Reserva Turno</a></li>
                </ul>
                <button class="nav__close" aria-label="Cerrar menú">✕</button>
            </nav>
        </div>
    </header>
`,t=`
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
`;document.body.insertAdjacentHTML(`afterbegin`,e);var n=document.querySelector(`main`);n&&n.insertAdjacentHTML(`afterend`,t);var r=window.location.pathname.split(`/`).pop()||`index.html`,i=document.querySelectorAll(`.nav__link`);if(i.forEach(e=>e.classList.remove(`active`)),!r.includes(`index.html`)&&r!==``)i.forEach(e=>{e.getAttribute(`href`).includes(r)&&e.classList.add(`active`)});else{let e=document.querySelectorAll(`#inicio, #servicios, #nosotras, #courses-promo`),t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=e.target.getAttribute(`id`);if(i.forEach(e=>e.classList.remove(`active`)),t===`courses-promo`){let e=document.querySelector(`.nav__link[href="cursos.html"]`);e&&e.classList.add(`active`)}else{let e=document.querySelector(`.nav__link[href="index.html#${t}"]`);e&&e.classList.add(`active`)}}})},{root:null,rootMargin:`-40% 0px -60% 0px`,threshold:0});e.forEach(e=>t.observe(e))}var a=document.getElementById(`nav-menu`),o=document.querySelector(`.header__toggle`),s=document.querySelector(`.nav__close`);o&&o.addEventListener(`click`,()=>{a.classList.add(`show-menu`),document.body.style.overflow=`hidden`}),s&&s.addEventListener(`click`,()=>{a.classList.remove(`show-menu`),document.body.style.overflow=``});var c=document.querySelectorAll(`.nav__link`),l=()=>{a.classList.remove(`show-menu`),document.body.style.overflow=``};c.forEach(e=>e.addEventListener(`click`,l)),document.addEventListener(`click`,e=>{a.classList.contains(`show-menu`)&&!a.contains(e.target)&&!o.contains(e.target)&&(a.classList.remove(`show-menu`),document.body.style.overflow=``)});var u=document.getElementById(`scroll-top`);u&&(window.addEventListener(`scroll`,()=>{window.scrollY>=500?u.classList.add(`show-scroll`):u.classList.remove(`show-scroll`)}),u.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})})),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.querySelectorAll(`.reveal`),t=new IntersectionObserver((e,t)=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`active`),t.unobserve(e.target))})},{rootMargin:`0px 0px -50px 0px`,threshold:.1});e.forEach(e=>{t.observe(e)})})}));export{e as n,t};
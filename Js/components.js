/* =========================================================
   ERSVISA — components.js
   Injects the navbar and footer on every page from a single
   source of truth. This avoids duplicating the same header/
   footer markup on each page (which could drift out of sync),
   and avoids relative-path bugs between root-level pages and
   pages inside /pages/.
   Requires: <div id="site-header"></div> and <div id="site-footer"></div>
   in every page's HTML, and must load BEFORE navbar.js.
   ========================================================= */

(function () {
    const inSubfolder = window.location.pathname.includes('/pages/');
    const base = inSubfolder ? '../' : '';
    const pagesBase = inSubfolder ? '' : 'pages/';
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    const navLinks = [
        { href: base + 'index.html', label: 'Inicio', match: ['index.html', ''] },
        { href: pagesBase + 'offices.html', label: 'Oficinas', match: ['offices.html'] },
        { href: pagesBase + 'about.html', label: 'Nosotros', match: ['about.html'] },
    ];

    function renderHeader() {
        const target = document.getElementById('site-header');
        if (!target) return;

        const linksHtml = navLinks.map((link) => {
            const isActive = link.match.indexOf(currentFile) !== -1;
            return `<li><a href="${link.href}"${isActive ? ' class="active-link" aria-current="page"' : ''}>${link.label}</a></li>`;
        }).join('');

        target.innerHTML = `
      <header id="menu" class="navbar">
        <a href="${base}index.html" class="logo" aria-label="ErsVisa - Inicio">ERS<span>VISA</span></a>
        <button type="button" class="menu-toggle" id="menuToggle" aria-label="Abrir menú de navegación" aria-expanded="false" aria-controls="navMenu">
          <span></span><span></span><span></span>
        </button>
        <nav id="navMenu">
          <ul>
            ${linksHtml}
            <li><a href="${pagesBase}booking.html" class="btn-date-navbar">Reservar Cita</a></li>
          </ul>
        </nav>
      </header>`;
    }

    function renderFooter() {
        const target = document.getElementById('site-footer');
        if (!target) return;

        // The booking page already shows phone, email and address in detail
        // in its own content, so the footer doesn't repeat them there —
        // instead it offers something the rest of that page doesn't.
        const isBookingPage = currentFile === 'booking.html';

        const contactColumn = isBookingPage
            ? `<div class="footer-col contact">
            <h3>Horario de Atención</h3>
            <ul>
              <li><i class="fas fa-clock" aria-hidden="true"></i> Lunes a Viernes: 9:00 am – 5:00 pm</li>
              <li><i class="fas fa-clock" aria-hidden="true"></i> Sábados: 9:00 am – 1:00 pm</li>
              <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i><a href="${pagesBase}offices.html">Ver todas las oficinas</a></li>
            </ul>
          </div>`
            : `<div class="footer-col contact">
            <h3>Contáctanos</h3>
            <ul>
              <li><i class="fas fa-envelope" aria-hidden="true"></i><a href="mailto:ersvisa@gmail.com">ersvisa@gmail.com</a></li>
              <li><i class="fab fa-whatsapp" aria-hidden="true"></i><a href="https://wa.link/uropst" target="_blank" rel="noopener noreferrer">+1 809-397-5678</a></li>
              <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i><a href="${pagesBase}offices.html">Nuestras Oficinas</a></li>
            </ul>
          </div>`;

        target.innerHTML = `
      <footer class="main-footer" role="contentinfo">
        <div class="footer-container">
          ${contactColumn}

          <div class="footer-col quick-links">
            <h3>Navegación Rápida</h3>
            <ul>
              <li><a href="${base}index.html">Inicio</a></li>
              <li><a href="${pagesBase}offices.html">Oficinas</a></li>
              <li><a href="${pagesBase}about.html">Nosotros</a></li>
              <li><a href="${pagesBase}booking.html">Reservar Cita</a></li>
            </ul>
          </div>

          <div class="footer-col legal">
            <h3>Legal</h3>
            <ul>
              <li><a href="${pagesBase}privacy-policy.html">Política de Privacidad</a></li>
              <li><a href="${pagesBase}terms-conditions.html">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div class="footer-col social">
            <h3>Síguenos</h3>
            <div class="social-icons">
              <a href="https://www.facebook.com/ersvisa/" target="_blank" aria-label="Facebook" rel="noopener noreferrer"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
              <a href="https://www.instagram.com/ersvisa_abogados_migratorios/" target="_blank" aria-label="Instagram" rel="noopener noreferrer"><i class="fab fa-instagram" aria-hidden="true"></i></a>
            </div>
          </div>

          <div class="footer-col brand">
            <h3>ERS<span>VISA</span></h3>
            <p>Tu socio confiable en el camino hacia tus sueños migratorios.</p>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ERSVISA. Todos los derechos reservados.</p>
          <p>Diseñado por Dariel Restituyo</p>
        </div>
      </footer>`;
    }

    function renderWhatsAppFloat() {
        // The booking page already has a prominent WhatsApp card in its own
        // content, so the floating button doesn't repeat there.
        if (currentFile === 'booking.html') return;

        const btn = document.createElement('a');
        btn.href = 'https://wa.link/uropst';
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.className = 'whatsapp-float';
        btn.setAttribute('aria-label', 'Escríbenos por WhatsApp');
        btn.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
        document.body.appendChild(btn);
    }

    renderHeader();
    renderFooter();
    renderWhatsAppFloat();
})();

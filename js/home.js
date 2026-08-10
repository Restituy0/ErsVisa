/* Behavior specific to index.html:
   1) Service tabs with expandable cards
   2) Image carousel in the intro/hero section
   3) FAQ accordion */

/* ---------- 1) Service tabs ---------- */
(function () {
    const cardData = {
        visas: [
            { icon: 'fa-solid fa-passport', title: 'Proceso de Visa', description: 'Te ayudamos con todo el proceso de solicitud, desde el llenado del formulario hasta la entrevista consular.' },
            { icon: 'fa-regular fa-gem', title: 'Visa de Novio', description: 'Unimos corazones en el marco legal adecuado, acompañándote en cada etapa del proceso.' },
            { icon: 'fa-solid fa-file-circle-check', title: 'Perdón (Waiver)', description: 'Asistencia legal especializada para casos de inadmisibilidad migratoria.' }
        ],
        legalization: [
            { icon: 'fa-solid fa-file-signature', title: 'Documentos Legales', description: 'Asesoramiento y gestión para la legalización de tus documentos ante las autoridades correspondientes.' },
            { icon: 'fa-solid fa-stamp', title: 'Certificaciones Apostilladas', description: 'Tramitamos la apostilla de tus documentos para que tengan validez internacional.' },
            { icon: 'fa-solid fa-globe', title: 'Traducciones Juradas', description: 'Servicio de traducción oficial de documentos con plena validez legal.' }
        ],
        notarization: [
            { icon: 'fa-solid fa-pen-fancy', title: 'Notarización de Documentos', description: 'Certificación de la autenticidad de firmas y documentos ante notario.' },
            { icon: 'fa-solid fa-file-shield', title: 'Declaraciones Juradas', description: 'Asistencia en la redacción y notarización de declaraciones bajo juramento.' },
            { icon: 'fa-solid fa-id-card', title: 'Poderes Notariales', description: 'Elaboración y notarización de poderes para representación legal.' }
        ],
        consultations: [
            { icon: 'fa-solid fa-comments', title: 'Consulta General', description: 'Orientación inicial clara sobre tus opciones migratorias.' },
            { icon: 'fa-solid fa-user-shield', title: 'Consulta con Abogado', description: 'Asesoramiento legal detallado con un especialista en migración.' },
            { icon: 'fa-solid fa-calendar-check', title: 'Revisión de Caso', description: 'Análisis exhaustivo de tu situación migratoria actual y futura.' }
        ]
    };

    const tabs = document.querySelectorAll('.tab');
    const cardsContainer = document.getElementById('cards-container');
    if (!tabs.length || !cardsContainer) return;

    function renderCards(category) {
        cardsContainer.classList.add('fade-out');

        setTimeout(() => {
            const cards = cardData[category].map((card) => `
        <div class="card-container">
          <div class="card" role="button" tabindex="0" aria-expanded="false" aria-label="${card.title}. Toca para ver el detalle.">
            <i class="${card.icon}" aria-hidden="true"></i>
            <h3>${card.title}</h3>
            <div class="card-desc">
              <p>${card.description}</p>
            </div>
            <div class="hint"><span>Ver más</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></div>
          </div>
        </div>`).join('');

            cardsContainer.innerHTML = cards;
            cardsContainer.classList.remove('fade-out');

            document.querySelectorAll('.card').forEach((card) => {
                function toggle() {
                    const isExpanded = card.classList.toggle('expanded');
                    card.setAttribute('aria-expanded', String(isExpanded));
                }

                card.addEventListener('click', toggle);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle();
                    }
                });
            });
        }, 250);
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const selectedTab = tab.getAttribute('data-tab');
            cardsContainer.setAttribute('aria-labelledby', `tab-${selectedTab}`);
            renderCards(selectedTab);
        });
    });

    renderCards('visas');
})();

/* ---------- 2) Hero carousel ---------- */
(function () {
    const images = ['img/hero-1.jpeg', 'img/hero-2.avif', 'img/hero-3.jpeg', 'img/hero-4.webp'];
    const carousel = document.querySelector('.hero-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!carousel || !dotsContainer) return;

    let current = 0;
    let interval;

    function setImage(index) {
        current = index;
        carousel.style.backgroundImage = `url('${images[current]}')`;
        updateDot();
    }

    function updateDot() {
        dotsContainer.querySelectorAll('button').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
            dot.setAttribute('aria-selected', String(i === current));
        });
    }

    function createDots() {
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('id', `carousel-dot-${i}`);
            dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
            dot.addEventListener('click', () => {
                clearInterval(interval);
                setImage(i);
                autoRotate();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function autoRotate() {
        interval = setInterval(() => {
            current = (current + 1) % images.length;
            setImage(current);
        }, 5000);
    }

    createDots();
    setImage(0);
    autoRotate();
})();

/* ---------- 3) FAQ ---------- */
(function () {
    document.querySelectorAll('.faq-question').forEach((question) => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.toggle('active');
            answer.classList.toggle('show');
            question.setAttribute('aria-expanded', String(isActive));
        });

        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
})();

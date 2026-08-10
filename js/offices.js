/* Image gallery per office for the "Offices" page. Each office has its
   real exterior photo plus a couple of example images (clearly labeled
   as such) for the "interior" and "surroundings" categories until real
   photos are added. */
(function () {
    const modal = document.getElementById('galleryModal');
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;
    const mainImg = document.getElementById('galleryMainImage');
    const caption = document.getElementById('galleryCaption');
    const thumbsContainer = document.getElementById('galleryThumbs');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (!modal || !mainImg || !thumbsContainer) return;

    function placeholderImage(label, tone) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
      <rect width="640" height="480" fill="${tone}"/>
      <text x="320" y="225" font-family="Arial, sans-serif" font-size="26" fill="#ffffff" text-anchor="middle" opacity="0.9">${label}</text>
      <text x="320" y="260" font-family="Arial, sans-serif" font-size="15" fill="#ffffff" text-anchor="middle" opacity="0.75">Imagen de ejemplo</text>
    </svg>`;
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }

    const galleries = {
        'office-1': [
            { src: '../img/office-1.jpg', caption: 'Fachada — Plaza Rodriguez' },
            { src: placeholderImage('Interior', '#011063'), caption: 'Interior (imagen de ejemplo)' },
            { src: placeholderImage('Alrededores', '#ca0101'), caption: 'Alrededores (imagen de ejemplo)' },
        ],
        'office-2': [
            { src: '../img/office-2.jpg', caption: 'Fachada — Sombra I' },
            { src: placeholderImage('Interior', '#011063'), caption: 'Interior (imagen de ejemplo)' },
            { src: placeholderImage('Alrededores', '#ca0101'), caption: 'Alrededores (imagen de ejemplo)' },
        ],
        'office-3': [
            { src: '../img/office-3.jpeg', caption: 'Fachada — Sombra II' },
            { src: placeholderImage('Interior', '#011063'), caption: 'Interior (imagen de ejemplo)' },
            { src: placeholderImage('Alrededores', '#ca0101'), caption: 'Alrededores (imagen de ejemplo)' },
        ],
    };

    let currentImages = [];
    let currentIndex = 0;

    function renderThumbs() {
        thumbsContainer.innerHTML = '';
        currentImages.forEach((img, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = i === currentIndex ? 'active' : '';
            btn.setAttribute('aria-label', img.caption);
            btn.innerHTML = `<img src="${img.src}" alt="" loading="lazy">`;
            btn.addEventListener('click', () => showImage(i));
            thumbsContainer.appendChild(btn);
        });
    }

    function showImage(index) {
        currentIndex = (index + currentImages.length) % currentImages.length;
        const img = currentImages[currentIndex];
        mainImg.src = img.src;
        mainImg.alt = img.caption;
        if (caption) caption.textContent = img.caption;
        thumbsContainer.querySelectorAll('button').forEach((btn, i) => {
            btn.classList.toggle('active', i === currentIndex);
        });
    }

    function openGallery(officeKey) {
        currentImages = galleries[officeKey] || [];
        if (!currentImages.length) return;
        currentIndex = 0;
        renderThumbs();
        showImage(0);
        modal.classList.remove('hidden');
    }

    function closeGallery() {
        modal.classList.add('hidden');
        mainImg.src = '';
    }

    document.querySelectorAll('.btn-gallery[data-gallery]').forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openGallery(button.getAttribute('data-gallery'));
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    if (closeBtn) closeBtn.addEventListener('click', closeGallery);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGallery();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
})();

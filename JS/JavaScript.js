    /*Modal  - Pagina Inicio */
    function toggleModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('overlay');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        overlay.classList.toggle('show-overlay');
    }

    window.onclick = function (event) {
        const modals = document.getElementsByClassName('modal');
        for (const modal of modals) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.getElementById('overlay').classList.remove('show-overlay');
            }
        }
    };
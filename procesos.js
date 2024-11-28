const categories = document.querySelectorAll('.categoria');
const cards = document.querySelectorAll('.card');

categories.forEach(category => {
    category.addEventListener('click', () => {
        document.querySelector('.categoria.active').classList.remove('active');
        category.classList.add('active');
        const selectedCategory = category.getAttribute('data-category');
        
        cards.forEach(card => {
            if (card.classList.contains(selectedCategory)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

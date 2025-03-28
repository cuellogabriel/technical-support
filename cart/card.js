document.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('active');

        const btn = header.querySelector('.toggle-btn');
        btn.textContent = content.classList.contains('active') ? '-' : '+';
    });
});


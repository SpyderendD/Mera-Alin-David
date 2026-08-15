document.getElementById('year').textContent = new Date().getFullYear();

const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
});

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) * 0.01;
    const y = (e.clientY - window.innerHeight / 2) * 0.01;
    document.querySelectorAll('.island').forEach(island => {
        island.style.transform = `translate(${x}px, ${y}px)`;
    });
});
// =========================================================================
//             CĂSUȚA DE NOUTĂȚI - ADAUGĂ ACTIVITĂȚI NOI AICI
// =========================================================================
const NOUTATI = [
    {
        data: "28 Aug 2026",
        text: "Am regândit complet structura adaptivă! Acum site-ul se așază în 3 coloane pe desktop și într-un feed optimizat pe mobil.",
        icon: "🚀",
        link: "#"
    },
    {
        data: "22 Aug 2026",
        text: "Am scris o poezie: Forfota",
        icon: "✍️",
        link: "https://poezie.ro/atelier/alin-david-mera/poezie/14202822/forfota"
    },
    {
        data: "18 Aug 2026",
        text: "Am publicat un nou set de lecții interactive pentru elevi.",
        icon: "📚",
        link: "https://invatam-impreuna.vercel.app/"
    }
];

// =========================================================================
//                   RANDAREA AUTOMATĂ A NOUTĂȚILOR
// =========================================================================
const renderNews = () => {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    newsContainer.innerHTML = NOUTATI.map(item => {
        const hasValidLink = item.link && item.link !== '#';
        const targetAttr = hasValidLink ? 'target="_blank" rel="noopener"' : '';
        const clickPrevention = !hasValidLink ? 'onclick="event.preventDefault();" style="cursor: default;"' : '';

        return `
            <a href="${item.link}" class="news-item" ${targetAttr} ${clickPrevention}>
                <div class="news-icon" aria-hidden="true">${item.icon}</div>
                <div class="news-content">
                    <span class="news-date">${item.data}</span>
                    <p class="news-text">${item.text}</p>
                </div>
            </a>
        `;
    }).join('');
};

document.addEventListener('DOMContentLoaded', renderNews);


// =========================================================================
//        MENIU BURGER PENTRU MOBIL
// =========================================================================
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        const isOpen = burgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        burgerBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            burgerBtn.setAttribute('aria-expanded', 'false');
        });
    });
}


// =========================================================================
//                   GESTIONARE AN ȘI TEMĂ (LIGHT/DARK)
// =========================================================================
document.getElementById('year').textContent = new Date().getFullYear();

const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        // Repornim forțat video-ul de fundal întunecat pentru browserele mobile care îl pun în repaus
        const darkVideo = document.getElementById('video-dark');
        if (darkVideo) darkVideo.play().catch(() => {});
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        // Repornim forțat video-ul de fundal luminos pentru browserele mobile care îl pun în repaus
        const lightVideo = document.getElementById('video-light');
        if (lightVideo) lightVideo.play().catch(() => {});
    }
});


// =========================================================================
//                 PARALLAX FLUID PENTRU DESKTOP
// =========================================================================
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.007;
        const y = (e.clientY - window.innerHeight / 2) * 0.007;
        
        document.querySelectorAll('.island').forEach(island => {
            island.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    document.addEventListener('mouseleave', () => {
        document.querySelectorAll('.island').forEach(island => {
            island.style.transform = `translate(0px, 0px)`;
        });
    });
}
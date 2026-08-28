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
        text: "Am postat o poezie nouă în secțiunea de creație literară.",
        icon: "✍️",
        link: "https://invatam-impreuna.vercel.app/"
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
//        MENIU BURGER CU EXTINDERE INTEGRATĂ PENTRU MOBIL
// =========================================================================
const burgerBtn = document.getElementById('burger-btn');
const topNav = document.querySelector('.top-nav');

if (burgerBtn && topNav) {
    burgerBtn.addEventListener('click', () => {
        const isOpen = topNav.classList.toggle('open');
        burgerBtn.classList.toggle('open');
        burgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Închidem navbar-ul extins automat la apăsarea oricărui link
    topNav.querySelectorAll('.nav-center a').forEach(link => {
        link.addEventListener('click', () => {
            topNav.classList.remove('open');
            burgerBtn.classList.remove('open');
            burgerBtn.setAttribute('aria-expanded', 'false');
        });
    });
}


// =========================================================================
//                   GESTIONARE SURSĂ VIDEO DINAMICĂ (LIGHT/DARK)
// =========================================================================
document.getElementById('year').textContent = new Date().getFullYear();

const bgVideo = document.getElementById('bg-video');
const videoSource = document.getElementById('video-source');

// Funcție de optimizare a descărcării: comută sursa dintr-un singur element video
const updateVideoSource = (isDarkMode) => {
    if (!bgVideo || !videoSource) return;
    const targetSource = isDarkMode ? "fundal-intunecat.mp4" : "fundal-luminos.mp4";
    const targetPoster = isDarkMode ? "poster-dark.png" : "poster-light.png";

    // Reîncărcăm doar dacă sursa este diferită de cea activă
    if (!videoSource.src.includes(targetSource)) {
        videoSource.src = targetSource;
        bgVideo.poster = targetPoster;
        bgVideo.load();
        bgVideo.play().catch(() => {});
    }
};

// Inițializăm sursa corectă la prima încărcare a paginii
updateVideoSource(true);

const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        updateVideoSource(true);
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        updateVideoSource(false);
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


// =========================================================================
//         EFECT MAGNETIC PE DESKTOP PENTRU BUTOANE/SOCIALS
// =========================================================================
const magnets = document.querySelectorAll('.social-card, .uiverse-launch');
if (window.matchMedia('(pointer: fine)').matches) {
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const bound = btn.getBoundingClientRect();
            const x = e.clientX - bound.left - bound.width / 2;
            const y = e.clientY - bound.top - bound.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.06)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = ''; 
        });
    });
}


// =========================================================================
//         SCROLL REVEAL NATIV (INTERSECTION OBSERVER)
// =========================================================================
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.12 
    });

    revealElements.forEach(el => revealObserver.observe(el));
}


// =========================================================================
//         BARĂ DE NAVIGAȚIE LIPICIOASĂ (SHRINK ON SCROLL)
// =========================================================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}, { passive: true });
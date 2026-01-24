// Smooth scroll for anchor links

// Smooth scroll for anchor links (including index.html#section from same page)
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only handle if link is to this page (no host or same host)
        const href = this.getAttribute('href');
        const hash = href && href.split('#')[1];
        const isSamePage = !href || href.startsWith('#') || href.startsWith(window.location.pathname + '#') || href.startsWith('index.html#');
        if (hash && isSamePage) {
            const target = document.getElementById(hash) || document.querySelector(`[name='${hash}']`) || document.querySelector('#' + hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL hash without jumping
                history.pushState(null, '', '#' + hash);
            }
        }
    });
});

// Glitch effect for title
const glitchTitle = document.querySelector('.glitch-title');
if (glitchTitle) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchTitle.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => { glitchTitle.style.transform = 'translate(0, 0)'; }, 50);
        }
    }, 100);
}

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Lightbox functionality
function openLightbox(element) {
    const img = element.querySelector('img');
    const caption = element.querySelector('.gallery-caption').textContent;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox active';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close" onclick="closeLightbox(this)">[X]</span>
            <img src="${img.src}" alt="${img.alt}">
            <div class="lightbox-caption">${caption}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox(lightbox.querySelector('.lightbox-close'));
        }
    });

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox(lightbox.querySelector('.lightbox-close'));
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeLightbox(element) {
    const lightbox = element.closest('.lightbox');
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.remove();
        document.body.style.overflow = '';
    }, 300);
}

// Mobile navigation toggle
function toggleMobileNav() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('open');
    }
}

// Close mobile nav when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.querySelectorAll('.nav-btn').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }
});

// --- Top Navigation Bar - Scroll Effect & Mobile Toggle ---
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    
    // Add scroll effect to navbar
    if (navbar) {
        function handleNavbarScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', handleNavbarScroll);
        handleNavbarScroll();
    }
    
    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navBtns = document.querySelectorAll('.nav-btn[href^="#"]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('href') === '#' + id) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
});

// Try to fetch actual filenames from GitHub API and update download links
async function loadReleaseAssets() {
    const DOWNLOAD_BASE = 'https://github.com/0xMartin/TwinWave/releases/latest/download/';
    
    try {
        const response = await fetch('https://api.github.com/repos/0xMartin/TwinWave/releases/latest');
        if (!response.ok) return;
        
        const release = await response.json();
        const assets = release.assets;
        
        // Find files
        const gerberFile = assets.find(a => a.name.startsWith('Gerber_') && a.name.endsWith('.zip'));
        const bomFile = assets.find(a => a.name.startsWith('BOM_') && a.name.endsWith('.xlsx'));
        const pickPlaceFile = assets.find(a => a.name.startsWith('PickAndPlace_') && a.name.endsWith('.xlsx'));
        const stlFile = assets.find(a => a.name.endsWith('.stl'));
        const firmwareFile = assets.find(a => a.name.startsWith('MARAUDER_') && a.name.endsWith('.zip'));
        
        // Update links and text
        if (gerberFile) {
            const link = document.getElementById('gerber-link');
            link.href = DOWNLOAD_BASE + gerberFile.name;
            link.textContent = '📄 ' + gerberFile.name;
        }
        if (bomFile) {
            const link = document.getElementById('bom-link');
            link.href = DOWNLOAD_BASE + bomFile.name;
            link.textContent = '📄 ' + bomFile.name;
        }
        if (pickPlaceFile) {
            const link = document.getElementById('pickplace-link');
            link.href = DOWNLOAD_BASE + pickPlaceFile.name;
            link.textContent = '📄 ' + pickPlaceFile.name;
        }
        if (stlFile) {
            const link = document.getElementById('stl-link');
            link.href = DOWNLOAD_BASE + stlFile.name;
            link.textContent = '📄 ' + stlFile.name;
        }
        if (firmwareFile) {
            const link = document.getElementById('firmware-link');
            link.href = DOWNLOAD_BASE + firmwareFile.name;
            link.textContent = '📄 ' + firmwareFile.name;
        }
        
        console.log('Release assets updated from API');
    } catch (error) {
        console.log('Using default download links');
    }
}

// Load release assets on page load
loadReleaseAssets();

// GitHub Star Popup
function showGithubPopup() {
    const popup = document.getElementById('githubPopup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGithubPopup() {
    const popup = document.getElementById('githubPopup');
    popup.classList.remove('active');
    document.body.style.overflow = '';
    sessionStorage.setItem('githubPopupClosed', 'true');
}

// Show popup after 8 seconds if not already closed in this session
setTimeout(() => {
    if (!sessionStorage.getItem('githubPopupClosed')) {
        showGithubPopup();
    }
}, 8000);

// Close popup on overlay click
document.getElementById('githubPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closeGithubPopup();
    }
});

// Close popup on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('githubPopup').classList.contains('active')) {
        closeGithubPopup();
    }
});

// Generate floating particles
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}
createParticles();

// Parallax effect for glowing orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.glow-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;
        orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// Typing effect for terminal text
function typeEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '> ';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect to hero terminal text
const heroTerminal = document.querySelector('.hero-section .terminal-text');
if (heroTerminal) {
    const text = heroTerminal.textContent.replace('> ', '');
    setTimeout(() => typeEffect(heroTerminal, text, 30), 1000);
}

// Scroll indicator - inicializace po načtení DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    const scrollIndicatorFill = document.querySelector('.scroll-indicator-fill');
    const scrollPercentage = document.querySelector('.scroll-percentage');
    
    console.log('Elements:', scrollIndicatorFill, scrollPercentage);
    
    if (!scrollIndicatorFill || !scrollPercentage) {
        console.error('Scroll indicator elements not found!');
        return;
    }
    
    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const windowHeight = scrollHeight - clientHeight;
        const scrolled = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
        
        console.log('Scroll update:', { scrollTop, scrollHeight, clientHeight, windowHeight, scrolled });
        
        scrollIndicatorFill.style.height = scrolled + '%';
        scrollPercentage.textContent = Math.round(scrolled) + '%';
    }
    
    // Inicializace
    updateScrollIndicator();
    
    // Update při scrollování
    window.addEventListener('scroll', updateScrollIndicator, { passive: true });
    
    // Update při změně velikosti okna
    window.addEventListener('resize', updateScrollIndicator, { passive: true });
    
    console.log('Scroll indicator initialized');
});

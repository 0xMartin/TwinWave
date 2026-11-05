(function () {
    'use strict';

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const downloadIcon = '<i class="fa-solid fa-file-arrow-down"></i>';

    function setLink(id, href, label) {
        const el = document.getElementById(id);
        if (!el) return;
        el.href = href;
        el.innerHTML = downloadIcon + label;
    }

    // --- Config-driven download links -------------------------------------
    function applyConfig() {
        const C = window.TWINWAVE_CONFIG;
        if (!C) return;

        setLink('gerber-link', C.pcb.gerber.url, C.pcb.gerber.filename);
        setLink('bom-link', C.pcb.bom.url, C.pcb.bom.filename);
        setLink('pickplace-link', C.pcb.pickPlace.url, C.pcb.pickPlace.filename);
        setLink('stl-link', C.case.stl.url, C.case.stl.filename);
        setLink('firmware-link', C.firmware.downloadUrl, C.firmware.filename);

        const fwVersion = document.getElementById('fw-version');
        if (fwVersion) fwVersion.textContent = 'Marauder ' + C.firmware.version + ' (ESP32 PICO port)';

        const epro = document.getElementById('easyeda-project-file');
        if (epro) epro.textContent = C.easyeda.projectFile;
    }

    // --- Navbar -----------------------------------------------------------
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.getElementById('navLinks');
        const toggle = document.getElementById('navToggle');
        const fill = $('.scroll-progress-fill');
        const navBtns = $$('.nav-btn[href^="#"]');
        const sections = $$('main > section[id]');

        function closeMenu() {
            navLinks.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });

        function onScroll() {
            navbar.classList.toggle('scrolled', window.scrollY > 24);

            const max = document.documentElement.scrollHeight - window.innerHeight;
            fill.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';

            const probe = window.scrollY + 140;
            let current = null;
            sections.forEach((s) => { if (probe >= s.offsetTop) current = s.id; });
            navBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('href') === '#' + current));
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        onScroll();
    }

    // --- Reveal on scroll -------------------------------------------------
    function initReveal() {
        const items = $$('.reveal');
        if (!('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        items.forEach((el) => io.observe(el));
    }

    // --- Lightbox ---------------------------------------------------------
    function initLightbox() {
        $$('.gallery-item').forEach((item) => {
            item.addEventListener('click', () => openLightbox($('img', item)));
        });
    }

    function openLightbox(img) {
        const box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.innerHTML = '<button class="lightbox-close" aria-label="Close"><i class="fa-solid fa-xmark" style="color:inherit"></i></button><img alt="">';
        const big = $('img', box);
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;

        function close() {
            document.removeEventListener('keydown', onKey);
            box.classList.remove('active');
            setTimeout(() => { box.remove(); document.body.style.overflow = ''; }, 250);
        }
        function onKey(e) { if (e.key === 'Escape') close(); }

        box.addEventListener('click', (e) => { if (e.target !== big) close(); });
        document.addEventListener('keydown', onKey);
        document.body.appendChild(box);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => box.classList.add('active'));
        $('.lightbox-close', box).focus();
    }

    // --- GitHub star popup ------------------------------------------------
    function initPopup() {
        const popup = document.getElementById('githubPopup');
        if (!popup) return;

        function close() {
            popup.classList.remove('active');
            document.body.style.overflow = '';
            sessionStorage.setItem('githubPopupClosed', 'true');
        }

        document.getElementById('githubPopupClose').addEventListener('click', close);
        document.getElementById('githubPopupLater').addEventListener('click', close);
        popup.addEventListener('click', (e) => { if (e.target === popup) close(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) close();
        });

        setTimeout(() => {
            if (!sessionStorage.getItem('githubPopupClosed')) {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }, 8000);
    }

    // --- Latest release asset names ---------------------------------------
    async function loadReleaseAssets() {
        const base = 'https://github.com/0xMartin/TwinWave/releases/latest/download/';
        try {
            const res = await fetch('https://api.github.com/repos/0xMartin/TwinWave/releases/latest');
            if (!res.ok) return;
            const { assets } = await res.json();
            const find = (prefix, ext) => assets.find((a) => a.name.startsWith(prefix) && a.name.endsWith(ext));

            const map = [
                ['gerber-link', find('Gerber_', '.zip')],
                ['bom-link', find('BOM_', '.xlsx')],
                ['pickplace-link', find('PickAndPlace_', '.xlsx')],
                ['stl-link', assets.find((a) => a.name.endsWith('.stl'))],
                ['firmware-link', find('MARAUDER', '.zip')],
            ];
            map.forEach(([id, asset]) => { if (asset) setLink(id, base + asset.name, asset.name); });
        } catch (e) {
            // keep defaults from config
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        applyConfig();
        initNavbar();
        initReveal();
        initLightbox();
        initPopup();
        loadReleaseAssets();
    });
})();

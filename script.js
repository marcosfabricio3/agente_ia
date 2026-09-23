document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    const setMenuState = (open) => {
        nav.classList.toggle('nav--open', open);
        toggle.setAttribute('aria-expanded', open);
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenuState(!nav.classList.contains('nav--open'));
    });

    menu.addEventListener('click', (e) => {
        if (e.target.closest('.nav__link')) {
            setMenuState(false);
        }
    });

    const onScroll = () => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const confirmBtn = document.getElementById('modalConfirm');

    const openModal = () => {
        overlay.classList.add('modal-overlay--open');
        document.body.classList.add('modal-open');
        overlay.setAttribute('aria-hidden', 'false');
        confirmBtn.focus();
    };

    const closeModal = () => {
        overlay.classList.remove('modal-overlay--open');
        document.body.classList.remove('modal-open');
        overlay.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('.js-modal-trigger').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    document.addEventListener('click', (e) => {
        const el = e.target.closest('a[href], button');
        if (!el) {
            return;
        }
        if (el.closest('.js-modal-trigger')) {
            return;
        }
        if (el.closest('.modal-overlay')) {
            return;
        }
        if (el.closest('[id^="chatbase"], [id^="cb-"]')) {
            return;
        }

        const href = el.getAttribute('href') || '';
        const isPlaceholder = href === '' || href === '#';
        if (!isPlaceholder) {
            return;
        }

        e.preventDefault();
        openModal();
    });

    console.log('Sonrisa Uruguaya cargado.');
});
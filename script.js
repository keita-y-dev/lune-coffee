// フェードイン
const fadeItems = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

fadeItems.forEach((item) => {
    observer.observe(item);
});


// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');

    nav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute(
        'aria-label',
        isOpen ? 'メニューを閉じる' : 'メニューを開く'
    );
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
    });
});


// MENUのタブ切り替え
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        menuTabs.forEach((item) => {
            const active = item === tab;
            item.classList.toggle('active', active);
            item.setAttribute('aria-selected', active);
        });

        menuPanels.forEach((panel) => {
            const active = panel.id === `${target}-panel`;
            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    });
});


// GALLERYのモーダル
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.querySelector('.gallery-modal');
const modalImage = document.querySelector('.modal-image');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

const closeModal = () => {
    galleryModal.classList.remove('open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalImage.src = '';
    modalImage.alt = '';
};

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const image = item.querySelector('img');

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        galleryModal.classList.add('open');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && galleryModal.classList.contains('open')) {
        closeModal();
    }
});


// トップへ戻るボタン
const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        toTop.classList.add('show');
    } else {
        toTop.classList.remove('show');
    }
});

toTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('DOMContentLoaded', () => {
    let mobileMenuTrigger = document.querySelector('.closed');
    let closeIcon = document.querySelector('.opened');
    let mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    let logo = document.querySelector('.main-logo');

    mobileMenuTrigger.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('visible');
        closeIcon.classList.add('db');
        logo.classList.add('white');
    });
    closeIcon.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('visible');
        closeIcon.classList.remove('db');
        logo.classList.remove('white');
    });
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.loader-wrapper').classList.add('hidden');
    document.body.classList.add('allow-scroll');
    let mobileMenuTrigger = document.querySelector('.closed');
    let closeIcon = document.querySelector('.opened');
    let mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    let logo = document.querySelector('.main-logo');

    mobileMenuTrigger.addEventListener('click', () => {
        addClass(mobileMenuOverlay, 'visible');
        addClass(closeIcon, 'db');
        addClass(logo, 'white');
    });
    closeIcon.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('visible');
        closeIcon.classList.remove('db');
        logo.classList.remove('white');
    });
    window.addEventListener('scroll', () => {
        let secondSection = document.getElementById('second-section');
        let tags = document.querySelectorAll('ul.ss-tags li');
        let underline = document.querySelector('.full-width-underline');
        let heading = document.querySelector('.ss-heading');
        let itemTitle = document.querySelectorAll('.item-title');
        let itemUnderline = document.querySelectorAll('.underline');
        let thirdSection = document.querySelector('#third-section');
        let thirdHeading = document.querySelector('.third-section-heading');

        let scrollIdx = 0;

        if (screen.width < 450) {
            scrollIdx = 975;
        } else {
            scrollIdx = 1700;
        }
        if (window.pageYOffset > 470) {
            addClass(secondSection, 'black-section');
            addClass(underline, 'pink-background');
            addClass(heading, 'color-pink');
            itemUnderline.forEach(underline => addClass(underline, 'pink-background'));
            itemTitle.forEach(title => addClass(title, 'color-pink'));
            tags.forEach(tag => addClass(tag, 'color-pink'));
        }
        else {
            removeClass(secondSection, 'black-section');
            removeClass(underline, 'pink-background');
            removeClass(heading, 'color-pink');
            itemUnderline.forEach(underline => removeClass(underline, 'pink-background'));
            tags.forEach(tag => removeClass(tag, 'color-pink'));
            itemTitle.forEach(title => removeClass(title, 'color-pink'));
        }
        if (window.pageYOffset > scrollIdx) {
            removeClass(thirdSection, 'black-section');
            removeClass(thirdHeading, 'color-pink');
        }
        else {
            addClass(thirdSection, 'black-section');
            addClass(thirdHeading, 'color-pink');
        }
    });
});

const addClass = (element, className) => {
    element.classList.add(className);
};
const removeClass = (element, className) => {
    element.classList.contains(className) && element.classList.remove(className);
};
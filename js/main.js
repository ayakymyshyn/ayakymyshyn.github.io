window.addEventListener('DOMContentLoaded', () => {
    let loader = document.querySelector('.loader-wrapper');
    document.body.classList.add('allow-scroll');
    let mobileMenuTriggers = document.querySelectorAll('.closed');
    let closeIcon = document.querySelector('.opened');
    let mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    let logo = document.querySelector('.main-logo');
    let baggedBtn = document.querySelector('a.fs-get-offer');
    let acc = document.getElementsByClassName("accordion");
    let panels = document.querySelectorAll('.panel');
    let knowMoreAccBtns = document.querySelectorAll('.accordion-flex-container .accordion-text .accordion-know-more');


    if (loader) {
        loader.classList.add('hidden');
    }
    if (panels.length > 0) {
        console.log(panels.length > 0);
        addClass(panels[0], "active");
        addClass(knowMoreAccBtns[0], 'hidden');
    }
    mobileMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            addClass(mobileMenuOverlay, 'visible');
            addClass(closeIcon, 'db');
            document.body.classList.remove('allow-scroll');
            addClassToElements([logo, baggedBtn], 'hidden');
        });
    });
    closeIcon.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('visible');
        closeIcon.classList.remove('db');
        document.body.classList.add('allow-scroll');
        removeClassFromElements([logo, baggedBtn], 'hidden');
    });
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            var panel = this.nextElementSibling;
            panels.forEach((panel, idx) => {
                removeClass(panel, "active");
                removeClass(knowMoreAccBtns[idx], 'hidden');
            });
            panel.classList.toggle("active");
            addClass(knowMoreAccBtns[i], 'hidden');
        });

    }
    window.addEventListener('scroll', () => {
        let accordion = document.querySelector('.accordion');
        let thirdSection = document.querySelector('#third-section');
        let thirdHeading = document.querySelector('.third-section-heading');
        let activePanel = document.querySelector('.panel.active');
        let fixedNav = document.querySelector('.fixed-nav');

        console.log(window.pageYOffset);
        if (window.pageYOffset > 200) {
            addClass(fixedNav, 'display-menu');
        } else {
            removeClass(fixedNav, 'display-menu');
        }

        if (window.pageYOffset > (thirdHeading.offsetTop - 300)) {
            removeClass(thirdSection, 'black-section');
            removeClass(accordion, 'border-pink');
            removeClassFromElements([thirdHeading, accordion, activePanel], 'color-pink');
        }
        else {
            addClass(thirdSection, 'black-section');
            addClass(accordion, 'border-pink');
            addClassToElements([thirdHeading, accordion, activePanel], 'color-pink');
        }
    });
});

// helpers 

const addClass = (element, className) => {
    element.classList.add(className);
};
const removeClass = (element, className) => {
    element.classList.contains(className) && element.classList.remove(className);
};
const addClassToElements = (elements, className) => {
    elements.length > 0 && elements.forEach(element => {
        addClass(element, className);
    });
};
const removeClassFromElements = (elements, className) => {
    elements.length > 0 && elements.forEach(element => {
        removeClass(element, className);
    });
}; 
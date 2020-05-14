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
        let accordions = document.querySelectorAll('.accordion');
        let thirdSection = document.querySelector('#third-section');
        let thirdHeading = document.querySelector('.third-section-heading');
        let fixedNav = document.querySelector('.fixed-nav');
        let activePanel = document.querySelector('.panel.active');

        if (this.oldScroll > this.scrollY && window.pageYOffset > 200) {
            addClass(fixedNav, 'display-menu');
        } else {
            removeClass(fixedNav, 'display-menu');
        }
        this.oldScroll = this.scrollY;


        if (window.pageYOffset > (thirdHeading.offsetTop - 300)) {
            removeClass(thirdSection, 'black-section');
            accordions.forEach(accordion => {
                removeClass(accordion, 'border-pink');
                removeClass(accordion, 'color-pink');
            });
            removeClassFromElements([thirdHeading, activePanel], 'color-pink');
        }
        else {
            addClass(thirdSection, 'black-section');
            accordions.forEach(accordion => {
                addClass(accordion, 'border-pink');
                addClass(accordion, 'color-pink');
            });
            addClassToElements([thirdHeading, activePanel], 'color-pink');
        }
    });

    let fiveReasonsImages = document.querySelectorAll('.first-image');
    let aboutUsDetails = document.querySelector('.about-us-details');
    let aboutUsList = document.querySelectorAll('.about-us-list li');
    let paragraph = document.querySelector(".about-us-description p");

    let text2 = "Lorem2";
    let text3 = "Lorem3";
    let text4 = "Lorem4";
    let tex5 = "Lorem5";

    let texts = [
        "Такой сайт будет только у Вас и у Майкла Джексона - шутка :) Но с долей правды. Наличие в команде опытного дизайнера подразумевает разработку авторского дизайна, которого вы больше не встретите на просторах Интернета. Авторский дизайн позволяет выделиться на фоне конкурентов и стать заметнее и интереснее для потенциальных клиентов.",
        "Lorem2", "Lorem3", "Lorem4", "Lorem5"
    ];

    let mouseX = 0;
    let mouseY = 0;

    let imgX = 0;
    let imgY = 6000;

    let speed = 0.05;
    let targetOffset = 0;


    const animate = () => {
        if (screen.width > 450) {
            let distX = 0;
            let distY = 0;
            if (mouseX > 0 && mouseY > 0) {
                distX = mouseX - imgX;
                distY = mouseY - imgY;
            }
            imgX = imgX + (distX * speed);
            imgY = imgY + (distY * speed);
            fiveReasonsImages.forEach(img => {
                img.style.left = imgX + "px";
                img.style.top = imgY + "px";
            });
        }
    };

    aboutUsList.forEach((li, idx) => {
        li.addEventListener('mousemove', (e) => {
            mouseX = e.pageX;
            mouseY = e.pageY;
            animate();
        });
        li.addEventListener('click', () => {
            paragraph.innerHTML = texts[idx];
        })
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

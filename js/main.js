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

    let mobileMenuItems = document.querySelectorAll('a.menu-item.mobile-menu-item');

    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('visible');
            closeIcon.classList.remove('db');
            document.body.classList.add('allow-scroll');
            removeClassFromElements([logo, baggedBtn], 'hidden');
        });
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


        if (thirdHeading && window.pageYOffset > (thirdHeading.offsetTop - 300)) {
            removeClass(thirdSection, 'black-section');
            accordions.forEach(accordion => {
                removeClass(accordion, 'border-pink');
                removeClass(accordion, 'color-pink');
            });
            removeClassFromElements([thirdHeading, activePanel], 'color-pink');
        }
        else {
            thirdSection && addClass(thirdSection, 'black-section');
            accordions.forEach(accordion => {
                addClass(accordion, 'border-pink');
                addClass(accordion, 'color-pink');
            });
            activePanel && thirdHeading && addClassToElements([thirdHeading, activePanel], 'color-pink');
        }
    });

    // sending message to a Telegram
    let name = document.querySelector('input.name-input');
    let phone = document.querySelector('input.phone-input');
    let sendButton = document.querySelector('.send-form-btn');
    let notification = document.querySelector('.notification');
    let notificationMessage = document.querySelector('.notification-message');
    let closeNotification = document.querySelector('.close-notification img');
    let modalSendButton = document.querySelector('.modal-send-btn');
    let modalName = document.querySelector('input.name-input.modal-input');
    let modalPhone = document.querySelector('input.phone-input.modal-input');

    let token = '1263033682:AAF9Yq8t1x2hbeqpZ_TVXsxAbNkg1L8vt-s';
    let chat_id = '-1001320284865';

    modalSendButton && modalSendButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (isEmpty(modalName.value) || isEmpty(modalPhone.value)) {
            notificationMessage.innerHTML = "Поля не могут быть пустыми."
            notification.classList.add('db');
        } else if (isPhoneIncorrect(modalPhone.value)) {
            notificationMessage.innerHTML = "Неверный формат номера телефона"
            notification.classList.add('db');
        } else {
            let text = `Ім'я: ${modalName.value}, Номер телефону: ${modalPhone.value}`;
            sendMessage(token, chat_id, text, () => {
                notificationMessage.innerHTML = "Сообщение отправлено успешно!"
                notification.classList.add('db');
            });
            removeClass(notification, 'db');
        }
        setTimeout(() => {
            removeClass(notification, 'db');
        }, 2000);
    });

    sendButton && sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(phone.value);
        if (isEmpty(name.value) || isEmpty(phone.value)) {
            notificationMessage.innerHTML = "Поля не могут быть пустыми."
            notification.classList.add('db');
        } else if (isPhoneIncorrect(phone.value)) {
            notificationMessage.innerHTML = "Неверный формат номера телефона"
            notification.classList.add('db');
        } else {
            let text = `Ім'я: ${name.value}, Номер телефону: ${phone.value}`;
            sendMessage(token, chat_id, text, () => {
                notificationMessage.innerHTML = "Сообщение отправлено успешно!"
                notification.classList.add('db');
            });
            removeClass(notification, 'db');
        }
        setTimeout(() => {
            removeClass(notification, 'db');
        }, 2000);
    });

    closeNotification && closeNotification.addEventListener('click', () => {
        removeClass(notification, 'db');
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
const sendMessage = async (token, chatID, text, callback) => {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}`);
    const statusData = await response.json();
    if (statusData.ok) {
        callback();
    }
    console.log(statusData);
};
const isPhoneIncorrect = phone => {
    return phone.length < 10 || phone.length > 21;
};

const isEmpty = field => {
    return field.length < 1;
};

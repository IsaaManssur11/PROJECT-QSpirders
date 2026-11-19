
// Landing-page behavior: form feedback, branch dialogs, scrolling effects, and header menus.

// Demo form: validate required fields and show confirmation feedback after submission.

document.addEventListener("DOMContentLoaded", function () {

    const demoForm = document.getElementById("demoForm");
    const demoMessage = document.getElementById("demoMessage");
    const contactForm = document.getElementById("contactForm");
    const contactFormMessage = document.getElementById("contactFormMessage");

    if (demoForm) {

        demoForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!demoForm.checkValidity()) {
                demoForm.reportValidity();
                return;
            }

            demoMessage.textContent =
                "Demo enquiry submitted successfully!";

            demoMessage.style.color = "green";

            demoForm.reset();

        });

    }

    if (contactForm && contactFormMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            contactFormMessage.textContent =
                "Thanks for reaching out. This demo form does not send your information.";
            contactForm.reset();
        });
    }

});

/* Branch interactions: open city details and build the all-cities directory. */

document.addEventListener("DOMContentLoaded", function () {

    const cityCards = document.querySelectorAll(".branch-card");

    const viewCities = document.getElementById("viewCities");

    const cityModalElement = document.getElementById("cityModal");

    if (!cityModalElement) return;

    const cityModal = bootstrap.Modal.getOrCreateInstance(
        cityModalElement
    );

    const cityTitle = document.getElementById("cityModalTitle");

    const cityDescription = document.getElementById(
        "cityModalDescription"
    );


    // AVAILABLE CITIES FROM THE REFERENCE

    const cities = [
        "Bengaluru",
        "Hyderabad",
        "Chennai",
        "Pune",
        "Mumbai",
        "Noida",
        "Mysore",
        "Gurugram",
        "Bhubaneswar",
        "Kolkata",
        "Ahmedabad",
        "Kochi",
        "Coimbatore",
        "Davangere"
    ];


    // OPEN CITY DETAILS

    cityCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const city = card.querySelector("h3").textContent;

            cityTitle.textContent = city + " Branches";

            cityDescription.textContent =
                "Explore offline training opportunities in " +
                city + ". Contact our team for branch addresses " +
                "and available courses.";

            cityModal.show();

        });

    });


    // VIEW ALL CITIES

    if (viewCities) {

        viewCities.addEventListener("click", function () {

            cityTitle.textContent = "Our Offline Cities";

            cityDescription.innerHTML = "";

            const cityList = document.createElement("div");

            cityList.className = "city-directory";

            cities.forEach(function (city) {

                const button = document.createElement("button");

                button.type = "button";
                button.className = "city-directory-item";
                button.textContent = city;

                button.addEventListener("click", function () {

                    cityTitle.textContent = city + " Branches";

                    cityDescription.textContent =
                        "Explore offline training opportunities in " +
                        city + ". Contact our team for branch addresses " +
                        "and available courses.";

                });

                cityList.appendChild(button);

            });

            cityDescription.appendChild(cityList);

            cityModal.show();

        });

    }

});


/* Scroll reveal: animate marked sections as they enter the viewport. */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});


/* Number counters: animate each data-target value the first time it enters view. */

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {

        const target = Number(counter.dataset.target);
        const format = counter.dataset.format;

        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            // Smooth easing
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                target * easedProgress
            );

            if (format === "lakh") {
                counter.textContent =
                    (currentValue / 100000).toFixed(2) + " Lac+";
            } else {
                counter.textContent =
                    currentValue.toLocaleString("en-IN") + "+";
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }

        }

        requestAnimationFrame(updateCounter);

    };

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.6
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

});


/* Header scroll state: toggle the compact header appearance after scrolling. */

const mainHeader = document.querySelector(".main-header");

if (mainHeader) {

    window.addEventListener("scroll", () => {

        mainHeader.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }, { passive: true });

}


/* Navigation behavior: move the arrow and show or hide course/center hover menus. */

document.addEventListener("DOMContentLoaded", () => {

    const navMenu = document.querySelector("#navMenu");
    const indicator = document.querySelector(".nav-indicator");
    const navLinks = document.querySelectorAll("#navMenu .nav-link");
    const mainNavigation = document.querySelector(".main-navigation");
    const megaMenuTriggers = document.querySelectorAll("#navMenu [data-mega-menu]");
    const megaMenus = document.querySelectorAll(".header-mega-menu");

    if (!navMenu || !indicator || !mainNavigation || navLinks.length === 0) return;

    function closeMegaMenus() {
        megaMenus.forEach(menu => {
            menu.classList.remove("is-open");
            menu.setAttribute("aria-hidden", "true");
        });

        megaMenuTriggers.forEach(trigger => {
            trigger.setAttribute("aria-expanded", "false");
        });
    }

    function openMegaMenu(trigger) {
        closeMegaMenus();

        const menu = document.getElementById(
            `${trigger.dataset.megaMenu}MegaMenu`
        );

        if (!menu) return;

        menu.classList.add("is-open");
        menu.setAttribute("aria-hidden", "false");
        trigger.setAttribute("aria-expanded", "true");
    }

    function moveIndicator(link) {

        const menuRect = navMenu.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        const center =
            linkRect.left - menuRect.left + linkRect.width / 2;

        indicator.style.transform =
            `translateX(${center - indicator.offsetWidth / 2}px)`;

        indicator.style.opacity = "1";
    }

    // Initial active link
    const initialLink =
        document.querySelector("#navMenu .nav-link.active") || navLinks[0];

    requestAnimationFrame(() => moveIndicator(initialLink));

    // Hover movement
    navLinks.forEach(link => {

        link.addEventListener("mouseenter", () => {
            moveIndicator(link);

            if (link.dataset.megaMenu) {
                openMegaMenu(link);
            }
        });

        link.addEventListener("focus", () => {
            if (link.dataset.megaMenu) {
                openMegaMenu(link);
            } else {
                closeMegaMenus();
            }
        });

        // Click: update active link
        link.addEventListener("click", () => {

            navLinks.forEach(item => item.classList.remove("active"));
            navLinks.forEach(item => item.closest("li")?.classList.remove("active"));

            link.classList.add("active");
            link.closest("li")?.classList.add("active");

            moveIndicator(link);
            closeMegaMenus();
        });

    });

    megaMenus.forEach(menu => {
        menu.addEventListener("mouseleave", closeMegaMenus);
    });

    mainNavigation.addEventListener("mouseleave", event => {
        if (event.relatedTarget instanceof Node &&
            mainNavigation.contains(event.relatedTarget)) {
            return;
        }

        closeMegaMenus();
    });

    mainNavigation.addEventListener("click", event => {
        if (event.target instanceof Element &&
            event.target.closest(".header-mega-menu a")) {
            closeMegaMenus();
        }
    });

    mainNavigation.addEventListener("focusout", event => {
        if (!mainNavigation.contains(event.relatedTarget)) {
            closeMegaMenus();
        }
    });

    // Return to active link when mouse leaves menu
    navMenu.addEventListener("mouseleave", () => {

        const activeLink =
            document.querySelector("#navMenu .nav-link.active");

        if (activeLink) moveIndicator(activeLink);

    });

    // Reposition after resizing
    window.addEventListener("resize", () => {

        const activeLink =
            document.querySelector("#navMenu .nav-link.active");

        if (activeLink) moveIndicator(activeLink);

    });

});

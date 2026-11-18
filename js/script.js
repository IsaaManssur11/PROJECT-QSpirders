
// ==================================
// QSPIDERS FRONTEND SCRIPT
// ==================================

document.addEventListener("DOMContentLoaded", function () {

    const demoForm = document.getElementById("demoForm");
    const demoMessage = document.getElementById("demoMessage");

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

});

/* ======================================
   PHASE 4 - BRANCH INTERACTIONS
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    const cityCards = document.querySelectorAll(".branch-card");

    const viewCities = document.getElementById("viewCities");

    const cityModalElement = document.getElementById("cityModal");

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


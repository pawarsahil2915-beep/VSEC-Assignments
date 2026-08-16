const container = document.getElementById("squareContainer");


/* Mouse enters the squares */

container.addEventListener("mouseenter", function () {

    container.classList.add("active");

});


/* Mouse leaves the squares */

container.addEventListener("mouseleave", function () {

    container.classList.remove("active");

});
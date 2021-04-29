const projectcard = document.querySelectorAll(".project_card");
const githublinks = [
    "https://github.com/JLodge99/Everglades-Server",
    "https://github.com/JLodge99/EvergladesUI",
    "https://github.com/JLodge99/Amigo-Mobile",
    "https://github.com/JLodge99/My-Contacts",
    "",
    "",
];
const mobile_menu = document.querySelector("#mobile_menu_btn");
const navbar = document.querySelector(".navbar");
const navbaritem = document.querySelectorAll(".navbar_item");
const navmenu = document.querySelector(".navbar_buttons");
const scroll_links = document.querySelectorAll("#scroll_link");
const homecontainer = document.querySelector("#homecontainer");
const aboutmecoverinfo = document.querySelector(".aboutme_cover_info");
const resumeman = document.getElementById("resumeman_img");
const aboutmebtn = document.querySelector(".toabout");
const aboutmecover = document.querySelector(".aboutme_cover");
const aboutmeskills = document.querySelector(".aboutme_skills");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const letters = document.querySelector(".letters");
const titlename = document.getElementById("titlename");
const sectiondivtop = document.querySelector(".sectiondivide_top");
const sectiondivbottom = document.querySelector(".sectiondivide_bottom");

var canvasInView = true;
var currentslide = 0;

// Redirect logic for project cards
projectcard.forEach((x, index) => {
    x.addEventListener("click", () => {
        window.open(githublinks[index]);
    });
});

// Mobile menu toggle
mobile_menu.addEventListener("click", () => {
    mobile_menu.classList.toggle("is-active");
    navmenu.classList.toggle("active");
});

// SVG codeman animation logic
var a = document.getElementById("codeman_img");
a.addEventListener(
    "load",
    function() {
        // get the inner DOM of alpha.svg
        var svgDoc = a.contentDocument;
        // get the inner element by id
        var delta = [
            svgDoc.getElementById("codeline1"),
            svgDoc.getElementById("codeline2"),
            svgDoc.getElementById("codeline3"),
            svgDoc.getElementById("codeline4"),
        ];

        var squares = [
            svgDoc.getElementById("Square_Fill_1"),
            svgDoc.getElementById("Square_Fill_2"),
            svgDoc.getElementById("Square_Fill_3"),
            svgDoc.getElementById("Square_Outline_1"),
            svgDoc.getElementById("Square_Outline_2"),
            svgDoc.getElementById("Square_Outline_3"),
        ];

        anime({
            targets: delta,
            loop: true,
            direction: "alternate",
            scale: 1,
            translateY: -10,
            easing: "easeInOutCubic",
            delay: anime.stagger(20),
        });

        anime({
            targets: squares,
            loop: true,
            rotate: 360,
            easing: "linear",
            duration: 4000,
        });
    },
    false
);

// About me information intro animation
const aboutmeintro = (element) =>
    anime
    .timeline({
        autoplay: false,
    })
    .add({
        targets: element.children[1],
        scale: [0, 1],
        translateY: -10,
        opacity: 1,
        easing: "easeInOutCubic",
    })
    .add({
            targets: element.children[0],
            opacity: 1,
            translateX: [500, 0],
            easing: "easeInOutCubic",
        },
        "-=600"
    );

// About me information outro animation
const aboutmeoutro = (element) =>
    anime({
        targets: element.children,
        opacity: 0,
    });

// Color gradients for section deviders
var gradients_front = {
    start: "rgba(255, 202, 6, 1)",
    end: "rgba(255, 202, 6, .25)",
};

var gradients_back = {
    start: "rgba(255, 202, 6, .5)",
    end: "rgba(255, 202, 6, .25)",
};

// Gradient Color change animations because its not supported in CSS
const gradient_front_anim = (color1, color2) =>
    anime({
        autoplay: false,
        targets: gradients_front,
        start: color1,
        end: color2,
        duration: 4000,
        update: (anim) => {
            var value1 = anim.animations[0].currentValue;
            var value2 = anim.animations[1].currentValue;
            sectiondivtop.children[1].style.backgroundImage =
                "linear-gradient(to left, " + value1 + " 0%, " + value2 + " 100%)";
            sectiondivbottom.children[1].style.backgroundImage =
                "linear-gradient(to left, " + value1 + " 0%, " + value2 + " 100%)";
        },
    });

const gradient_back_anim = (color1, color2) =>
    anime({
        autoplay: false,
        targets: gradients_back,
        start: color1,
        end: color2,
        duration: 4000,
        update: (anim) => {
            var value1 = anim.animations[0].currentValue;
            var value2 = anim.animations[1].currentValue;
            sectiondivtop.children[0].style.backgroundImage =
                "linear-gradient(to left, " + value1 + " 0%, " + value2 + " 100%)";
            sectiondivbottom.children[0].style.backgroundImage =
                "linear-gradient(to left, " + value1 + " 0%, " + value2 + " 100%)";
        },
    });

// Fullpage.js Initialization
$(document).ready(function() {
    $("#fullpage").fullpage({
        scrollOverflow: true,
        anchors: ["main", "aboutme", "projects"],
        afterLoad: function(origin, destination, direction) {
            if (destination) {
                if (destination == 2) {}
            }
        },
        onLeave: function(origin, destination, direction) {
            if (origin) {
                switch (origin) {
                    case 1:
                        navbar.classList.toggle("active", true);
                        navbaritem.forEach((element) => {
                            element.classList.toggle("active", true);
                        });
                        break;
                    case 2:
                        sectiondivtop.classList.remove("appear");
                        sectiondivbottom.classList.remove("appear");
                        aboutmeoutro(
                            currentslide == 0 ? aboutmecover : aboutmeskills
                        ).play();
                        break;
                    default:
                        break;
                }
            }
            if (destination) {
                switch (destination) {
                    case 1:
                        navbar.classList.toggle("active", false);
                        navbaritem.forEach((element) => {
                            element.classList.toggle("active", false);
                        });
                        break;
                    case 2:
                        sectiondivtop.classList.add("appear");
                        sectiondivbottom.classList.add("appear");
                        aboutmeintro(
                            currentslide == 0 ? aboutmecover : aboutmeskills
                        ).play();
                        break;

                    default:
                        break;
                }
            }
        },
        onSlideLeave: function(section, origin, destination, direction) {
            currentslide = 1 - destination;
            switch (currentslide) {
                case 0:
                    gradient_back_anim(
                        "rgba(255, 202, 6, .5)",
                        "rgba(255, 202, 6, .25)"
                    ).play();
                    gradient_front_anim(
                        "rgba(255, 202, 6, 1)",
                        "rgba(255, 202, 6, .25)"
                    ).play();
                    break;
                case 1:
                    gradient_back_anim(
                        "rgba(140,207,230,.5)",
                        "rgba(140,207,230,.25)"
                    ).play();
                    gradient_front_anim(
                        "rgba(140,207,230,1)",
                        "rgba(140,207,230,.25)"
                    ).play();
                    break;
                default:
                    break;
            }
        },
    });
});
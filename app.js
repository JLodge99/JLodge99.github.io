const projectcard = document.querySelectorAll(".project_card");
const githublinks = [
  "https://github.com/JLodge99/Everglades-Server",
  "https://github.com/JLodge99/Amigo-Mobile",
  "https://github.com/JLodge99/My-Contacts",
  "",
  "",
];
const mobile_menu = document.querySelector("#mobile_menu_btn");
const mobilebar = document.querySelectorAll(".bar");
const navbar = document.querySelector(".navbar");
const navmenu = document.querySelector(".navbar_buttons");
const navlinks = document.querySelectorAll(".navbar_item");
const scroll_links = document.querySelectorAll("#scroll_link");
const homecontainer = document.querySelector("#homecontainer");
const aboutcontainer = document.querySelector(".aboutcontainer");
const projectcontainer = document.querySelector(".project_main");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const letters = document.querySelector(".letters");
const titlename = document.getElementById("titlename");
const aboutmebtn = document.querySelector(".toabout");

var currentIndex = -1;
var navtoggle = false;
var canvasInView = true;

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

aboutmebtn.addEventListener("click", () => {
  const yOffset = -65;
  const y =
    scroll_links[0].getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
});

// Navbar link logic
navlinks.forEach((element, key) => {
  if (key == 0) {
    element.addEventListener("click", () => {
      window.scrollTo(0, 0);
      navmenu.classList.toggle("active", false);
      mobile_menu.classList.toggle("is-active", false);
    });
  } else if (key == 1) {
    element.addEventListener("click", () => {
      const yOffset = -65;
      const y =
        scroll_links[0].getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      navmenu.classList.toggle("active", false);
      mobile_menu.classList.toggle("is-active", false);
    });
  } else if (key == 2) {
    element.addEventListener("click", () => {
      const yOffset = -65;
      const y =
        scroll_links[1].getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      navmenu.classList.toggle("active", false);
      mobile_menu.classList.toggle("is-active", false);
    });
  }
});

// SVG animation logic
var a = document.getElementById("main_img");
a.addEventListener(
  "load",
  function () {
    // get the inner DOM of alpha.svg
    var svgDoc = a.contentDocument;
    // get the inner element by id
    var delta = [
      svgDoc.getElementById("codeline1"),
      svgDoc.getElementById("codeline2"),
      svgDoc.getElementById("codeline3"),
      svgDoc.getElementById("codeline4"),
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
  },
  false
);

function getNavIndexByScrollPos(scrollPosition) {
  let navheight = 65;
  if (scrollPosition > projectcontainer.offsetTop - 200) return 2;
  else if (scrollPosition > aboutcontainer.offsetTop - 200) return 1;
  else if (scrollPosition > 0) return 0;

  return -1;
}

let tick = false;
document.addEventListener("scroll", () => {
  scrollpos = window.scrollY;
  if (!tick) {
    if ((index = getNavIndexByScrollPos(scrollpos)) != currentIndex) {
      currentIndex = index;
      console.log("Index: " + index);
      console.log("Selected: " + currentIndex);
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        if (currentIndex != -1 && !navtoggle) {
          navbar.classList.toggle("active", true);
          mobilebar.forEach((element, key) => {
            element.classList.toggle("active", true);
          });
          navlinks.forEach((element, key) => {
            element.classList.toggle("active", true);
          });
          navtoggle = true;
        } else if (currentIndex == -1 && navtoggle) {
          mobilebar.forEach((element, key) => {
            element.classList.toggle("active", false);
          });
          navbar.classList.toggle("active", false);
          navlinks.forEach((element, key) => {
            element.classList.toggle("active", false);
          });
          navtoggle = false;
        }
        console.log("Done");
      });
    }

    if (canvas.getBoundingClientRect().bottom - 65 < 0) canvasInView = false;
    else if (!canvasInView && canvas.getBoundingClientRect().bottom - 65 > 0) {
      canvasInView = true;
      animate();
    }
  }
});

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
const aboutmecard = document.querySelector(".aboutme_card");

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

let options = {
  threshold: 0.3,
};

let observer = new IntersectionObserver((element, observer) => {
  if (!element[0].isIntersecting) {
    return;
  } else {
    console.log("FIRE ANIMATION");
    console.log(element);
    anime
      .timeline()
      .add({
        targets: element[0].target.children[0],
        scale: [0, 1],
        translateY: -10,
        easing: "easeInOutCubic",
      })
      .add(
        {
          targets: element[0].target.children[1],
          opacity: [0, 1],
          translateX: [500, 0],
          easing: "easeInOutCubic",
        },
        "-=600"
      );
    observer.unobserve(element[0].target);
  }
}, options);

observer.observe(aboutcontainer);

let intro_observer = new IntersectionObserver((element, observer) => {
  if (!element[0].isIntersecting) {
    return;
  } else {
    introanimation.play();
  }

  observer.unobserve(element[0].target);
}, options);

intro_observer.observe(homecontainer);

let popin_observer = new IntersectionObserver((element, observer) => {
  console.log(element[0].target.children)
  if (!element[0].isIntersecting) return;
  else{
    for(let el of element[0].target.children){
      el.classList.add("appear")
    }
  }

  observer.unobserve(element[0].target);
}, {rootMargin: "0px 0px -250px 0px"});

/*
let popin_observer = new IntersectionObserver((element, observer) => {
  console.log(element[0].target.children)
  if (!element[0].isIntersecting) return;
  else{
    anime({
      targets: element[0].target.children,
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(200)
    })
  }

  observer.unobserve(element[0].target);
}, options);
*/

popin_observer.observe(projectcontainer.children[1])
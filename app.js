const projectcard = document.querySelectorAll(".project_card")
const githublinks = ["https://github.com/JLodge99/Everglades-Server", 
                    "https://github.com/JLodge99/Amigo-Mobile",
                    "https://github.com/JLodge99/My-Contacts",
                    "https://www.google.com"]
const mobile_menu = document.querySelector("#mobile_menu_btn")
const navmenu = document.querySelector(".navbar_buttons")
const navlinks = document.querySelectorAll(".navbar_item") 
const scroll_links = document.querySelectorAll("#scroll_link")

projectcard.forEach((x, index) => {
    x.addEventListener("click", () => {
        window.open(githublinks[index])
    })
    
})

mobile_menu.addEventListener("click", () => {
    navmenu.classList.toggle("active")
})

navlinks.forEach((element, key) => {
    if (key == 0) {
        element.addEventListener("click", () => {
            window.scrollTo(0, 0)
            navmenu.classList.toggle("active", false)
        })    
    }
    else if(key == 1){
        element.addEventListener("click", () => {
            const yOffset = -50
            const y = scroll_links[0].getBoundingClientRect().top + window.pageYOffset + yOffset
        
            window.scrollTo({top: y, behavior: 'smooth'})
            navmenu.classList.toggle("active", false)
        })
    }
})

var a = document.getElementById("main_img")

a.addEventListener("load",function(){

    // get the inner DOM of alpha.svg
    var svgDoc = a.contentDocument;
    // get the inner element by id
    var delta = [svgDoc.getElementById("Square_Fill_1"),
                svgDoc.getElementById("Square_Outline_1"),
                svgDoc.getElementById("Square_Fill_2"),
                svgDoc.getElementById("Square_Outline_2"),
                svgDoc.getElementById("Square_Fill_3"),
                svgDoc.getElementById("Square_Outline_3")
            ];

    anime({
        targets: delta,
        loop: true,
        rotate: '1turn',
        duration: 6000,
        easing: 'linear',
    });

    // add behaviour
    delta.addEventListener("mousedown",function(){
            alert('hello world!')
    }, false);
}, false);
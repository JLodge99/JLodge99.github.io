const projectcard = document.querySelectorAll(".project_card")
const githublinks = ["https://github.com/JLodge99/Everglades-Server", 
                    "https://github.com/JLodge99/Amigo-Mobile",
                    "https://github.com/JLodge99/My-Contacts",
                    "",
                    ""]
const mobile_menu = document.querySelector("#mobile_menu_btn")
const navmenu = document.querySelector(".navbar_buttons")
const navlinks = document.querySelectorAll(".navbar_item") 
const scroll_links = document.querySelectorAll("#scroll_link")
const aboutcontainer = document.querySelector(".aboutcontainer")
var selectedNavLink = -1

// Redirect logic for project cards
projectcard.forEach((x, index) => {
    x.addEventListener("click", () => {
        window.open(githublinks[index])
    })
    
})

// Mobile menu toggle
mobile_menu.addEventListener("click", () => {
    navmenu.classList.toggle("active")
})

// Navbar link logic
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

// SVG animation logic
var a = document.getElementById("main_img")
a.addEventListener("load",function(){

    // get the inner DOM of alpha.svg
    var svgDoc = a.contentDocument;
    // get the inner element by id
    var delta = [svgDoc.getElementById("codeline1"),
    svgDoc.getElementById("codeline2"),
    svgDoc.getElementById("codeline3"),
    svgDoc.getElementById("codeline4") ];

    anime({
        targets: delta,
        loop: true,
        direction: 'alternate',
        scale: 1,
        translateY: -10,
        easing: 'easeInOutCubic',
        delay: anime.stagger(20)
    })

}, false)

function toggleNavTuck(index){

    navlinks.forEach((element, key) => {
        //element.style.backgroundColor = "white"
        element.classList.remove('navbar_item_select')
    })

    if(index != -1){
        navlinks[index].classList.add('navbar_item_select')
        // document.querySelector(".navbar_logo").classList.add('nomargin')
        document.querySelector(".navbar_buttons").classList.add('navbar_buttons_select')
        selectedNavLink = index
    }
    else{
        selectedNavLink = -1
        // document.querySelector(".navbar_logo").classList.remove('nomargin')
        document.querySelector(".navbar_buttons").classList.remove('navbar_buttons_select')
    }
}

function getNavIndexByScrollPos(scrollPosition){
    if(scrollPosition > aboutcontainer.offsetHeight)
        return 1
    else if(scrollPosition > 0)
        return 0
    
    return -1
}

console.log(aboutcontainer.offsetHeight)

let tick = false
document.addEventListener('scroll', () => {
    scrollpos = window.scrollY
    if(!tick){
        if((index = getNavIndexByScrollPos(scrollpos)) != selectedNavLink){
            console.log("Index: " + index)
            console.log("Selected: " + selectedNavLink)
            tick = true
            window.requestAnimationFrame(() => {
                toggleNavTuck(index)
                tick = false;
                console.log("Done")
            })
        }
    }
    console.log(index)
})
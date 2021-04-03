const projectcard = document.querySelectorAll(".project_card")
const githublinks = ["https://github.com/JLodge99/Everglades-Server", 
                    "https://github.com/JLodge99/Amigo-Mobile",
                    "https://github.com/JLodge99/My-Contacts",
                    "https://www.google.com"]
projectcard.forEach((x, index) => {
    x.addEventListener("click", () => {
        window.open(githublinks[index])
    })
    
})
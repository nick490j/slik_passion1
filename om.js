//styling af navbar ved scroll
document.addEventListener("scroll", navStyle)
function navStyle() {
    if (window.scrollY > 0) {
        document.querySelector("nav").classList.add("scrolled")
    } else {
        document.querySelector("nav").classList.remove("scrolled")
    }
}
// ********** set date ************
// code that automatically changes copyright date every year
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
   // linksContainer.classList.toggle("show-links");
   // Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
   const containerHeight = linksContainer.getBoundingClientRect().height;
   const linksHeight = links.getBoundingClientRect().height;

    // containerHeight needs to be at 0 to hide them and when it is shown it will adjust to the height of the linksHeight...basically to add and delete links in nav bar that will adjust the height appropriately when menu is shown
   if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
   } else {
    linksContainer.style.height = 0;
   }
});

// getting the nav and the top-link section at the bottom when clicked to get to the top of the screen
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
// ********** fixed navbar ************
// when window is scrolled 
window.addEventListener("scroll", function (){
    // pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    // if scrollHeight is greater than navHeight then have the fixed-nav scroll down when user scrolls down
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    // else remove the fixed-nav and have the menu go back to the top of the full screen
    } else {
        navbar.classList.remove("fixed-nav");
    }
    
    // saying if scrollHeight is greater than a certain height then add show-link at the bottom to scroll up to top of screen...show-link is hidden by default in css
    if (scrollHeight > 500) {
        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link");
    }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

// searching through each scroll link 
scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        // prevents default
        e.preventDefault();
        // navigate to specific spot...getting the target attribute of href and sliceing it to start at the index 1 to avoid getting the hashtag too
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        //calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height
        const fixedNav = navbar.classList.contains("fixed-nav");
        //offsetTop - A Number, representing the top position of the element, in pixels...subtracting navHeight so it will scroll exactly to the top of the sections...matters only on bigger screen
        let position = element.offsetTop - navHeight;
        // if fixedNav is not fixed then position will equal position - navHeight even more basically to get the about section to scroll at the top instead of going past it
        if (!fixedNav) {
            position -= navHeight;
        }
        // setup for top of navbar so if navHeight is bigger than top of navbar when links are open then add postion to containerHeight to scroll to the top of the sections on a smaller screen
        if (navHeight > 82) {
            position += containerHeight;
        }

        // scrolling to the specific position of offsettop...setting up coordinates
        window.scrollTo({
            left: 0, top: position,
        });
    // closing links on smaller screen when nav bar is toggled to visible...this resets it to 0 to close
    linksContainer.style.height = 0;
    });
});

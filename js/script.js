// DOM elements
const carouselItems = document.querySelectorAll("#home .carousel-item");
const navbarToggler = document.querySelector('.navbar-toggler');
const iconSpan = navbarToggler.querySelector('span');

// Style carousel items
document.addEventListener('DOMContentLoaded', function () {
  carouselItems.forEach((item, index) => {
    item.style.height = "100vh";
    item.style.backgroundImage = `url(./images/hero/hero-${index}.png)`; // Ensure the path is correct
    item.style.backgroundColor = "rgba(0,0,0,0.8)";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize = "cover";
    item.style.backgroundPosition = "center";
  });
});

// Menu elements
const menuImages = document.querySelectorAll("#menu .menu-item img");
const menuNames = document.querySelectorAll("#menu .menu-item .menu-title");
const menuLoader = document.getElementById("loader");
let lastMenuItem = 0;

// Function to hide menu items
function menuHider(start) {
  const activeTabPane = document.querySelector("#menu .tab-content .tab-pane.active");
  if (!activeTabPane) return;  // Check if activeTabPane exists

  const menuItems = activeTabPane.querySelectorAll("#menu .menu-items .col-lg-3");
  lastMenuItem = start;
  menuItems.forEach((menuItem, index) => {
    if (index > 3) {
      menuItem.style.display = "none";
      lastMenuItem = 3;
    } else {
      menuItem.style.display = "block";
    }
  });
}

// Initial call to menuHider
menuHider(0);

// Event listeners for menu navigation
document.querySelectorAll("#menu ul .nav-item .nav-link").forEach(element => {
  element.addEventListener("click", () => {
    menuHider(0);
    menuLoader.style.display = "block";
  });
});

// Event listener for menu loader
menuLoader.addEventListener("click", () => {
  const activeTabPane = document.querySelector("#menu .tab-content .tab-pane.active");
  if (!activeTabPane) return;  // Check if activeTabPane exists

  const menuItems = activeTabPane.querySelectorAll("#menu .menu-items .col-lg-3");
  lastMenuItem += 5;
  menuItems.forEach((menuItem, index) => {
    if (index < lastMenuItem) {
      menuItem.style.display = "block";
    }
  });

  if (lastMenuItem >= menuItems.length) menuLoader.style.display = "none";
});

// Ensure menu image titles match images
if (menuImages.length === menuNames.length) {
  menuImages.forEach((img, index) => {
    const src = img.getAttribute("src");
    const fileName = src.split('/').pop();
    const nameWithoutExtension = fileName.split('.')[ 0 ];
    const menuItemName = nameWithoutExtension.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    menuNames[ index ].innerHTML = menuItemName;
  });
} else {
  console.error("The number of menu images and menu titles do not match.");
}

// Event listener for navbar toggler
document.addEventListener('DOMContentLoaded', function () {
  const navbarCollapse = document.querySelector('#navbarNavAltMarkup');

  navbarToggler.addEventListener('click', function () {
    iconSpan.classList.toggle('la-times');
  });

  // Close navbar on outside click
  document.addEventListener('click', function (event) {
    const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);

    if (!isClickInside && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  });
});

// Jump to top functionality
document.addEventListener("DOMContentLoaded", function () {
  let jumperArea = document.querySelector(".menu-items");
  let jumpToTopButton = document.querySelector(".jump-to-top");

  if (!jumperArea || !jumpToTopButton) {
    console.error("Error: Element not found");
    return;
  }

  window.addEventListener("scroll", function () {
    let servicesPosition = jumperArea.getBoundingClientRect().top;
    let windowHeight = window.innerHeight - 400;

    if (servicesPosition < windowHeight) {
      jumpToTopButton.style.cursor = "pointer";
      jumpToTopButton.style.display = "block";
    } else {
      jumpToTopButton.style.display = "none";
    }
  });

  jumpToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

"use-strict";

// VARIABLES

const gridContainer = document.getElementById("grid-container");
const list = document.querySelectorAll(".list");
const items = document.querySelectorAll(".item");
const gridImages = document.querySelectorAll(".item img");
const modalOverlay = document.querySelector(".modal-overlay");
const modalImg = document.querySelector(".modal-overlay img");
const closeBtn = document.querySelector(".close-btn");
const modalNav = document.querySelector(".modal-nav");
const prevBtn = document.querySelector(".modal-before");
const nextBtn = document.querySelector(".modal-next");

const sidebar = document.getElementById("sidebar");
const sidebarOpenIcon = document.querySelector(".sidebar__open");
const sidebarCloseIcon = document.querySelector(".sidebar__close");

// Open Sidebar
sidebarOpenIcon.addEventListener("click", function () {
  sidebarOpen();
});

function sidebarOpen() {
  sidebar.style.transform = "translateX(0)";
  sidebar.style.visibility = "visible";
  gridContainer.style.width = "calc(100% - 30rem)";
  gridContainer.style.left = "30rem";
  sidebarOpenIcon.style.display = "none";
}

// Close Sidebar
sidebarCloseIcon.addEventListener("click", function () {
  sidebarClose();
});

function sidebarClose() {
  sidebar.style.transform = "translateX(-30rem)";
  sidebar.style.visibility = "hidden";
  gridContainer.style.width = "100%";
  gridContainer.style.left = "0";
  sidebarOpenIcon.style.display = "block";
}

// OPEN MODAL

gridImages.forEach(function (image) {
  image.addEventListener("click", function () {
    modalOverlay.style.display = "flex";
    modalImg.src = image.src;
  });
});

// CLOSE MODAL
window.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

closeBtn.addEventListener("click", function () {
  modalOverlay.style.display = "none";
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modalOverlay.style.display = "none";
  }
});

// FILTER IMAGE GALLERY

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", function () {
    for (let j = 0; j < list.length; j++) {
      list[j].classList.remove("active");
    }
    list[i].classList.add("active");

    let dataFilter = list[i].getAttribute("data-filter");

    for (let k = 0; k < items.length; k++) {
      items[k].classList.remove("active");
      items[k].classList.add("hide");

      if (items[k].getAttribute("data-item") === dataFilter || dataFilter === "all") {
        items[k].classList.remove("hide");
        items[k].classList.add("active");
      }
    }

    //scroll to top due to different amount of images per filter
    window.scrollTo(0, 0);
  });
}

//MEDIA QUERIES

// if screen size meets requirements, do following:
function screenFunction(screen) {
  if (screen.matches) {
    sidebarOpen();
  } else {
    sidebarClose();
  }
}

const screen = window.matchMedia("(min-width: 850px)");
screenFunction(screen);
screen.addListener(screenFunction);

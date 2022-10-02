// const nav = document.querySelector(".nav-links");
// const burger = document.querySelector(".burger");
// const navLinks = document.querySelectorAll(".nav-links li");

// burger.addEventListener("click", () => {
//   // Nav Toggle
//   nav.classList.toggle("nav-active");

//   // Link Animation
//   navLinks.forEach((link, index) => {
//     if (link.style.animation) {
//       link.style.animation = "";
//     } else {
//       link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
//     }
//   });

//   // Burger Animation
//   burger.classList.toggle("toggle");
// });

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links **********
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".nav-links");
// const closeToggle = document.querySelector(".fa-bars");

navToggle.addEventListener("click", () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linkHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linkHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }

  // if (closeToggle.classList.contains("fa-bars")) {
  //   closeToggle.classList.remove("fa-bars");
  //   closeToggle.classList.add("fa-xmark");
  // } else {
  //   closeToggle.classList.remove("fa-xmark");
  //   closeToggle.classList.add("fa-bars");
  // }

  // closeToggle.classList.toggle("fa-xmark");
});

// ********** fixed navbar **********
const navbar = document.getElementById("navbar");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", () => {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();

    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});

// contact form function
const scriptURL = "https://script.google.com/macros/s/AKfycbwYAmEQMKgJ2xQ6yXavBsEYCuY0k44JRETfHHeCui9XBCUcTvKJ_GXcmwLxibqpjjo/exec";
const form = document.forms["submit-to-google-sheet"];

const btnSend = document.querySelector(".btn-send");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // ketika btn send diklik
  // tampilkan btn loading, hilangkan btn send
  btnLoading.classList.toggle("d-none");
  btnSend.classList.toggle("d-none");

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // tampilkan btn send, hilangkan btn loading
      btnLoading.classList.toggle("d-none");
      btnSend.classList.toggle("d-none");
      // tampilkan alert
      myAlert.classList.toggle("d-none");
      // reset form
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

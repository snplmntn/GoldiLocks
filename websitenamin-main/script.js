"use strict";

// NAV
const nav = document.querySelector(".nav");
const navBorder = nav.querySelector(".nav__border");
const navButton = nav.querySelector(".nav__button");
const navButtons = nav.querySelectorAll(".nav__buttons");
const collapsedClass = "nav--collapsed";
const navActive = "nav--active";
const lsKey = "navCollapsed";

let navStatus;
let homeStatus;
let memStatus;
let galStatus;

// OBSERVERS
//HOME OBSERVER
// Home
const home = document.querySelector(".page-container");
const navHome = document.querySelector(".nav__home");

// Members
const members = document.querySelector("#id-members");
const navMembers = document.querySelector(".nav__members");

// Gallery
const gallery = document.querySelector(".gallery-container");
const navGallery = document.querySelector(".nav__gallery");

const homeObs = function (entries, homeObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      navHome.classList.add("active");
      navGallery.classList.remove("active");
      navMembers.classList.remove("active");
    }
  });
};

const homeObserver = new IntersectionObserver(homeObs, {
  root: null,
  // threshold: 0.5,
  threshold: [0.5, 1],
});

homeObserver.observe(home);

//MEMBERS OBSERVER

const memObs = function (entries, memObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      navMembers.classList.add("active");
      navHome.classList.remove("active");
      navGallery.classList.remove("active");
    }
  });
};

const memObserver = new IntersectionObserver(memObs, {
  root: null,
  // threshold: 0.1,
  threshold: [0.08, 0.1],
});

memObserver.observe(members);

// GALLERY OBSERVER
const galObs = function (entries, galObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      navGallery.classList.add("active");
      navHome.classList.remove("active");
      navMembers.classList.remove("active");
    }
  });

  //
  // } else navGallery.classList.remove("active");
};

const galObserver = new IntersectionObserver(galObs, {
  root: null,
  threshold: [0.5, 1],
});

galObserver.observe(gallery);

// Navigation Menu
if (localStorage.getItem(lsKey) === null) {
  nav.classList.add(collapsedClass);
}
if (localStorage.getItem(lsKey) === "true") {
  nav.classList.add(collapsedClass);
}

navBorder.addEventListener("click", () => {
  if (navStatus === false) {
    nav.classList.toggle(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
  } else {
    navStatus = false;
  }

  if (!nav.classList.contains(collapsedClass)) nav.classList.add(navActive);
  else nav.classList.remove(navActive);
});

navButton.addEventListener("click", () => {
  if (navStatus === false) {
    nav.classList.toggle(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
  } else {
    navStatus = false;
  }

  if (!nav.classList.contains(collapsedClass)) nav.classList.add(navActive);
  else nav.classList.remove(navActive);
});

nav.addEventListener("mouseover", function (e) {
  // if (navHome.classList.contains("active")) {
  //   navHome.classList.remove("active");
  //   homeStatus = false;
  // } else if (navMembers.classList.contains("active")) {
  //   navMembers.classList.remove("active");
  //   memStatus = false;
  // } else if (navGallery.classList.contains("active")) {
  //   navGallery.classList.remove("active");
  //   galStatus = false;
  // }

  if (
    nav.classList.contains(collapsedClass) &&
    !nav.classList.contains(navActive)
  ) {
    nav.classList.remove(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
    navStatus = true;
  }
});

nav.addEventListener("mouseout", function (e) {
  // if (homeStatus === false) {
  //   navHome.classList.add("active");
  //   homeStatus = true;
  // } else if (memStatus === false) {
  //   navMembers.classList.add("active");
  //   memStatus = true;
  // } else if (galStatus === false) {
  //   navGallery.classList.add("active");
  //   galStatus = true;
  // }

  if (
    !nav.classList.contains(collapsedClass) &&
    !nav.classList.contains(navActive)
  ) {
    nav.classList.add(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
    navStatus = false;
  }
});

// Gallery slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Functions
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Slide next to right
  btnRight.addEventListener("click", nextSlide);

  // Slide next to left
  btnLeft.addEventListener("click", prevSlide);

  gallery.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    else if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

const gallObs = function (entries, galObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  //
  // } else navGallery.classList.remove("active");
};

const gallObserver = new IntersectionObserver(galObs, {
  root: null,
  threshold: [0.5, 1],
});

gallObserver.observe(gallery);
// di ko mapagana hahhahahahhaahhaa
// blurs other nav buttons when selecting one
// const handleHover = function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = nav.querySelectorAll(".nav__link");
//     //   const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = this;
//     });
//     // logo.style.opacity = this;
//   }
// };

// navButtons.forEach(function () {
//   addEventListener("mouseover", handleHover.bind(0.5));
// });

// navButtons.forEach(function () {
//   addEventListener("mouseout", handleHover.bind(1));
// });

// navButtons.forEach((onmouseover = handleHover.bind(0.5)));
// navButtons.forEach((onmouseout = handleHover.bind(0.5)));

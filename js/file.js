// global variables
let backgroundInterval, activeBG;

// handle settings menu
document.querySelector(".settings .gear").onclick = () => {
  document.querySelector(".settings").classList.toggle("open");
  document.querySelector(".settings .gear i").classList.toggle("fa-spin");
}

// handle settings menu -- colors options
let colorsSpans = document.querySelectorAll(".settings .colors span");

colorsSpans.forEach((span) => {
  span.style.backgroundColor = span.dataset.color;
  span.addEventListener("click", () => {
    document.documentElement.style.setProperty("--main-color", span.dataset.color);
    colorsSpans.forEach((span) => {
      span.classList.remove("active");
      window.localStorage.removeItem("--main-color");
    });
    window.localStorage.setItem("--main-color", span.dataset.color);
    span.classList.add("active");
  });
})

// handle settings menu -- random backgrounds options
let randomBgSpans = Array.from(document.querySelectorAll(".settings .random-bg span"));

randomBgSpans.forEach((span) => {
  span.addEventListener("click", () => {
    randomBgSpans.forEach((span) => {span.classList.remove("active")});
    if (span.textContent === "No") {
      clearInterval(backgroundInterval);
      window.localStorage.setItem("randomBG", false);

      if (typeof activeBG !== "undefined")
       document.querySelector(".landing").style.backgroundImage = `url('../imgs/${activeBG}')`;
    }
    else {
      window.localStorage.setItem("randomBG", true);
      backgroundInterval = setInterval(randomBG, 7000);
    }

    span.classList.add("active");

    if (typeof activeBG !== "undefined") window.localStorage.setItem("activeBG", activeBG);
    else window.localStorage.setItem("activeBG", '01.jpg');
  })
})

// handle show navigation bullets option
let showBulletsSpans = Array.from(document.querySelectorAll(".settings .show-bullets span"));
showBulletsSpans.forEach((span) => {
  span.addEventListener("click", () => {
    if (span.textContent === "Yes") {
      localStorage.setItem("showBullets", true);
      showBulletsSpans.forEach(span => span.classList.remove("active"));
      span.classList.add("active");
      document.querySelector(".bullets").style.display = "flex";
    } else {
      localStorage.setItem("showBullets", false);
      showBulletsSpans.forEach(span => span.classList.remove("active"));
      span.classList.add("active");
      document.querySelector(".bullets").style.display = "none";
    }
  });
});

// handle settings menu -- reset options button
let resetOptBtn = document.querySelector(".settings button.reset");

resetOptBtn.onclick = function () {
  window.localStorage.clear();

  // Alternative: window.location.reload();

  colorsSpans.forEach((span, index) => {
    if (index === 0) span.classList.add("active");
    else span.classList.remove("active");
  });

  randomBgSpans.forEach((span, index) => {
    if (index == 0) span.classList.add("active");
    else span.classList.remove("active");
  });

  showBulletsSpans.forEach((span, index) => {
    if (index == 0) span.classList.add("active");
    else {
      span.classList.remove("active");
      document.querySelector(".bullets").style.display = "flex";
    }
  });

  document.documentElement.style.setProperty("--main-color", "#ff9800");

  backgroundInterval = setInterval(randomBG, 7000);
}

window.onload = () => {
  // handle navigation bullets
  document.querySelectorAll(".landing .header-area ul.links li a").forEach((a, index) => {
    document.querySelectorAll(".bullets span .tooltip")[index].textContent = a.textContent;
  });

  // random background for landing section
  backgroundInterval = setInterval(randomBG, 7000);

  // get prefered color from localStorage
  if (window.localStorage.getItem("--main-color")) {
    colorsSpans.forEach((span) => {
      if (span.dataset.color == window.localStorage.getItem("--main-color")) {
        colorsSpans.forEach((span) => span.classList.remove("active"));
        span.classList.add("active");
        document.documentElement.style.setProperty("--main-color", span.dataset.color);
      }
    });
  }

  // handle random backgrounds option
  if (JSON.parse(localStorage.getItem("randomBG")) === false) {
    randomBgSpans.forEach((span) => span.classList.remove("active"));

    randomBgSpans.forEach((span) => {
      if (span.textContent === "No") {
        clearInterval(backgroundInterval);
        span.classList.add("active");
      }
    });

    document.querySelector(".landing").style.backgroundImage = `url('../imgs/${localStorage.getItem("activeBG")}')`;
  }

  // handle show navigation bullets option
  if (JSON.parse(localStorage.getItem("showBullets"))) {
    document.querySelector(".bullets").style.display = "flex";
    showBulletsSpans.forEach((span) => {span.classList.remove("active")});
    showBulletsSpans.forEach((span) => {
      if (span.textContent === "Yes") span.classList.add("active");
    });
  } else {
    document.querySelector(".bullets").style.display = "none";
    showBulletsSpans.forEach((span) => {span.classList.remove("active")});
    showBulletsSpans.forEach((span) => {
      if (span.textContent === "No") span.classList.add("active");
    });
  }
}

// handle header links
document.querySelectorAll(".landing .header-area ul.links li a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".landing .header-area ul.links li a").forEach((a) => a.classList.remove("active"));
    a.classList.add("active");
    document.querySelector('.' + a.dataset.section).scrollIntoView();
  });
});

// navigation bullets (onclick)  -  Alternative:  scrollIntoView()
document.querySelectorAll(".landing .header-area ul.links li a").forEach((a, index) => {
  document.querySelectorAll(".bullets span .tooltip")[index].parentElement.addEventListener("click", () => {
    document.querySelectorAll(".landing .header-area ul.links li a").forEach((_a) => {_a.classList.remove("active")});
    a.classList.add("active");
    a.click()
  });
});

function randomBG() {
  let sliderImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.png", "07.jpg", "08.jpg", "09.jpg", "10.jpg"],
    random = sliderImages[Math.floor(Math.random() * sliderImages.length)];

  activeBG = random;
  document.querySelector(".landing").style.backgroundImage = `url('../imgs/${random}')`;
}

// handle menu bar
let menubarBtn = document.querySelector(".landing .header-area ul.links + button.menubar"),
  a = document.querySelector(".landing .header-area ul.links li a");

menubarBtn.onclick = function (e) {
  this.previousElementSibling.classList.toggle("open");
}

document.onclick = (e) => {
  if (e.target !== menubarBtn && e.target !== menubarBtn.previousElementSibling) {
    if (document.querySelector(".landing .header-area ul.links").classList.contains("open")) {
      menubarBtn.classList.toggle("open");
      document.querySelector(".landing .header-area ul.links").classList.toggle("open");
    }
  }
}

document.querySelector(".landing .header-area ul.links").onclick = (e) => {e.stopPropagation()};

// handle our-skills section (animate width)
let ourSkills = document.querySelector(".our-skills"),
    ourSkillsSpans = document.querySelectorAll(".our-skills .skill .progress span");

window.onscroll = function () {
  // handle header background
  if (this.scrollY > 200) {
    document.querySelector(".landing .container").style.backgroundColor = "#292f36c4";
    document.querySelector(".landing .container").style.boxShadow = "0 2px 5px rgb(0 0 0 / 30%)";
  } else {
    document.querySelector(".landing .container").style.backgroundColor = "transparent";
    document.querySelector(".landing .container").style.boxShadow = "unset";
  }

  let availableHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight;
  document.querySelector(".scrollbar-height").style.width =  `${Math.round(window.scrollY / availableHeight * 100)}%`;

  if (this.scrollY > ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight) {
    ourSkillsSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }

  if (this.scrollY < 600) document.querySelector(".goUp-btn").style.display = "none";
  else document.querySelector(".goUp-btn").style.display = "block";
}

document.querySelector(".goUp-btn").onclick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// handle gallery section
let gallerySecImages = Array.from(document.querySelectorAll(".gallery .images img"));

gallerySecImages.forEach((img, index) => {
  img.onclick = function () {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let h3 = document.createElement("h3");
    h3.append(`Image ${index+1}`)
    popupBox.appendChild(h3);

    let _img = document.createElement("img");
    _img.src = img.src;
    popupBox.appendChild(_img);

    let i = document.createElement("i");
    i.className = "fa-solid fa-circle-xmark close-popup-btn";

    popupBox.appendChild(i);

    document.body.appendChild(popupBox);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-popup-btn")) {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  } else if (e.target.classList.contains("popup-overlay")) {
    e.target.nextElementSibling.remove();
    e.target.remove();
  }
});

let inputs = document.querySelectorAll(".contact form .left input");
inputs.forEach((input) => togglePlaceholder(input));

let textarea = document.querySelector("textarea[name=message]"),
    countSpan = textarea.nextElementSibling,
    maxLength = textarea.getAttribute("maxlength");

togglePlaceholder(textarea);
countSpan.textContent = maxLength;

textarea.oninput = () => {
  countSpan.textContent = maxLength - textarea.value.length;

  if (countSpan.textContent === '0') countSpan.classList.add("zero");
  else countSpan.classList.remove("zero");
}

function togglePlaceholder(el) {
  el.onfocus = () => {
    el.setAttribute("data-placeholder", el.getAttribute("placeholder"));
    el.removeAttribute("placeholder");
  }
  el.onblur = () => {
    el.setAttribute("placeholder", el.dataset.placeholder);
    el.removeAttribute("data-placeholder");
  }
}

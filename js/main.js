/* jshint esversion : 6 */
$(document).ready(function() {
  //preloader
  $(".spinner").fadeOut(function() {
    $(this).remove();
  });
  //navbar
  $(".main-nav ul li").click(function(e) {
    e.preventDefault();
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $("html, body").animate(
      {
        scrollTop: $(
          $(this)
            .find("a")
            .attr("href")
        ).offset().top
      },
      800
    );
  });
  $(".hamburger").click(function() {
    $(this).toggleClass("is-active");
  });
  $("header .content a").click(function(e) {
    e.preventDefault();
    $("body, html").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 70
      },
      1000
    );
  });
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > $(window).innerHeight()) {
      $("header .main-nav").addClass("fixed-top");
      $("header .main-nav").addClass("animated fadeInDown faster");
    } else {
      $("header .main-nav").removeClass("fixed-top");
      $("header .main-nav").removeClass("fixed-top animated fadeInDown faster");
    }
    $(".block").each(function() {
      if ($(window).scrollTop() > $(this).offset().top - 100) {
        $(
          "header nav.main-nav ul li a[href='" + "#" + $(this).attr("id") + "']"
        )
          .parent()
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
    });
  });
  if ($(window).width() < 1024) {
    $("*").removeClass("wow");
  }

  // brogresses

  var $meters = $(".about .skills .progress .progress-bar");
  var $section = $(".about");
  var $queue = $({});

  function loadDaBars() {
    $meters.each(function() {
      var $el = $(this);
      var origWidth = $el.data("width");
      $el.width(0);
      $queue.queue(function(next) {
        $el.animate({ width: origWidth }, 200, next);
      });
    });
  }

  $(document).bind("scroll", function(ev) {
    var scrollOffset = $(document).scrollTop();
    var containerOffset = $section.offset().top + 100;
    if (scrollOffset > containerOffset) {
      loadDaBars();
      // unbind event not to load scrolsl again
      $(document).unbind("scroll");
    }
  });
  // mixitup plugin
  var mixer = mixitup(".mixitup-container", {
    selectors: {
      control: "[data-mixitup-control]"
    }
  });
  // scrollTop button
  $(".scroll-top .icon").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      1000
    );
  });
  // wow js
  new WOW().init();
});

// inputs
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
// Form
const form = document.getElementById("myForm");
// Validation colors
const green = "#4CAF50";
const red = "#F44336";
// Handle form
form.addEventListener("submit", function(event) {
  // Prevent default behaviour
  if (validateName() && validateEmail() && validateMessage()) {
    form.setAttribute(
      "action",
      "https://formspree.io/f/mvgpgqpa"
    );
    form.setAttribute("method", "POST");
    form.submit();
  } else {
    event.preventDefault();
    return false;
  }
});

// Validators
function validateName() {
  // check if is empty
  if (checkIfEmpty(name)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(name)) return;
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
  return true;
}
function validateMessage() {
  if (checkIfEmpty(message)) return;
  return true;
}
// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === "") return true;
  return false;
}
function setInvalid(field, message) {
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.nextElementSibling.innerHTML = "";
  //field.nextElementSibling.style.color = green;
}
function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
}

function containsCharacters(field, code) {
  let regEx;
  switch (code) {
    case 1:
      // letters
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, "Must contain at least one letter");
    case 2:
      // letter and numbers
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one letter and one number"
      );
    case 3:
      // uppercase, lowercase and number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter and one number"
      );
    case 4:
      // uppercase, lowercase, number and special char
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter, one number and one special character"
      );
    case 5:
      // Email pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, "Must be a valid email address");
    default:
      return false;
  }
}
function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}

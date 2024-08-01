setTimeout(function () {
  document.querySelector(".loadingOnStart").style.display = "none";
}, 2000);
// nav active
const btn_links = document.querySelector(".navgationBar .menu");
btn_links.addEventListener("click", () => {
  document.querySelector(".links").classList.toggle("active");
});
window.onscroll = function () {
  // scroll navghandler
  var nav = document.querySelector(".navgationBar");
  if (window.scrollY > 0) {
    nav.style.position = "fixed";
    nav.style.paddingInline = "20px";
    nav.style.width = "90%";
    nav.style.margin = "20px auto";
    nav.style.animation = "fadeIn 2s ease-in-out";
    nav.style.transition = "all 0.5s ease-in-out";
    nav.style.borderRadius = "10px";
    nav.style.boxShadow = "0px 0px 6px rgba(255, 255, 255, 0.5)";
  } else {
    nav.style.position = "relative";
    nav.style.paddingInline = "20px";
    nav.style.width = "";
    nav.style.background = "";
    nav.style.animation = "";
    nav.style.transition = "";
  }
};

//* social media links *//
const main_media = document.querySelector(".main_media");
fetch("data/media.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const social_media = document.createElement("a");
      social_media.className = "social_media";
      social_media.href = item.url;
      social_media.target = "_blank";
      const icon = document.createElement("img");
      icon.className = "icon";
      icon.src = item.image;
      social_media.appendChild(icon);
      main_media.appendChild(social_media);
    });
  });

// skills
const skills_container = document.querySelector(".boxes");
fetch("data/skills.json")
  .then((res) => res.json())
  .then((skills) => {
    skills.forEach((sk) => {
      const image = document.createElement("img");
      image.src = sk.src;
      image.alt = sk.alt;
      skills_container.appendChild(image);
    });
  });

// projects
const app = document.querySelector(".app");
fetch("data/Projects.json")
  .then((response) => response.json())
  .then((data) => {
    const allProjects = document.createElement("section");
    allProjects.className = "all_projects";
    data.forEach((project) => {
      let blank = true;
      const projectDiv = document.createElement("div");
      projectDiv.className = "project " + project.class;
      const projectName = document.createElement("h2"); // project name element
      projectName.className = "project-name";
      projectName.innerHTML = project.name;
      const projectImage = document.createElement("img"); // project image element
      projectImage.className = "project-image";
      projectImage.src = project.image;
      projectImage.alt = project.name;
      const projectDescription = document.createElement("p"); // project image element
      projectDescription.className = "project-description";
      projectDescription.innerHTML = project.description; /* dev controls */
      const devControls = document.createElement("dev");
      devControls.className = "dev-controls";
      const projectLink = document.createElement("a"); // project link;
      projectLink.className = "project-link";
      projectLink.href = project.url;
      projectLink.innerHTML = "live demo";
      const projectSrc = document.createElement("a"); // src code
      projectSrc.className = "project-projectSrc";
      projectSrc.href = project.srcCode;
      projectSrc.innerHTML = "src";
      if (blank) {
        // handle go to new site on click
        projectLink.setAttribute("target", "_blank");
        projectSrc.setAttribute("target", "_blank");
      }
      devControls.appendChild(projectLink);
      devControls.appendChild(projectSrc);
      projectDiv.appendChild(projectName);
      projectDiv.appendChild(projectImage);
      projectDiv.appendChild(projectDescription);
      projectDiv.appendChild(projectDescription);
      projectDiv.appendChild(devControls);
      allProjects.appendChild(projectDiv);
    });
    app.appendChild(allProjects);
    let shuffles = document.querySelectorAll(".filter-btns span");
    let boxes = document.querySelectorAll(".all_projects .project");
    // projects filter
    shuffles.forEach((ele) => {
      ele.addEventListener("click", (shuffle) => {
        shuffles.forEach((span) => {
          span.classList.remove("active");
        });
        shuffle.target.classList.add("active");
      });

      // handel projects filtered by dataset projects
      ele.addEventListener("click", function handelProjectsFilter() {
        boxes.forEach((proj) => {
          proj.style.display = "none";
        });
        document.querySelectorAll(this.dataset.projects).forEach((project) => {
          project.style.display = "block";
        });
      });
    });
  })
  .catch((error) => console.error("Error loading the projects:", error));

// handle to_top button
function BtnToTop() {
  let toTop = document.querySelector(".to_top");
  toTop.style.display = "none";
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      toTop.style.display = "block";
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      toTop.style.display = "none";
    }
  });
}
BtnToTop();

// disable insect
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.addEventListener("keydown", function (e) {
//   if (e.key === "F12") {
//     e.preventDefault();
//   }
// });

// sent form
document
  .querySelector(".contact_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const nameInput = document.getElementById("input_name");
    const emailInput = document.getElementById("input_email");
    const messageInput = document.getElementById("input_message");

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    emailjs
      .sendForm("service_2jd6ttc", "template_3q4wxrp", form, "PmARZnCEW1lngVqi")
      .then(
        (result) => {
          console.log(
            "Email sent successfully",
            "We will contact you via email",
            "success"
          );
          // Manually reset each field value
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";
        },
        (error) => {
          console.log("error", "Oops...", "Something went wrong!");
        }
      );
  });

import "./css/index.css";
import "./img/sprite.svg";

// import "./components/header/header";

// TODO: TO be removed
// Test Dark Mode

document.addEventListener("DOMContentLoaded", (event) => {
  const htmlClasses = document.querySelector("html")!.classList;
  htmlClasses.remove("dark");

  document.querySelector(".theme")?.addEventListener("click", function () {
    htmlClasses.toggle("dark");
  });
});

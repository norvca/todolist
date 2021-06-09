import "./css/index.css";
import "./img/sprite.svg";

// import "./components/header/header";

// TODO: TO be removed
// Test Dark Mode
document.addEventListener("DOMContentLoaded", (event) => {
  const htmlClasses = document.querySelector("html")!.classList;
  htmlClasses.remove("dark");

  document.querySelector(".theme")?.addEventListener("click", function (e) {
    const svg = e.target as SVGElement;
    const use = svg.querySelector("use")!;
    console.log(use);
    const iconHref = use.getAttribute("href");
    iconHref === "#sprite_moon"
      ? use.setAttribute("href", "#sprite_sun")
      : use.setAttribute("href", "#sprite_moon");

    // const use = svg.querySelector('use');
    htmlClasses.toggle("dark");
  });
});

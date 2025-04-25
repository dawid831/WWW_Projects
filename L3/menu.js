document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu-items");

  // Domyślnie chowamy menu na małych ekranach
  if (window.innerWidth < 768) {
    menu.classList.add("hidden");
  }

  toggle.addEventListener("click", function () {
    if (getComputedStyle(menu).display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }
  });
});
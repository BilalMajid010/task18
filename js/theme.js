
const themeKey = "flowpilot-theme";

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(themeKey, theme);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );

    const icon = button.querySelector("[data-theme-icon]");

    if (icon) {
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  });
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
}

const savedTheme = localStorage.getItem(themeKey);

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(savedTheme || "light");

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });
});

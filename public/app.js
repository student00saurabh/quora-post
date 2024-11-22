const toggleButton = document.getElementById("dark-mode-toggle");

// Check local storage for theme preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggleButton.textContent = "☀️ Light Mode";
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

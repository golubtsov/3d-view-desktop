const windowOpenSettings = document.getElementById("window-open-settings");
const windowSettings = document.getElementById("window-settings");

const btnCloseWindowSettings = document.getElementById(
  "btn-close-window-settings"
);
btnCloseWindowSettings.addEventListener("click", () => {
  windowSettings.classList.add("hidden");
  windowOpenSettings.classList.remove("hidden");
});

const btnOpenSettings = document.getElementById("btn-open-settings");
btnOpenSettings.addEventListener("click", () => {
  windowSettings.classList.remove("hidden");
  windowOpenSettings.classList.add("hidden");
});

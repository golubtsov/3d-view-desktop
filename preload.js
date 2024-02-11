const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const pathInput = document.getElementById("path-to-file");
  const listFiles = document.getElementById("list-files");
  const itemFiles = document.getElementById("item-files");
  const pathToFile = document.getElementById("path-to-file");

  pathInput.addEventListener("keydown", () => {
    if (event.keyCode == 13) {
      ipcRenderer.send("sendFolderName", pathInput.value);

      ipcRenderer.on("sendFolderInfo", (event, data) => {
        itemFiles.classList.contains("hidden")
          ? itemFiles.classList.remove("hidden")
          : null;
        let res = "";

        data.map((el) => {
          res += `<li>${el}</li>`;
        });

        listFiles.innerHTML = res;

        const liFiles = document.querySelectorAll("ul li");
        if (liFiles.length > 0) {
          for (const el of liFiles) {
            el.addEventListener("click", (el) => {
              pathInput.value += el.target.innerHTML;
              ipcRenderer.send("sendFolderName", pathInput.value);
            });
          }
        }
      });

      ipcRenderer.on("sendFileInfo", (event, data) => {
        pathToFile.value = data;
        itemFiles.classList.add("hidden");
      });
    }
  });
});

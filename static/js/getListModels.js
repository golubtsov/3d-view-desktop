const listModelsSelect = document.getElementById("list-models");

const createOptionForSelectModels = (modelName) => {
  return `<option value='${modelName}'>${modelName}</option>`;
};

const fillSelectModels = (models) => {
  let options = "";

  models.forEach((el) => {
    options += createOptionForSelectModels(el.name);
  });

  listModelsSelect.innerHTML += options;
};

fetch("./static/models/data-models.json")
  .then((res) => res.json())
  .then((res) => fillSelectModels(res));

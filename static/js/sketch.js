const START_ANGLE_X = 12;
const START_ANGLE_Y = 14;
const START_CAM_X = 0;
const START_CAM_Y = 0;
const START_CAM_POS = 300;

let cam;
let camPos = START_CAM_POS;
let camPosX = START_CAM_X;
let camPosY = START_CAM_Y;

let model1 = null;

let angleX = START_ANGLE_X;
let angleY = START_ANGLE_Y;

let color = "#3584e4";

// ====================== INPUT С ЦВЕТОМ МОДЕЛИ =============================

const inputColor = document.getElementById("input-color");
inputColor.addEventListener("change", (event) => {
  color = event.target.value;
});

// ======================= INPUT для ввода пути файла до модели ======================

const pathToFile = document.getElementById("path-to-file");
pathToFile.addEventListener("focusout", () => {
  model1 = pathToFile.value;
  preload();
});

// ======================= КНОПКА ДЛЯ ВОЗВРАЩЕНИЯ В НАЧАЛЬНОЕ ПОЛОЖЕНИЕ ============================

const btnStartPosition = document.getElementById("btn-start-pos");
btnStartPosition.addEventListener("click", () => {
  angleX = START_ANGLE_X;
  angleY = START_ANGLE_Y;
  camPosX = START_CAM_X;
  camPosY = START_CAM_Y;
  camPos = START_CAM_POS;
});

// ====================== КОД ДЛЯ P5JS =============================

function preload() {
  if (model1 !== null) {
    // Если путь указан неверно, ошибка загрузки от p5js
    model1 = loadModel(`${model1}`, true);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  cam.setPosition(camPosX, camPosY, camPos);

  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      camPosX += 10;
    }

    if (keyCode === RIGHT_ARROW) {
      camPosX -= 10;
    }

    if (keyCode === DOWN_ARROW) {
      camPosY -= 10;
    }

    if (keyCode === UP_ARROW) {
      camPosY += 10;
    }
  }

  if (mouseIsPressed) {
    angleX += (mouseX - pmouseX) * -0.01;
    angleY += (mouseY - pmouseY) * -0.01;
  }

  rotateX(angleY);
  rotateZ(angleX);

  ambientLight(255);
  pointLight(255, 255, 255, 400, 0, 400);
  normalMaterial();
  shininess(200);
  specularMaterial(200, 200, 255);

  fill(color);

  if (model1 !== null) {
    model(model1);
  }
}

function mouseWheel(event) {
  camPos += event.delta / 10;
}

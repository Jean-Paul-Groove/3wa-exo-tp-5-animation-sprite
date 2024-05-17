import { loadImage } from "./utils.js";
import BirdAnimation from "./Bird.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

//Chargement du background
const backgroundArray = [];
for (let i = 0; i < 3; i++) {
  const background = await loadImage("assets/img/Sky_Background_" + i + ".png");
  backgroundArray.push(background);
}
async function drawBackground() {
  for (const background of backgroundArray) {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
  }
}

async function fitCanvasFullScreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  await drawBackground();
}
await fitCanvasFullScreen();

//Chargement du fichier json
async function loadData() {
  const jsonData = await fetch("assets/data/Bird_Spritesheet.json");
  const data = await jsonData.json();
  return data;
}
const spriteSheet = await loadData();
// Initialisation de l'objet bird
const bird = new BirdAnimation(spriteSheet, canvas);
const spriteImg = await loadImage(bird.fileUrl);

//Chargement de la première sprite
async function drawSprite(spriteIndex) {
  await drawBackground();
  const sprite = spriteSheet.sprites[spriteIndex];
  context.drawImage(
    spriteImg,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height,
    bird.x,
    bird.y,
    bird.scale * sprite.width,
    bird.scale * sprite.height
  );
}
// Animation
async function animateBird(spriteIndex) {
  drawSprite(bird.spriteIndex);
  bird.nextSprite();
  setTimeout(() => {
    requestAnimationFrame(animateBird);
  }, 1000 / 16);
}

// BirdControl definition
window.addEventListener("keydown", handleControls);
function handleControls(e) {
  switch (e.key) {
    case "ArrowLeft":
      bird.x = bird.x - 10;
      break;
    case "ArrowRight":
      bird.x = bird.x + 10;
      break;
    case "ArrowUp":
      bird.y = bird.y - 10;
      break;
    case "ArrowDown":
      bird.y = bird.y + 10;
      break;
  }
}
animateBird();

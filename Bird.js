export default class BirdAnimation {
  #width;
  #height;
  #fileUrl;
  #spriteIndex;
  #spritesNumber;
  #x;
  #y;
  #scale = 0.5;
  #canvasHeight;
  #canvasWidth;

  constructor(spriteSheet, canvas) {
    this.#fileUrl = spriteSheet.file;
    this.#width = spriteSheet.sprites[0].width;
    this.#height = spriteSheet.sprites[0].height;
    this.#spriteIndex = 0;
    this.#spritesNumber = spriteSheet.sprites.length;
    this.#canvasHeight = canvas.height;
    this.#canvasWidth = canvas.width;
    this.#x = this.#canvasWidth / 2;
    this.#y = this.#canvasHeight / 2;
  }
  get spriteIndex() {
    return this.#spriteIndex;
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  get fileUrl() {
    return this.#fileUrl;
  }
  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get scale() {
    return this.#scale;
  }
  set y(number) {
    console.log(number);
    console.log(this.#height * this.#scale);
    if (number > this.#canvasHeight - this.#scale * this.#height) {
      this.#y = this.#canvasHeight - this.#scale * this.#height;
    } else if (number < 0) {
      this.#y = 0;
    } else {
      this.#y = number;
    }
  }
  set x(number) {
    console.log(number);
    console.log();
    if (number > this.#canvasWidth - this.#scale * this.#width) {
      this.#x = this.#canvasWidth - this.#scale * this.#width;
    } else if (number < 0) {
      this.#x = 0;
    } else {
      this.#x = number;
    }
  }
  nextSprite() {
    this.#spriteIndex = (this.#spriteIndex + 1) % this.#spritesNumber;
  }
}

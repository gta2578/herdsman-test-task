import * as PIXI from 'pixi.js';
import { Animal } from "./Animal";




export class Game {
  app: PIXI.Application;
  mainHero: PIXI.Graphics;
  animals: Animal[] = [];
  yard: PIXI.Graphics;
  gameField: PIXI.Graphics;
  score: number = 0;
  scoreText: PIXI.Text;
  maxGroupSize: number = 5;
  animalGroup: Animal[] = [];
  spawnInterval: number = 3000;
  maxAnimals: number = 10;
  gameWidth: number;
  gameHeight: number;

  constructor() {
    this.app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x228B22 });
    document.body.appendChild(this.app.view);

    this.gameField = new PIXI.Graphics();

    this.gameField.beginFill(0xFFFFFF, 0.1); // Черный цвет с 50% прозрачностью
    this.gameField.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    this.gameField.endFill();

    this.app.stage.addChild(this.gameField);

    this.gameWidth = this.app.screen.width;
    this.gameHeight = this.app.screen.height;

    this.mainHero = this.createCircle(0xFF0000, 20);
    this.mainHero.x = this.app.screen.width / 2;
    this.mainHero.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.mainHero);

    this.yard = this.createRectangle(0xFFFF00, 200, 200);
    this.yard.x = this.app.screen.width - 220;
    this.yard.y = this.app.screen.height - 220;
    this.app.stage.addChild(this.yard);

    this.scoreText = new PIXI.Text(`Score: ${this.score}`, { fill: 0xFFFFFF, fontSize: 24 });
    this.scoreText.x = 10;
    this.scoreText.y = 10;
    this.app.stage.addChild(this.scoreText);

    this.app.stage.interactive = true;
    this.app.stage.on('pointerdown', (event) => {
      this.moveHero(event.data.global)
    });

    this.startAnimalSpawner();

    this.app.ticker.add(this.gameLoop.bind(this));
  }

  isInsideYard(x: number, y: number): boolean {
    const yardBounds = this.yard.getBounds();
    return (
      x >= yardBounds.x &&
      x <= yardBounds.x + yardBounds.width &&
      y >= yardBounds.y &&
      y <= yardBounds.y + yardBounds.height
    );
  }

  createAnimal(x: number, y: number) {
    const animal = new Animal(x, y);
    this.animals.push(animal);
    this.app.stage.addChild(animal.sprite);
  }

  startAnimalSpawner() {
    setInterval(() => {
      if (this.animals.length < this.maxAnimals) {
        let x, y;
        do {
          x = Math.random() * this.gameWidth;
          y = Math.random() * this.gameHeight;
        } while (this.isInsideYard(x, y));

        this.createAnimal(x, y);
      }
    }, this.spawnInterval);
  }

  update(delta: number) {
    this.animals.forEach(animal => {
      const yardBounds = this.yard.getBounds();
      animal.update(delta, yardBounds);
    });
  }

  moveHero(target: { x: number; y: number }) {
    const dx = target.x - this.mainHero.x;
    const dy = target.y - this.mainHero.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = 5;

    const angle = Math.atan2(dy, dx);

    this.mainHero.x += Math.cos(angle) * speed;
    this.mainHero.y += Math.sin(angle) * speed;
  }

  gameLoop(delta: number) {
    this.update(delta);

    this.animals.forEach((animal) => {
      if (this.checkCollision(this.mainHero, animal.sprite)) {
        if (!this.animalGroup.includes(animal) && this.animalGroup.length < this.maxGroupSize) {
          this.animalGroup.push(animal);
        }
      }
    });

    this.animalGroup.forEach((animal) => {
      const dx = this.mainHero.x - animal.sprite.x;
      const dy = this.mainHero.y - animal.sprite.y;
      animal.sprite.x += dx * 0.1;
      animal.sprite.y += dy * 0.1;

      if (!animal.isInYard && this.checkCollision(animal.sprite, this.yard)) {
        animal.isInYard = true;
        this.score += 50;
        this.scoreText.text = `Score: ${this.score}`;
        this.app.stage.removeChild(animal.sprite);
        this.animals = this.animals.filter((a) => a !== animal);
        this.animalGroup = this.animalGroup.filter((a) => a !== animal);
      }
    });
  }

  checkCollision(animal: PIXI.Graphics, yard: PIXI.Graphics): boolean {
    const animalBounds = animal.getBounds();
    const yardBounds = yard.getBounds();

    return (
      animalBounds.x + animalBounds.width > yardBounds.x &&
      animalBounds.x < yardBounds.x + yardBounds.width &&
      animalBounds.y + animalBounds.height > yardBounds.y &&
      animalBounds.y < yardBounds.y + yardBounds.height
    );
  }

  createCircle(color: number, radius: number): PIXI.Graphics {
    const circle = new PIXI.Graphics();
    circle.beginFill(color);
    circle.drawCircle(0, 0, radius);
    circle.endFill();
    return circle;
  }

  createRectangle(color: number, width: number, height: number): PIXI.Graphics {
    const rect = new PIXI.Graphics();
    rect.beginFill(color);
    rect.drawRect(0, 0, width, height);
    rect.endFill();
    return rect;
  }
}
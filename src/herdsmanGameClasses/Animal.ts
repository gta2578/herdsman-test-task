import * as PIXI from "pixi.js";

export class Animal {
  private targetX: number;
  private targetY: number;
  private speed: number = 0.3;
  sprite: PIXI.Graphics;
  isInYard: boolean = false;

  constructor(x: number, y: number) {
    this.sprite = new PIXI.Graphics();
    this.sprite.beginFill(0xffffff);
    this.sprite.drawCircle(0, 0, 10);
    this.sprite.endFill();
    this.sprite.x = x;
    this.sprite.y = y;

    this.setRandomTarget();
  }

  setRandomTarget() {
    this.targetX = Math.random() * 800;
    this.targetY = Math.random() * 600;
  }

  update(delta: number, yardBounds: PIXI.Rectangle) {
    if (!yardBounds) {
      console.error("Yard bounds are not defined.");
      return;
    }

    const dx = this.targetX - this.sprite.x;
    const dy = this.targetY - this.sprite.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      const directionX = dx / distance;
      const directionY = dy / distance;

      this.sprite.x += directionX * this.speed * delta;
      this.sprite.y += directionY * this.speed * delta;

      if (this.isMovingTowardsYard(yardBounds)) {
        this.setRandomTarget();
      }
    } else {
      this.setRandomTarget();
    }
  }

  isMovingTowardsYard(yardBounds: PIXI.Rectangle): boolean {
    if (!yardBounds) {
      console.error("Yard bounds are not defined.");
      return false;
    }

    const isInXRange = this.sprite.x > yardBounds.x && this.sprite.x < yardBounds.x + yardBounds.width;
    const isInYRange = this.sprite.y > yardBounds.y && this.sprite.y < yardBounds.y + yardBounds.height;

    return (
      (isInXRange && this.sprite.y < yardBounds.y) ||
      (isInXRange && this.sprite.y > yardBounds.y + yardBounds.height) ||
      (isInYRange && this.sprite.x < yardBounds.x) ||
      (isInYRange && this.sprite.x > yardBounds.x + yardBounds.width)
    );
  }
}